import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// package.json / cordis.patch.yml / LICENSE / THIRD_PARTY_NOTICES 的公开契约。
// 这层是「移植包装」：每条断言对应 playbook 的一条规则，改包装必须先改这里。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

test('package.json: 身分与 description', () => {
  assert.equal(pkg.name, 'dsh-understand-anything');
  assert.equal(pkg.version, '0.1.0');
  assert.equal(pkg.license, 'MIT');
  // description 写进上游名（A 报告 10/16）且与 GitHub description 一字不差（16/18）
  const expected = '理解任何东西技能包（移植自 Understand-Anything）';
  assert.equal(pkg.description, expected);
  assert.ok(pkg.description.includes('Understand-Anything'), 'description 含上游名');
});

test('package.json: scripts 依 playbook（test/prepare/prepack/prepublishOnly 全在）', () => {
  for (const s of ['test', 'prepare', 'prepack', 'prepublishOnly']) {
    assert.ok(pkg.scripts?.[s], `scripts.${s} 存在`);
  }
  // 上游 repo 根的 scripts（prepare/build/test/benchmark:large-repo/dev:dashboard/lint）
  // 是 monorepo 脚手架（vitest/官方站/看板 dev server），不属 dsh 套件逻辑：
  // - build / test（vitest run）→ 由本套件 test（node --test）取代，跑的是移植保真与转接层
  // - benchmark:large-repo / dev:dashboard → 引用上游 scripts/ 与 dashboard web 应用（未搬）
  // - lint → 上游 eslint monorepo 配置（未搬）
  for (const gone of ['build', 'benchmark:large-repo', 'dev:dashboard', 'lint']) {
    assert.equal(pkg.scripts?.[gone], undefined, `scripts.${gone} 已删（理由见交付回报）`);
  }
});

test('package.json: dsh 插件合约', () => {
  assert.equal(pkg.dsh?.bundle?.patch, './cordis.patch.yml');
  assert.equal(pkg.main, 'index.js', 'dsh 由 main 載入 cordis 插件');
  assert.equal(pkg.types, 'index.d.ts', 'types 指向 index.d.ts（playbook 必備欄位）');
  assert.equal(pkg.dependencies?.['@deepseek-ai/dsh-skill'], '0.1.0-rc.6', '精確釘版（playbook：不用 caret）');
  for (const f of ['index.js', 'index.d.ts', 'cordis.patch.yml', 'pnpm-workspace.yaml', 'skills/', 'agents/', 'packages/core/src/', 'packages/core/package.json', 'packages/tree-sitter-dart-wasm/', 'packages/tree-sitter-swift-wasm/', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'test/']) {
    assert.ok(pkg.files?.includes(f), `files 含 ${f}`);
  }
  // dist 不打包：SKILL.md 的 build step（逐字保留）在首次使用时才构建 core
  assert.ok(!pkg.files?.includes('packages/'), 'files 不含裸 packages/（dist 会一起打包）');
  assert.ok(!pkg.files?.some((f) => f.includes('dist')), 'files 不含任何 dist 路径');
  assert.equal(pkg.keywords?.includes('dsh-plugin'), true, 'keywords 含 dsh-plugin');
  assert.equal(pkg.keywords?.includes('understand-anything'), true, 'keywords 保留上游');
  assert.equal(pkg.repository?.url, 'git+https://github.com/GongYuanCaiJi/dsh-understand-anything.git');
  assert.equal(pkg.homepage, 'https://github.com/GongYuanCaiJi/dsh-understand-anything');
  assert.equal(pkg.bugs?.url, 'https://github.com/GongYuanCaiJi/dsh-understand-anything/issues');
  assert.ok(pkg.author, 'author 存在');
});

test('cordis.patch.yml: insert 本插件', () => {
  const patch = readFileSync(join(ROOT, 'cordis.patch.yml'), 'utf8');
  assert.match(patch, /^-\s*insert:/m, '顶层 insert 条目');
  assert.match(patch, /- id: dsh-understand-anything/, 'insert 本插件 id');
  assert.match(patch, /name: dsh-understand-anything/, 'insert 本插件 name');
});

test('LICENSE: 上游逐字 + 移植者角色行（无 NOASSERTION 前缀）', () => {
  const license = readFileSync(join(ROOT, 'LICENSE'), 'utf8');
  assert.ok(license.includes('Copyright (c) 2026 Yuxiang Lin'), '上游 copyright 行逐字保留');
  assert.ok(license.includes('Copyright (c) 2026 Infinite Universe, Inc.'), '上游第二 copyright 行逐字保留');
  assert.ok(license.includes('Copyright (c) 2026 GongYuanCaiJi (dsh port)'), '移植者行标 (dsh port) 角色');
  assert.ok(license.includes('MIT License'), 'MIT 全文');
  assert.ok(!license.includes('Original work:'), '无会让 GitHub 认不出 MIT 的前缀');
  assert.ok(!license.includes('Modified work:'), '无会让 GitHub 认不出 MIT 的前缀');
});

test('THIRD_PARTY_NOTICES.md: 钉住上游 commit 身分', () => {
  const notices = readFileSync(join(ROOT, 'THIRD_PARTY_NOTICES.md'), 'utf8');
  for (const pin of [
    '`32944829e7a63a9fa9c55d811d7f98a9530c6a6a`',
    'Egonex-AI/Understand-Anything',
    '242 档',
  ]) {
    assert.ok(notices.includes(pin), `NOTICES 含 ${pin}`);
  }
});
