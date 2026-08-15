import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// README 的公开契约（cn-repo-conventions N=73 + A 报告 N=18 + playbook G1/H1）：
// 双语两段都要改到、未发布就不准裸名安装、attribution 与回连齐备、说明没搬什么。
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readme = readFileSync(join(ROOT, 'README.md'), 'utf8');

test('README: 双语两段都存在（简中在前）', () => {
  assert.match(readme, /^# /m, '有标题');
  assert.match(readme, /^## English$/m, '英文段锚点');
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('**一句话：'), '中文段有粗体一句话 pitch（cn-repo-conventions 模板第 5 项）');
  assert.ok(en.length > 200, '英文段非空');
});

test('README: 两段都有安装指令（github: + 本地路径），无裸名', () => {
  // 未发布到 npm → 裸名 `add dsh-understand-anything` 会 404（playbook G1/H1，中过两次）
  assert.equal(readme.match(/add dsh-understand-anything/g)?.length ?? 0, 0, '零裸名安装');
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('add github:GongYuanCaiJi/dsh-understand-anything'), '中文段有 github: 安装');
  assert.ok(en.includes('add github:GongYuanCaiJi/dsh-understand-anything'), '英文段有 github: 安装');
  assert.ok(cn.includes('allowBuilds'), '中文段有 allowBuilds 提示');
  assert.ok(en.includes('allowBuilds'), '英文段有 allowBuilds 提示');
  assert.ok(cn.includes('git clone https://github.com/GongYuanCaiJi/dsh-understand-anything.git'), '中文段有本地路径');
  assert.ok(en.includes('git clone https://github.com/GongYuanCaiJi/dsh-understand-anything.git'), '英文段有本地路径');
});

test('README: attribution 与回连（A 报告：措辞 port/移植、回连 ≥2、上游连结指套件本体）', () => {
  assert.ok(readme.includes('移植自'), '用「移植」措辞');
  const upstreamLinks = (readme.match(/https:\/\/github\.com\/Egonex-AI\/Understand-Anything/g) ?? []).length;
  assert.ok(upstreamLinks >= 2, `回连上游 ≥2（实际 ${upstreamLinks}）`);
  assert.ok(readme.includes('THIRD_PARTY_NOTICES.md'), '引用逐字自验文件');
});

test('README: 说明没搬什么（web 应用 + 去哪里拿）', () => {
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('web 应用'), '中文段说明 web 应用未搬');
  assert.ok(en.includes('web app'), '英文段说明 web app 未搬');
  assert.ok(cn.includes('Egonex-AI/Understand-Anything'), '中文段指向上游拿');
  assert.ok(en.includes('Egonex-AI/Understand-Anything'), '英文段指向上游拿');
});

test('README: 请给上游 star（两段）', () => {
  const cn = readme.split('## English')[0];
  const en = readme.split('## English')[1];
  assert.ok(cn.includes('star'), '中文段有 star 呼吁');
  assert.ok(en.includes('star'), '英文段有 star 呼吁');
});
