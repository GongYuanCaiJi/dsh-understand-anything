import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 结构测试：github:/本地安装后「可 boot」的最低保证。
// 被 package.json 的 prepare 在每次 install 时执行，因此只做零依赖的档案检查，
// 且必须在任何合法安装状态下通过（这里验的是形状，不是上游逐字内容）。
const ROOT = fileURLToPath(new URL('..', import.meta.url));

test('套件形状: skills/ 有 9 个目录且各含 SKILL.md', () => {
  const skillsDir = join(ROOT, 'skills');
  assert.ok(existsSync(skillsDir), 'skills/ 存在');
  const dirs = readdirSync(skillsDir, { withFileTypes: true }).filter((e) => e.isDirectory());
  assert.equal(dirs.length, 9, '9 个 skill 目录');
  for (const d of dirs) {
    assert.ok(existsSync(join(skillsDir, d.name, 'SKILL.md')), `skills/${d.name}/SKILL.md 存在`);
  }
});

test('套件形状: agents/ 有 10 个上游 agent 定义', () => {
  const agentsDir = join(ROOT, 'agents');
  assert.ok(existsSync(agentsDir), 'agents/ 存在');
  const files = readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
  assert.equal(files.length, 10, '10 个 agent .md 定义');
});

test('套件形状: 技能运行机制（core + wasm 语法）在套件内', () => {
  for (const p of [
    'packages/core/package.json',
    'packages/core/src',
    'packages/tree-sitter-dart-wasm/tree-sitter-dart.wasm',
    'packages/tree-sitter-swift-wasm/tree-sitter-swift.wasm',
    'pnpm-workspace.yaml',
  ]) {
    assert.ok(existsSync(join(ROOT, p)), `${p} 存在`);
  }
});

test('套件形状: 必要档案都在（boot 所需）', () => {
  for (const f of ['package.json', 'index.js', 'cordis.patch.yml', 'LICENSE', 'THIRD_PARTY_NOTICES.md']) {
    assert.ok(existsSync(join(ROOT, f)), `${f} 存在`);
  }
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.dsh?.bundle?.patch, './cordis.patch.yml', 'dsh.bundle.patch 指向 cordis.patch.yml');
});

test('套件形状: web 应用（web 应用的三个部分）不搬', () => {
  for (const p of ['homepage', 'packages/dashboard', 'packages/viewer']) {
    assert.ok(!existsSync(join(ROOT, p)), `${p} 不存在（web 应用不搬，README 有说明）`);
  }
});
