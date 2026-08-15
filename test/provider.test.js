import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listBundledSkills, parseFrontmatter, registerUnderstandAnythingSkills } from '../index.js';

// 上游 skills/ 下的目录清单（钉死：新增目录却没更新测试 = 测试失败）
const EXPECTED_SKILLS = [
  'understand',
  'understand-chat',
  'understand-dashboard',
  'understand-diff',
  'understand-domain',
  'understand-explain',
  'understand-figma',
  'understand-knowledge',
  'understand-onboard',
];

const ROOT = fileURLToPath(new URL('..', import.meta.url));

function skillDirs() {
  return readdirSync(join(ROOT, 'skills'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

test('catalog: 刚好列出上游 9 个 skills，无多无少', () => {
  assert.deepEqual(skillDirs(), [...EXPECTED_SKILLS].sort());
  const candidates = listBundledSkills();
  assert.equal(candidates.length, EXPECTED_SKILLS.length);
  assert.deepEqual(candidates.map((c) => c.name).sort(), [...EXPECTED_SKILLS].sort());
});

test('catalog: 每个 candidate 都是 dsh 可用的形状', () => {
  for (const c of listBundledSkills()) {
    assert.match(c.name, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `name 必须 kebab-case: ${c.name}`);
    assert.equal(c.name, c.resourceBase.path.split('/').pop(), `name 应等于目录名: ${c.name}`);
    assert.ok(c.description.length > 0, `description 非空: ${c.name}`);
    assert.equal(c.provider, 'dsh-understand-anything');
    assert.equal(c.source, 'bundled');
    assert.equal(c.rank, 600, 'BUNDLED_SKILL_RANK');
    assert.deepEqual(c.invocation, { modelInvocable: true, userInvocable: true });
    assert.equal(c.resourceBase.kind, 'directory');
    assert.ok(existsSync(c.resourceBase.path), `resourceBase 目录存在: ${c.name}`);
    assert.ok(existsSync(c.locator), `SKILL.md 存在: ${c.name}`);
    assert.ok(c.locator.endsWith('SKILL.md'));
  }
});

test('frontmatter: 上游 9 个 skills 的 name 都来自 frontmatter 且与目录一致', () => {
  for (const dir of EXPECTED_SKILLS) {
    const body = readFileSync(join(ROOT, 'skills', dir, 'SKILL.md'), 'utf8');
    const fm = parseFrontmatter(body);
    assert.equal(fm.name, dir, `${dir}: frontmatter name 应等于目录名`);
    assert.ok(fm.description && fm.description.length > 0, `${dir}: frontmatter description 非空`);
  }
});

test('注册线路: registerProvider 收到能 list + get 的 provider，get 回传真实档案内容', async () => {
  // 刻意不做 identity stub：register 线路如果接错（例如把 request 直接喂 run），
  // list/get 的产物对不上真实档案，这个测试会红。
  let registered = null;
  const mockCtx = {
    inject: (_deps, fn) => {
      const skillCtx = {
        skills: {
          registerProvider: (create) => {
            registered = create();
          },
        },
      };
      fn(skillCtx);
    },
  };
  registerUnderstandAnythingSkills(mockCtx);
  assert.ok(registered, 'registerProvider 必须被呼叫');
  assert.equal(registered.name, 'dsh-understand-anything');

  const candidates = await registered.list();
  assert.equal(candidates.length, EXPECTED_SKILLS.length);
  for (const c of candidates) {
    const skill = await registered.get(c);
    assert.ok(skill, `get 必须回传 skill: ${c.name}`);
    assert.equal(skill.name, c.name);
    assert.equal(skill.content, readFileSync(c.locator, 'utf8'), `${c.name}: content 必须是档案逐字内容`);
    assert.deepEqual(skill.resourceBase, c.resourceBase);
  }
  // 不存在的 skill → undefined（不能炸）
  const missing = await registered.get({ name: 'no-such-skill', locator: '/nonexistent/SKILL.md' });
  assert.equal(missing, undefined);
});

test('frontmatter 解析: 引号/无引号/没有 frontmatter', () => {
  const quoted = parseFrontmatter('---\nname: foo\ndescription: "带 引号 的 描述"\n---\nbody');
  assert.equal(quoted.name, 'foo');
  assert.equal(quoted.description, '带 引号 的 描述');
  const plain = parseFrontmatter('---\nname: bar\ndescription: 无引号描述\n---\nbody');
  assert.equal(plain.description, '无引号描述');
  const noFrontmatter = parseFrontmatter('没有 frontmatter 的内容');
  assert.deepEqual(noFrontmatter, {});
});

test('fallback: 缺 description 的 SKILL.md 用第一段非标题文字', () => {
  const fixture = join(ROOT, 'test', 'fixtures', 'tmp-no-desc');
  rmSync(fixture, { recursive: true, force: true });
  mkdirSync(join(fixture, 'no-desc-skill'), { recursive: true });
  writeFileSync(
    join(fixture, 'no-desc-skill', 'SKILL.md'),
    '---\nname: no-desc-skill\n---\n# 标题\n这是第一段描述文字\n',
  );
  try {
    const [c] = listBundledSkills(fixture);
    assert.equal(c.name, 'no-desc-skill');
    assert.equal(c.description, '这是第一段描述文字');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
