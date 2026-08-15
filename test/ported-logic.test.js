import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// 被移植的邏輯本身也要有測試（playbook：不是只測新寫的轉接層）。
// skill 的纯 python 脚本（stdlib-only，不依赖 core build）用小型 fixture 跑真实输入：
//   - extract-domain-context.py：读项目目录 → 产出 domain-context.json
//   - parse-knowledge-base.py：读 wiki 目录 → 产出 scan-manifest.json
// 这两个脚本是上游逐字搬入的（verbatim manifest 有钉 hash），这里验证它们
// 在 dsh 套件的实际路径下真的能跑、产出约定的档案形状。
const ROOT = fileURLToPath(new URL('..', import.meta.url));

function havePython() {
  try {
    execFileSync('python3', ['--version'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

test('ported-logic: extract-domain-context.py 对小型 fixture 产出 domain-context.json', { skip: !havePython() && 'python3 不可用' }, () => {
  const fixture = join(ROOT, 'test', 'fixtures', 'tmp-domain-proj');
  rmSync(fixture, { recursive: true, force: true });
  mkdirSync(join(fixture, 'src'), { recursive: true });
  writeFileSync(join(fixture, 'src', 'main.py'), 'def main():\n    return 1\n');
  writeFileSync(join(fixture, 'README.md'), '# demo\n');
  try {
    execFileSync('python3', [join(ROOT, 'skills', 'understand-domain', 'extract-domain-context.py'), fixture], {
      cwd: ROOT,
      stdio: 'pipe',
    });
    const out = join(fixture, '.ua', 'intermediate', 'domain-context.json');
    assert.ok(existsSync(out), 'domain-context.json 必须被产出');
    const data = JSON.parse(readFileSync(out, 'utf8'));
    assert.equal(typeof data, 'object', '产出的档案是物件');
    assert.ok('projectRoot' in data && 'fileCount' in data, '含 projectRoot/fileCount 契约栏位');
    assert.equal(data.fileCount, 1, 'fixture 只有 1 个源码档');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('ported-logic: parse-knowledge-base.py 对小型 wiki fixture 产出 scan-manifest.json', { skip: !havePython() && 'python3 不可用' }, () => {
  const fixture = join(ROOT, 'test', 'fixtures', 'tmp-wiki');
  rmSync(fixture, { recursive: true, force: true });
  mkdirSync(join(fixture, 'raw'), { recursive: true });
  mkdirSync(join(fixture, 'wiki'), { recursive: true });
  writeFileSync(join(fixture, 'raw', 'source.md'), '# Title\n\nbody text\n');
  // Karpathy pattern 侦测需要 index.md + wiki 根下 ≥3 个 markdown
  writeFileSync(join(fixture, 'wiki', 'index.md'), '# Index\n\n## Topic\n\ncontent\n');
  writeFileSync(join(fixture, 'wiki', 'page-a.md'), '# Page A\n\ncontent\n');
  writeFileSync(join(fixture, 'wiki', 'page-b.md'), '# Page B\n\ncontent\n');
  try {
    execFileSync('python3', [join(ROOT, 'skills', 'understand-knowledge', 'parse-knowledge-base.py'), fixture], {
      cwd: ROOT,
      stdio: 'pipe',
    });
    const out = join(fixture, '.ua', 'intermediate', 'scan-manifest.json');
    assert.ok(existsSync(out), 'scan-manifest.json 必须被产出');
    const data = JSON.parse(readFileSync(out, 'utf8'));
    assert.ok(typeof data === 'object', '产出的 manifest 是物件');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
