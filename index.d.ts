// dsh-understand-anything 的型别宣告（playbook：package.json 必须有 types）。
// 套件本体是纯 JS cordis 插件；这里宣告对外可用的 API，供 TS 消费者使用。

/** dsh skill registry 的候选技能（candidate）。 */
export interface SkillCandidate {
  name: string;
  description: string;
  invocation: { modelInvocable: boolean; userInvocable: boolean };
  provider: string;
  source: string;
  rank: number;
  resourceBase: { kind: 'directory'; path: string };
  locator: string;
}

/** get() 回传的完整技能定义。 */
export interface BundledSkill extends SkillCandidate {
  content: string;
}

/** cordis 插件名（dsh 载入时用）。 */
export const name: string;

/** 列出 skills/ 下每个含 SKILL.md 的目录转成的候选。 */
export function listBundledSkills(root?: string): SkillCandidate[];

/** 从 SKILL.md 的 YAML frontmatter 抽出 name / description（纯解析，不做 fallback）。 */
export function parseFrontmatter(
  markdown: string,
): { name?: string; description?: string };

/** 注册 provider 进 dsh skills registry。 */
export function registerUnderstandAnythingSkills(ctx: {
  inject(deps: string[], fn: (ctx: { skills: unknown }) => void): void;
}): void;

/** cordis apply 入口。 */
export function apply(ctx: unknown): void;
