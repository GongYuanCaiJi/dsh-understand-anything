// dsh-understand-anything — cordis 插件入口。
//
// 职责只有一个：把本套件 skills/ 目录下的 9 个 SKILL.md 注册进 dsh 的
// skills registry（ctx.skills.registerProvider，runtime provider）。
// 注册形状照 dsh-superpowers-zh（同机制、已发布的真实插件）的 index.js。
//
// skills/ 与 agents/ 本身是上游 Understand-Anything 的逐字复制，这里不碰内容；
// 逐字保真由 test/verbatim.test.js 对 test/fixtures/verbatim.sha256.json 验证。
// agents/ 目录随套件发布：skill 文本会指示模型读取 $PLUGIN_ROOT/agents/*.md
// 作为 subagent 定义，dsh 侧不需要额外的 agent 注册。

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUNDLED_SKILL_RANK } from '@deepseek-ai/dsh-skill';

export const name = 'dsh-understand-anything';

const PROVIDER = name;
const INVOCATION = { modelInvocable: true, userInvocable: true };
const DEFAULT_ROOT = fileURLToPath(new URL('./skills/', import.meta.url));

/**
 * 列出 skills/ 下每个含 SKILL.md 的目录，转成 dsh skill registry 的候选。
 * 只扫一层（与 dsh 的档案系统 loader 同深度规则）。
 * @param root - skills 根目录（测试可注入自订 fixture 根）
 */
export function listBundledSkills(root = DEFAULT_ROOT) {
  if (!existsSync(root)) return [];
  const skills = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillFile = join(root, entry.name, 'SKILL.md');
    if (!existsSync(skillFile)) continue;
    const body = readFileSync(skillFile, 'utf8');
    const fm = parseFrontmatter(body);
    skills.push({
      name: fm.name || entry.name,
      description: fm.description || firstParagraph(body),
      invocation: INVOCATION,
      provider: PROVIDER,
      source: 'bundled',
      rank: BUNDLED_SKILL_RANK,
      resourceBase: { kind: 'directory', path: join(root, entry.name) },
      locator: skillFile,
    });
  }
  return skills;
}

/** 从 SKILL.md 的 YAML frontmatter 抽出 name / description（纯解析，不做 fallback）。 */
export function parseFrontmatter(markdown) {
  const match = /^---\n([\s\S]*?)\n---/u.exec(markdown);
  if (!match) return {};
  const block = match[1] ?? '';
  const field = (key) => {
    const line = new RegExp(`^${key}:\\s*(.+)$`, 'mu').exec(block)?.[1]?.trim();
    return line === undefined ? undefined : line.replace(/^['"]|['"]$/g, '').trim();
  };
  return { name: field('name'), description: field('description') };
}

/** frontmatter 之后的第一段非空、非标题文字（description 缺漏时的 fallback）。 */
function firstParagraph(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---\n?/u, '');
  return body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#'));
}

/** 注册 provider 进 dsh skills registry；ctx.inject 拿不到 skills 就不注册。 */
export function registerUnderstandAnythingSkills(ctx) {
  ctx.inject(['skills'], (skillCtx) => {
    const candidates = listBundledSkills();
    if (candidates.length === 0) return;
    const provider = {
      name: PROVIDER,
      list: () => Promise.resolve(candidates),
      async get(candidate) {
        if (typeof candidate.locator !== 'string' || !existsSync(candidate.locator)) return undefined;
        return {
          name: candidate.name,
          description: candidate.description,
          invocation: candidate.invocation,
          provider: candidate.provider,
          source: candidate.source,
          resourceBase: candidate.resourceBase,
          content: readFileSync(candidate.locator, 'utf8'),
        };
      },
    };
    skillCtx.skills.registerProvider(() => provider);
  });
}

export function apply(ctx) {
  registerUnderstandAnythingSkills(ctx);
}
