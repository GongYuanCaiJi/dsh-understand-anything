# THIRD_PARTY_NOTICES

本套件（`dsh-understand-anything`）是 GitHub 仓库
[`Egonex-AI/Understand-Anything`](https://github.com/Egonex-AI/Understand-Anything) 的移植（port），
上游授权 **MIT**。逐字保留的宣称以本档钉死的杂凑为准，任何人可自行验证。

## 上游

| 栏位 | 值 |
|---|---|
| 上游 repo | <https://github.com/Egonex-AI/Understand-Anything> |
| 上游 commit（钉死） | `32944829e7a63a9fa9c55d811d7f98a9530c6a6a` |
| 提交时间 | `2026-08-11 22:13:36 +0800` |
| 上游 plugin 版本 | `2.9.4` |
| 授权 | MIT（Copyright (c) 2026 Yuxiang Lin · Infinite Universe, Inc.） |

验证命令（在任何机器上逐字节核对）：

```bash
git clone https://github.com/Egonex-AI/Understand-Anything.git /tmp/ua-upstream
cd /tmp/ua-upstream && git checkout 32944829e7a63a9fa9c55d811d7f98a9530c6a6a
# 对每个逐字档案（下表）：
cmp <上游>/understand-anything-plugin/<rel> <本 repo>/<rel>
# 或用 SHA-256 核对：
shasum -a 256 <本 repo>/<rel>   # 必须等于下表值
```

## 移植说明

- **搬运范围**（依派工票 #34 的能力边界）：只搬 skills / agent 层。
  上游 web 应用（`homepage/` 官网、`packages/dashboard` 交互看板、`packages/viewer`
  独立查看器）**不搬**，README 有说明去哪里拿。技能脚本运行时依赖的分析引擎
  `packages/core` 与两个 vendored tree-sitter WASM 语法（`packages/tree-sitter-*-wasm`）
  属于 skill 层的运行机制，**不是** web 应用，一并逐字搬入。
- 上游 `understand-anything-plugin/` 内的 **242 档逐字未改**（下表）；两个 SKILL.md
  因 dsh 安装形态无法自行解析插件根而做了**最小适配**（只加候选、不改既有行为），不属逐字范围：
  - `skills/understand/SKILL.md` —— 插件根发现（plugin-root discovery）新增
    `DSH_SKILL_DIR` 候选：dsh 把 skill 装在 `<plugin-root>/skills/<skill>`，
    插件根在 skill 目录上两级；其余候选路径照旧保留。
  - `skills/understand-domain/SKILL.md` —— 同上（该 skill 自己的发现块）。
  - 适配都是**加候选、不改既有行为**：非 dsh 安装路径全部照旧。
  - `skills/understand-dashboard/SKILL.md` 保持**逐字原样**——它的目标是 web 应用
    （dashboard），而 web 应用依票面边界不搬，该 skill 在 dsh 里无法运作是设计内的能力边界，
    README 已说明去哪里拿。
- 上游没有的档案（本 repo 新增，非上游内容）：`package.json`（dsh 插件合约）、
  `index.js` / `index.d.ts`（skill provider 转接层）、`cordis.patch.yml`、
  `pnpm-workspace.yaml`（skill 脚本构建 core 所需的工作区）、`README.md`（移植版门面）、
  `LICENSE`（MIT 全文 + 上游 copyright 逐字 + 移植者行）、`THIRD_PARTY_NOTICES.md`、
  `test/`、`.gitignore`、`package-lock.json`。
- 上游根目录的其他内容（install 脚本、平台清单、docs、根 README 等）不属于
  skills / agent 层，未搬入。
- 逐字档案的 SHA-256 与 `test/fixtures/verbatim.sha256.json` 相同
  （`test/verbatim.test.js` 自动核对两者）。

## 逐字档案 SHA-256（242 档）

| `skills/understand/build-fingerprints.mjs` | `9b1d0589f0ed1827301edd3585fc7da0340dd29434a5ab3ab54aed1a0a6baca3` |
| `skills/understand/compute-batches.mjs` | `1fe822bb14df9d4ddc97521a9803eb1b3216300a70c0cb3ea60763429ba7e588` |
| `skills/understand/extract-import-map.mjs` | `308b1f0b22a9cba437bb10e197f520cd2f554e7bdd82b510001a6bbabe5113aa` |
| `skills/understand/extract-structure-result.mjs` | `637287452487b1ecbcf4ac3c91de19ee901f9bc84084bce5f6b7c6695e92566d` |
| `skills/understand/extract-structure.mjs` | `8112caee53f94f1e1ff1da4842eef01efc3bd7218f759518dcea88eba97a2149` |
| `skills/understand/frameworks/django.md` | `a2257a849cf64d09cf2869a3106991264d7f50acd03c93e76284ed288cba7051` |
| `skills/understand/frameworks/express.md` | `0a7b0d4ddc72fca3d1cbf5d7c63739f4cbbb924b86625907df03656b6734898c` |
| `skills/understand/frameworks/fastapi.md` | `54f971f48dd74a6138d9cd03a3c4e7f4b06ab803403a663ebcc4a6422c0671b1` |
| `skills/understand/frameworks/flask.md` | `645844e41c9a09ab47233c4ed68febfb7e15d8cc6bb354bb029b4218b0d6141c` |
| `skills/understand/frameworks/gin.md` | `6621187a9fe0023d7d36ffe51680571ee58a7a77ebe915db4d35b6fb26eadb77` |
| `skills/understand/frameworks/nextjs.md` | `99ae673ecaf27381e18483b12a6dc66ce7bbc37f3bf8f2f66344a160a882f2ea` |
| `skills/understand/frameworks/rails.md` | `f5fb1fb05a32c9e71ba44e93d205252fd4e58b71a6cce9d62cd4ee20d14adc36` |
| `skills/understand/frameworks/react.md` | `eaaf30363244b89a6bad91971f3d476ec809a8892f387a8bf33c04638a04af20` |
| `skills/understand/frameworks/spring.md` | `296c10395b794c8c0741cd2faaa61f9e171933003f39cbe45f462237ed1066c6` |
| `skills/understand/frameworks/vue.md` | `49a432fe59c8b0759632bd1745b4acc7ddcaef4343a270d97698d9bede69e5db` |
| `skills/understand/generate-ignore.mjs` | `253bb28abb00dfdd2e40d3e816a200a576c7419ef90b700e267e27890dcb0a8c` |
| `skills/understand/languages/cpp.md` | `2a658bb677944fa58e6a244430d120cb0657d09e4e50fe28a9cdfbdd554f46f9` |
| `skills/understand/languages/csharp.md` | `507cb86fb5c494d9d5e8ab947015ac6f4e7a2c280c0509ffdbab812a0472c467` |
| `skills/understand/languages/css.md` | `ed3a8dcd96e9921d8d85cfcf0ea07d7a15838cd076180017a80162b1b7166131` |
| `skills/understand/languages/dockerfile.md` | `bb548a778970cb234ea805ee35dde488274eb077d2b671aa4b55297985f88bb6` |
| `skills/understand/languages/go.md` | `359f808ba97c79726598fe92478ee5680c1bd22a6065db9d374e403f5e19f0e1` |
| `skills/understand/languages/graphql.md` | `735b28063ee40ad7b07fc76a4268f96fa59f9fd5d38f185f4914275a1fa430e3` |
| `skills/understand/languages/html.md` | `059b74d8ca82efa09c273afc00aa96796202f637f147242990ebe2c90897ce3f` |
| `skills/understand/languages/java.md` | `fd8584d68da5d11e2b8b4e1c8a3d737175bfe77abe55ba49ca5750359571f55d` |
| `skills/understand/languages/javascript.md` | `4e2bc5e4c4139c86baf2a0e48587a4130d337d06929a323d8b2ab302c3355352` |
| `skills/understand/languages/json.md` | `6a420be6610ed2c5f2950f72b1e3f9c6c15a2377f23d70e066a9bd4ae860cf4a` |
| `skills/understand/languages/kotlin.md` | `fe3d5eff0f190027ce6e9686bc80e7dce4313aced194a014febb3e93cd091977` |
| `skills/understand/languages/markdown.md` | `32203c73af64c9f38768199887a25f5e58c166957b82b8b8934fb926d614f944` |
| `skills/understand/languages/php.md` | `043635d64c89b6293936085f2cd341f055d61b71132b0d09ed599e608023c772` |
| `skills/understand/languages/protobuf.md` | `7db34b5f2085ab14ac888c4c817caa6f1045a7405e14f7c30000bec93139b3dd` |
| `skills/understand/languages/python.md` | `bb6553846c7ddb63ab4c156caf183fa64f59c63a56c3b0aaa42f764f9332ba94` |
| `skills/understand/languages/ruby.md` | `f5942f0e7136e48723c7d70ef49358cc9d12d4e3b3144e65607c947137382788` |
| `skills/understand/languages/rust.md` | `32cb3c3fcd1a560821ed09dd9a0da184dfa5c79c85f1e03034945ef4d14208d4` |
| `skills/understand/languages/scala.md` | `95b9f2c45f473e02226031b6998f2a2c6201d33304d0d885f5cc578ca3e3855c` |
| `skills/understand/languages/shell.md` | `f9992d17799065cef318c6906ad6cdad646cb3bbbe9ff1d07234a0634f587bd9` |
| `skills/understand/languages/sql.md` | `d0345797e637e91ae8e98f1f9fc37b62b881a6691e2801a60139fc422341c4a4` |
| `skills/understand/languages/swift.md` | `4c866204fffe114a4e27f11b162829257cd687020cb69b30bce88dbfff334775` |
| `skills/understand/languages/terraform.md` | `862d02b31ebc9de6d03d2112cf17084fcc15b4952bed08fa39e69260d642748e` |
| `skills/understand/languages/typescript.md` | `20d6d1ae757d806b8a4aeb0aa6e9fb5c3307ad4e3c83715d2e8532924e8afda6` |
| `skills/understand/languages/yaml.md` | `0cda6694a866ca53715a23cafcc00d5e8995437916a49e40eb77a50114e55d7f` |
| `skills/understand/locales/en.md` | `bfbecb6e2e902bf92ee0476a35ea8c267fd7040ba8ffa2621da183fe767dc3b2` |
| `skills/understand/locales/ja.md` | `97c8462f64dd6fd8400861eb49871b27640b144d532e4be7f866689eefc7b7c6` |
| `skills/understand/locales/ko.md` | `2a7cbed153d563221516858160b073e33b1080881b13a652f60667e98f0a3e6f` |
| `skills/understand/locales/ru.md` | `02a9cfb7894ffd6e68a24d1dfd050ccc06bd66cac10b0b35d75acf72cedf12de` |
| `skills/understand/locales/zh-TW.md` | `727f14f80a4edb73dfe53025686d5d3afe865eaa554ec1c6c787f3a9a070621f` |
| `skills/understand/locales/zh.md` | `06cbd26979a3383f6177b3d37995bef44f104ebe2de43704b8b1d1b5031ad98b` |
| `skills/understand/merge-batch-graphs.py` | `1e7b6612f09d8e440f1aa3b9fd97bb7bd4c557f39e1e3cf33d116e66cdfaae94` |
| `skills/understand/merge-subdomain-graphs.py` | `b984a478a18eb7a0186f5374dd733fc001bc77806215bd067f404107911fa059` |
| `skills/understand/scan-project.mjs` | `8a3cc5b1a25c11aa28699c16ab9451c8ba824f35ee0bc956a0d4547e66337d40` |
| `skills/understand-chat/SKILL.md` | `5f1da70e0849ec2f3005fc232a95ab5f4b1c09cc062ced13945ce8516ca0e5f7` |
| `skills/understand-dashboard/SKILL.md` | `d12cb059d8e6139873542111ccec691b0603496675182f5ac826d5b65273331a` |
| `skills/understand-diff/SKILL.md` | `fc8dc1b216ee1a480daff421c41c27218d7a0db881d35d0c22e9858de5189379` |
| `skills/understand-domain/extract-domain-context.py` | `3ae26832a8df8090b606d86839d0721cc1c316aaac28e2b8fba77ed6d7455ae7` |
| `skills/understand-explain/SKILL.md` | `661389c81c9133e6cdc99ba033678300ba7a7a377031396b259a23dad39496fe` |
| `skills/understand-figma/SKILL.md` | `b8f76ffb75250a265d609d597c218d1884e220618065240748f2256ef10c475d` |
| `skills/understand-figma/figma-merge.mjs` | `29018498529cf26be6166639ee6e93573b7cd16dba87def29c16f78fa9100797` |
| `skills/understand-figma/figma-scan.mjs` | `257a23096534bd32047a294ffbcc84019d85e85a8b7b58aeb4ad69de105a6805` |
| `skills/understand-knowledge/SKILL.md` | `e2b225a82d0fc59a83b8391afe17d1ff7f84acb831d2cf716f0ab583ba09c010` |
| `skills/understand-knowledge/merge-knowledge-graph.py` | `97e625234ce28bec7b1b02ec7191c70c6c75a54dda3579f7e94bc06ec10679f3` |
| `skills/understand-knowledge/parse-knowledge-base.py` | `4eb78d9a8a628bb4547a0c88cb57c2b2a22ba595664736a579ad56d9e46d7249` |
| `skills/understand-onboard/SKILL.md` | `e5be45248859ca8255546a18a340bc1556984162f5b1a3f77da1e66136a557b3` |
| `agents/architecture-analyzer.md` | `f16802354106730a8307380f858873178bf8b5db9d0de3530aacee6b6b929425` |
| `agents/article-analyzer.md` | `322609af02f9b2ab8dfd5e22d2062857c23006a31df9545b5fa5ac96b08de6ae` |
| `agents/assemble-reviewer.md` | `6b5c4ad7526dd373a2a9734ecac1e811a99f6257300e5db57d806eb9e2b05667` |
| `agents/design-analyzer.md` | `568bc73c7d54877d9dfff2c37acefbdadc4d859d710da8e7fad7fb3199842c32` |
| `agents/domain-analyzer.md` | `d9a7fa7b1fc2ec4ef410b4c592a34b54a5dc0fc46699b38b77e9179f4732feba` |
| `agents/file-analyzer.md` | `913a605380ece2668f555f641db301c10dbf1424186dd7c284132bda3f6303ff` |
| `agents/graph-reviewer.md` | `aecfb1869a191eff9699346888d5ea629a9993278a2d4bd4633df3478f223993` |
| `agents/knowledge-graph-guide.md` | `42b5c7ae961aed2b8e1991341b8c8172a215dc69142c0f717f6fd7173beaed95` |
| `agents/project-scanner.md` | `8041ad83a642b52b295a33db9ed910be23db920d46140cdcb25af0a36d2ef56c` |
| `agents/tour-builder.md` | `05f23cc3c156c37c9f20ca312d8dd5fce8145b35243463ac671248e95f1df65c` |
| `packages/core/package.json` | `00c8c100bc2e8a266699a1076dbb77c1f2a16ed63bb00c5dbacf90117844e805` |
| `packages/core/src/__tests__/change-classifier.test.ts` | `e9901bc0fd7d09a54d1b50f6366957c7741f761ae3efc58ab8026edafa99c61f` |
| `packages/core/src/__tests__/config-schema.test.ts` | `ba3d9c1ca5f2bf3e3cf30fdff09e2b4645d7f4a4b1b6a71a84381a740ec74807` |
| `packages/core/src/__tests__/domain-normalize.test.ts` | `67401881c292ac8a8c078f18ea49499e286ce353733dbc0c3a1688972bef73cf` |
| `packages/core/src/__tests__/domain-persistence.test.ts` | `ae6a63b70de2870958aa4d5867db07ea4d177682a6ff546fb8e94bfee6c3f5e2` |
| `packages/core/src/__tests__/domain-types.test.ts` | `802633ac5c17200e8ccb5dcb7ea83a12feef4650f8548a1bb5ab895823bf0134` |
| `packages/core/src/__tests__/embedding-search.test.ts` | `50286dec2bcec9013655b6796ca4ee040435d9bc4adea98b4ac03f5e056265ee` |
| `packages/core/src/__tests__/fingerprint.test.ts` | `4372804f5cf79dc44e1e265b3cebca1b8ba5a2f0e4a319c1918f88426585de71` |
| `packages/core/src/__tests__/framework-registry.test.ts` | `2f238ce7494de8750bc58c020f141111397737ca4bc3fdb67063d0209758365b` |
| `packages/core/src/__tests__/graph-freshness-timeout.test.ts` | `31758c2c57b57755ac77b10c3e2058d9586520b83e2ebbad2ed7d9af7928c8e9` |
| `packages/core/src/__tests__/graph-freshness.integration.test.ts` | `fdf478b99813b7a2b1eceab61d493d4a863993401242f874de123c2a6864a66e` |
| `packages/core/src/__tests__/ignore-filter.test.ts` | `d91809da429b1bfee3ccd03f0bbaf272148bae74f364519551038130d31e61ba` |
| `packages/core/src/__tests__/ignore-generator.test.ts` | `15daf8631991747a3f55495d40efb7171637465b1b01b13c6ffc07a03901107b` |
| `packages/core/src/__tests__/language-lesson.test.ts` | `7a56445185c79e7aebbc829b87ac724d0142356d9efaca8598b145cfc2d7931e` |
| `packages/core/src/__tests__/language-registry.test.ts` | `b9135327b42d6c8b07ff031a4a16c088a697efb65d31962ec43cd10c1d7141be` |
| `packages/core/src/__tests__/layer-detector.test.ts` | `20a1da6af3ee477f1fe4a19813780cdd90a60b0931e50b2168bd45c232228147` |
| `packages/core/src/__tests__/normalize-graph.test.ts` | `9ebaab628ae7607056ff17e964967f2fcc7dff9c8ecf38c38388527ee3df3ce4` |
| `packages/core/src/__tests__/parsers.test.ts` | `d1a34539d56867d2cc3c83e16a3955af50ae2d9863985dcaaa8a58d06cd78c09` |
| `packages/core/src/__tests__/plugin-discovery.test.ts` | `ff67e53e363e183f95407e07428d89302a1916d1ec03edf4dccdbf142ae7c315` |
| `packages/core/src/__tests__/plugin-registry.test.ts` | `1d4b2094dcba71d194806e8db63481ebd8bf5f03869d6cb75392556b9fb3cfac` |
| `packages/core/src/__tests__/schema.test.ts` | `cf2e99aad42949a7ee15a6a1ab0e3c461fce4680b3ce1d6d8d69023dc3dd1423` |
| `packages/core/src/__tests__/search.test.ts` | `362b87f5b49ca7ed8a72f06806c81d9eeb562dece9f0aaa2a91745cf1336b002` |
| `packages/core/src/__tests__/staleness.test.ts` | `61d6aaab3981e27fa8a21df878d954370e22020d64b5c7e9fac83e0fce67a267` |
| `packages/core/src/__tests__/tour-generator.test.ts` | `8e7bf331d659c05742271af104f31f95203257f1ecd2a21d58e83a7b3aed4629` |
| `packages/core/src/analyzer/graph-builder.test.ts` | `5243f94d7eaa97affab2a03d3f8b83a0b41efaf6bde1eb84f55714789aa85867` |
| `packages/core/src/analyzer/graph-builder.ts` | `e08369943951d65e31cce36da4c34333e6c622690c2651f4ccf3c497b3a8f240` |
| `packages/core/src/analyzer/language-lesson.ts` | `a6c053e101db795b83fdd07585383a17ef397cf60d0f2e64824ea513151a5d87` |
| `packages/core/src/analyzer/layer-detector.ts` | `1a0d045d9b0b8485335c5417abc9c39339b4572b693db65624a0a7aff5b84c49` |
| `packages/core/src/analyzer/llm-analyzer.test.ts` | `5f4fe5ac5629606ef293f08443bd4a5a2955adfe128b75540214915c8a753b24` |
| `packages/core/src/analyzer/llm-analyzer.ts` | `2c27b6183b8fa2857df989f25086205d6f885df805a3cd1c91cfd091aa237270` |
| `packages/core/src/analyzer/normalize-graph.ts` | `5149ce3855c1b29147798b5c98ece156f7e7d94c63d1dfc1ecf85f9b88d59d9b` |
| `packages/core/src/analyzer/tour-generator.ts` | `97c3682b686c87b888e11e4a57541ceda2549d47a31b367693d09ab0e0ad1961` |
| `packages/core/src/change-classifier.ts` | `7458aa39d5de1f7dad64f149ec8fb31384226c87af24c2cd80d668987dccf5ce` |
| `packages/core/src/embedding-search.ts` | `f3eb18476cc71b7668133612c31be5a0d3cd47cca9494997b465116b373552f8` |
| `packages/core/src/figma/__tests__/api-source.test.ts` | `0ebe615e9cab231de7efaf59bf30a7fc2c446355dbdb12b6e66a4bab6334e47b` |
| `packages/core/src/figma/__tests__/merge.test.ts` | `b0c9903847913cbcec207b19315fb63d61ed7be01015fcb4fd2788019bc56763` |
| `packages/core/src/figma/__tests__/parse-document.test.ts` | `4f36b01bd56c546f89918fea2b3b367059f4ffd1e4be91753d4bb4b70e610e9e` |
| `packages/core/src/figma/__tests__/thumbnails.test.ts` | `b22050060a167e361e406b50ba2a5d134bcdab32c1ae5735b831c912bfdb3954` |
| `packages/core/src/figma/__tests__/tokens.test.ts` | `e5198bb25e3ccf7f20a0265383daa34fe89dff49b89aba146743a2277f9ac76a` |
| `packages/core/src/figma/index.ts` | `e304861c78df96344d46b2740da79f72ec460a7fd9dbb8c41840d319e2f17d1a` |
| `packages/core/src/figma/merge.ts` | `03c2499f53df51d5ea86c7df4f482fd09db1298c8b2213df565bd349cf4361f5` |
| `packages/core/src/figma/parse/parse-document.ts` | `884cb38f0abf8b9a078a3fcf5509c8016035b697b543694547947b347ca63915` |
| `packages/core/src/figma/parse/tokens.ts` | `e70c9b27f34f9791a8909ce698cd6b17f7e62b89f1c4cdb8e9de66a6c012530e` |
| `packages/core/src/figma/source/api-source.ts` | `202e2f580aa671098444ef30eb1eba5941881074bff450390b4d2465598011d1` |
| `packages/core/src/figma/source/types.ts` | `1937a7a7ddda59fd1a231a4811f915fbd9b996ad40e93ba376dca5215d2e7f07` |
| `packages/core/src/figma/thumbnails.ts` | `be40e693817d6a17452c29107949789ed756df2363469dc949fc61350a30bc29` |
| `packages/core/src/fingerprint.ts` | `1bdac3ca76e50b3c4cd814222d4d45118b5cc36db9482324896eec71f67e0efb` |
| `packages/core/src/ignore-filter.ts` | `5b2490b26d0284524502294cdeccdbff9807150104942f4b8e99d8580bb4a36f` |
| `packages/core/src/ignore-generator.ts` | `cc60b939562598ca43df1883af2cf098081edd569824e5663202ee5c76894e08` |
| `packages/core/src/index.ts` | `6234738f001a2a236ae498befe8ebda856163ce89718906452365a843a972925` |
| `packages/core/src/languages/configs/batch.ts` | `0435e12e73c604a4eebd5b323f94fcb080d4c92582b5618e5c1bfdd9f0dd10cb` |
| `packages/core/src/languages/configs/c.ts` | `33b63954469b7058fdec280109f5e193a7892cf677656645277ceff88389e6c2` |
| `packages/core/src/languages/configs/cpp.ts` | `ae356e83bd6a6f95e1d1eb7c47fca19db1cdce8e0583efe5ebfda4ab3544d845` |
| `packages/core/src/languages/configs/csharp.ts` | `a990cad08e6ba7198cf3604a278fbb2a599470b7fe6449b45b8b89e2a6bd9943` |
| `packages/core/src/languages/configs/css.ts` | `827e5b582ed404174afd832b2fb6a347930e16ed91870300b97816e4b67293a0` |
| `packages/core/src/languages/configs/csv.ts` | `48cd43241ff9c13b8ab5f4e89200ace18e7f50708d051a05d62f1ae999ff51a0` |
| `packages/core/src/languages/configs/dart.ts` | `7bb6412a801c173d80b2cb0b03d3920ec78782ab4c1c719bed208bed134f1a96` |
| `packages/core/src/languages/configs/docker-compose.ts` | `d29301580b7349b9bc43b9774bc64d670e81d29b4c85067dbc03154cef2dfebe` |
| `packages/core/src/languages/configs/dockerfile.ts` | `73290f6cd4099f1bdbeda82d81786df77bdfd831d093822ef31ee097fd542b52` |
| `packages/core/src/languages/configs/env.ts` | `7c4dfcd9dfb26963ce87e9b26f61bb48e31452cebd4a8beb8e502e43ab3aaba2` |
| `packages/core/src/languages/configs/github-actions.ts` | `0aaf0265574abf3c5fcbc18f8db1b4e8949385db9cf27aa93369bdceeb5352af` |
| `packages/core/src/languages/configs/go.ts` | `e8987c5521eeab47f608608cc09c46657e31df0afaff9a98be037b0221c70aee` |
| `packages/core/src/languages/configs/graphql.ts` | `6bbcd6a5556218a3b86ba5d2d2a46fa5a25ee52304d9fcda5b7af1a5a29b6124` |
| `packages/core/src/languages/configs/html.ts` | `c0f78e0ee4502d5fe8aa855cf2ec74b095cd6716e2dc14ccf960f1716ccce2ca` |
| `packages/core/src/languages/configs/index.ts` | `90c5cf743514a0a4ed1f299332605d601c30f5bee25026b6016961e942d6535d` |
| `packages/core/src/languages/configs/java.ts` | `35cd4ddcd8730073230150a17c0b3a245f50698666142dbad79da080ad85e354` |
| `packages/core/src/languages/configs/javascript.ts` | `dedb9e3ab9e2b1c21c102212e8489382ccb078e5554453ca514b53e4b914029a` |
| `packages/core/src/languages/configs/jenkinsfile.ts` | `7bde6a64bdf481aab8b0d2163f58c2a4eb1c6f5d6a687f9165e5d20f1dd14dd3` |
| `packages/core/src/languages/configs/json-config.ts` | `42fb52fbc7d8de4bc70bc2fa034395c300cee49b61b4f0e35af421c9576241fa` |
| `packages/core/src/languages/configs/json-schema.ts` | `722b955d13beb90b5493357fc661f78758b9f59b23392b7817c8f666497d97aa` |
| `packages/core/src/languages/configs/kotlin.ts` | `2410031b05d8b60ee86f9b0a8d13c41a443ffe9d72aa69fd5da423d0b2ffaa43` |
| `packages/core/src/languages/configs/kubernetes.ts` | `fa2d8cdd699d3d973900de5df6c00e5b581eb23a6803bbb92be1dddbb587ef88` |
| `packages/core/src/languages/configs/lua.ts` | `6bb85a8462b878ab84c62adff8a50db1e25e33909458110565e84147b88cd7f0` |
| `packages/core/src/languages/configs/makefile.ts` | `b8bc272b88bd078062086ef4f6c41e5d0ef1560f4ce9adfb4c2dd042b4f0b32b` |
| `packages/core/src/languages/configs/markdown.ts` | `945b87846fb2c8a7319fc3cc304979d1bb0552c6922298a10b883ea1df06b75c` |
| `packages/core/src/languages/configs/openapi.ts` | `750284c9f704c63e52f9ff290a4a6399296d3ee0d536138219c2ab773e7133c7` |
| `packages/core/src/languages/configs/php.ts` | `9a7102d3c7d8dabf69671cca3cd26c7e55adf3a5fcf40e27826d26ea4ac9d51a` |
| `packages/core/src/languages/configs/plaintext.ts` | `1ce9ad20c964816480ad6e43cb3551b455c46094da6d846241f90826d8202b5e` |
| `packages/core/src/languages/configs/powershell.ts` | `9f9b84449b52089ac5306b0bfafff944431f6ae19aed3912f38f51e81e311555` |
| `packages/core/src/languages/configs/protobuf.ts` | `936e343669a7f40925bf25c92e68c511c56bd44a8653f940ec5ce3a5cad2c729` |
| `packages/core/src/languages/configs/python.ts` | `f55c580979f5d3bf62ccbc9d33cd4a15ad13570cdbae09738b1128507c60cd71` |
| `packages/core/src/languages/configs/restructuredtext.ts` | `e9519f888a1f7383aa0c999d698cb9482d76fb1a4cc5c183971c87f0ea5f27a5` |
| `packages/core/src/languages/configs/ruby.ts` | `0a787bc700925cad605c6b6cf4f0673412be1a3d18390cadf54a3527efd599ef` |
| `packages/core/src/languages/configs/rust.ts` | `dec8c7699cb11e95162b1a59c3b6d1526d46bb9a1490073b866c6fa0b78398c2` |
| `packages/core/src/languages/configs/scala.ts` | `5ad8899bc2dfa213a164ebe09a08819e2b3f1a27c4a5aa2af471ef300739b88e` |
| `packages/core/src/languages/configs/shell.ts` | `a5ff9ffc87ed0694e7697f45b9d7fff4ef67c25b672a818cf5d8d280405f0a7c` |
| `packages/core/src/languages/configs/sql.ts` | `6fd9e9461c81f6823258cca8fbdecd4b14ec8f17d2ee53f9c1e3a117af5d75a7` |
| `packages/core/src/languages/configs/swift.ts` | `2f28f9081865ebce5dfa2b3a9f3defe614d31979da7216914611c863aba9065f` |
| `packages/core/src/languages/configs/terraform.ts` | `dfea8da2a2896b36d0cd8603109a49acdf5430a4591ce217ebd6a844fae1a3e9` |
| `packages/core/src/languages/configs/toml.ts` | `f8d90748d1ddff207014df536e76587a7c386e10431fc6840a04e1667ec0225c` |
| `packages/core/src/languages/configs/typescript.ts` | `5827d48f5343d189a3a817d2fe15e878aaa2f2443a03d2db2de160baeaaf7d44` |
| `packages/core/src/languages/configs/xml.ts` | `e65473160317f50701c340a7c876cd020dc6625904132ae4a0e365e258645131` |
| `packages/core/src/languages/configs/yaml.ts` | `09996d9b5b2d2fd634000cb25df2902020a216afbc8425d611bf36fccfc99e84` |
| `packages/core/src/languages/framework-registry.ts` | `fbeefabd8a3558a8464449391ba2d09096d10ca66734612b7e753f27a115fc6c` |
| `packages/core/src/languages/frameworks/django.ts` | `64a1cd0a763e7f30bcea6e5d70c336458eaeacb856d194123ae3bc1590b2cc9c` |
| `packages/core/src/languages/frameworks/express.ts` | `3bd8de6da6783b42141286835f4d1568521ed30a16df39f9ff413f07db17adb9` |
| `packages/core/src/languages/frameworks/fastapi.ts` | `95d22224c4dba40d6b547954683eb9f57f10573452ca515565552528e9a03be1` |
| `packages/core/src/languages/frameworks/flask.ts` | `4b8d7fd31e36a581038a6b3012a9eb4b1b1e15132d9d2406b3f10ceaa1da0041` |
| `packages/core/src/languages/frameworks/gin.ts` | `b32a5db961993874117e929963acc51051686de6765419a64838414eca17f318` |
| `packages/core/src/languages/frameworks/index.ts` | `db476e809116e7f458c814699bc5590799fa5c99eb0215b5ecf463ff01d45e3e` |
| `packages/core/src/languages/frameworks/nextjs.ts` | `1154549de6b8273db301cc0fde1234d43567a6565944e453d28c5c62599b4723` |
| `packages/core/src/languages/frameworks/rails.ts` | `5657fe0b210b310ed05013b04b11c3b0fd38b8d215289d02f8d0d4724a5cc621` |
| `packages/core/src/languages/frameworks/react.ts` | `39b6d264f8cc35185529b9f6ee2906082f4642f3dde94acc54ab2f1b25bfa3f9` |
| `packages/core/src/languages/frameworks/spring.ts` | `91168e119937dd2d6db85e83bf613ffe9a6f1aa602f0212d113ff7735da4e131` |
| `packages/core/src/languages/frameworks/vue.ts` | `82cab979c5a60c436603ce3a4633c57057f23f328ee47b478b788b431f9e9c53` |
| `packages/core/src/languages/index.ts` | `8385b2fc6a90935eb18a79b32836bf6c110fcce8cc070197bcfd3818304d332c` |
| `packages/core/src/languages/language-registry.ts` | `7f736d509ba4aabb67f4de1f23d07545a9e76ad25c6aac3d08ef448d4220aeb5` |
| `packages/core/src/languages/types.ts` | `1f107c0e099ab6b29710f8f81d2e4dbe8116378d3be5fc1568f71d4dfd81c05b` |
| `packages/core/src/persistence/index.ts` | `64e9deb49b9948022f74e8193954dd3934cf9f2586a7750e0db89dc6a6f9e83c` |
| `packages/core/src/persistence/persistence.test.ts` | `305980f4c220a982568b25e55440b7703f71b51322359264b68cd1d51be44da0` |
| `packages/core/src/plugins/discovery.ts` | `b3c88c1fcc6009ad16a3b8270072dbb2e03a21aff4443e635d6d0626d07327c0` |
| `packages/core/src/plugins/extractors/__tests__/cpp-extractor.test.ts` | `147eeb1e07f3d30fc1323047a71492ee0d526f08065a8916ac55a16d48bdb6da` |
| `packages/core/src/plugins/extractors/__tests__/csharp-extractor.test.ts` | `27385361fd5b1936fce66f1ae6f1d9add69e3b94e3e271b7b66c5d744a6ad3fe` |
| `packages/core/src/plugins/extractors/__tests__/dart-extractor.test.ts` | `7f0dea1e9c0f6e53a8393b256cdfb5a11ec11a558f7cf7c840b6e4ffca799bd3` |
| `packages/core/src/plugins/extractors/__tests__/go-extractor.test.ts` | `4bbe6a0f0f7fa6b311fc8f3a95b74aaff39f7c7b4e91c3f8d8219f212ee88203` |
| `packages/core/src/plugins/extractors/__tests__/java-extractor.test.ts` | `df02c424705247d0903e138a4041be0dea21e1172ac859c4d34a7fd24f9abd99` |
| `packages/core/src/plugins/extractors/__tests__/kotlin-extractor.test.ts` | `3e5c19226783a3a89f4b437ea4af0a89e6b1e4dec98d723feab199b6f8baf5f3` |
| `packages/core/src/plugins/extractors/__tests__/php-extractor.test.ts` | `10184b66e2cc34d27b712a83439b4f46d8f592606c34d58ff03f256a38008919` |
| `packages/core/src/plugins/extractors/__tests__/python-extractor.test.ts` | `ec0d013e15b17a905d2348a76597d297c8793a715ab749ba51d94bf66f96363b` |
| `packages/core/src/plugins/extractors/__tests__/ruby-extractor.test.ts` | `2c950847b766b01b6a6e9806fefbd8eb2a2db4a8898e1a623d0caa695b189794` |
| `packages/core/src/plugins/extractors/__tests__/rust-extractor.test.ts` | `464ff733ab38c0f472a8c1eef13bbc58784388ab1477f1214bf0c54d2ebef58e` |
| `packages/core/src/plugins/extractors/__tests__/scala-extractor.test.ts` | `b0312da123d321a78962b93b39351a18c6093d8bcdc828d57f9e96ae002618d8` |
| `packages/core/src/plugins/extractors/__tests__/swift-extractor.test.ts` | `206d649e0121184e5825e54829842405bf5a9ac807f02d1ff4b1ea8fe27fe967` |
| `packages/core/src/plugins/extractors/__tests__/typescript-extractor.test.ts` | `cb1971f6b290c14ce8c5592fd43034a0167502a66d59a4b8f89635cec174751a` |
| `packages/core/src/plugins/extractors/base-extractor.ts` | `8eafac3b46058365ef317b7427f09befc570ed420fc3629f0ae6bdba7725d689` |
| `packages/core/src/plugins/extractors/cpp-extractor.ts` | `02d01bf5713a8b6e494346cd220efc0ac80b25550605cc412810bc9e7b0b9e15` |
| `packages/core/src/plugins/extractors/csharp-extractor.ts` | `d87df95af2bb689325ea7903fc015ac766f48a41714f5365fb1a92ddebc3da7d` |
| `packages/core/src/plugins/extractors/dart-extractor.ts` | `661d56f616e45a1fbb2b9c74fffe7233c8f21a7f9190f03ba6eb4d1f2a0295e4` |
| `packages/core/src/plugins/extractors/go-extractor.ts` | `71da081b3c434a7a783c3422205f5eb1146725ec423608f52d51b5a2ee93bc42` |
| `packages/core/src/plugins/extractors/index.ts` | `9c7e751fe589724e6d2ba3d89e753ebd55a90a29803f3b8ddc32b58c1fea506d` |
| `packages/core/src/plugins/extractors/java-extractor.ts` | `0e70be932d01a6ebf6111056ec55fcf57b3050dd82a0837f998255f9582c0c89` |
| `packages/core/src/plugins/extractors/kotlin-extractor.ts` | `719805f7f60afc178580cab3e6e4f549ff4bb74cbd1c71a29789faa80a12ce24` |
| `packages/core/src/plugins/extractors/php-extractor.ts` | `822b4832fbe17216e3792c055cf9b146ab68b1a9f177674805484d685e600057` |
| `packages/core/src/plugins/extractors/python-extractor.ts` | `22509ab258465bc1b2b54a9dec9f6a928586710ad1d285fc86416028215d5a6a` |
| `packages/core/src/plugins/extractors/ruby-extractor.ts` | `9ca10f3dabc58c259f2011337c5404bd83433d500185c91ffda2088aa3457d9d` |
| `packages/core/src/plugins/extractors/rust-extractor.ts` | `0480a8803b5ec396d6f2025fe1869d26145588043064fa45aeb55637675d070a` |
| `packages/core/src/plugins/extractors/scala-extractor.ts` | `edbab1566036ee75a0a766e460002adb2ebffb1a5f3cd7eb71a1bcb74b370af7` |
| `packages/core/src/plugins/extractors/swift-extractor.ts` | `69519c2c3c1ca6e6673d3fb5aaa14848ca58b64f10c8c88e5f0384cf5b0b57d6` |
| `packages/core/src/plugins/extractors/types.ts` | `9af707a4643eaec7f8986184033df852130dbf8cf632cfd415c00d1cce3f29a7` |
| `packages/core/src/plugins/extractors/typescript-extractor.ts` | `88c129d2b6473cf1ec68e1bd9801d087c024f32268fccdd89f732c2fbcb4ca7f` |
| `packages/core/src/plugins/parsers/dockerfile-parser.ts` | `94e7e7f81504eb483e3a3b82bf80e1feff543c00f2cc90331748958c872f9f2b` |
| `packages/core/src/plugins/parsers/env-parser.ts` | `de9167776cc01bfa553564dc23f4f3db778b0316ad08cd8afb3dee4ea0b6b19c` |
| `packages/core/src/plugins/parsers/graphql-parser.ts` | `548542e064326e22d2c15f4267951bc95213c6d38d1a673953301353f29a9855` |
| `packages/core/src/plugins/parsers/index.ts` | `0482fcb938491100e513300040a462cd24fc314a113f2790f0d79fe64759669d` |
| `packages/core/src/plugins/parsers/json-parser.ts` | `7fad80e12b8869bd2eae585f3ceef5686c75fb3e697c35bd045c686c3bebcbc8` |
| `packages/core/src/plugins/parsers/makefile-parser.ts` | `c8343dbfc6f7fa73619195927e531aae35630a95f49f92d64053f59ac0bb0cd2` |
| `packages/core/src/plugins/parsers/markdown-parser.ts` | `7042fb277894f3d02decd25ef7d1dbce02b47318ac935312c9835022ec94d836` |
| `packages/core/src/plugins/parsers/protobuf-parser.ts` | `5c55a55cbf284134c10d016570eed28dcca0929b477f4bae68bfbcae9b859b66` |
| `packages/core/src/plugins/parsers/shell-parser.ts` | `adee0b999e96d8d0f44985ab35b645a9746f5210b3f58037e294edc5b43a6b6a` |
| `packages/core/src/plugins/parsers/sql-parser.ts` | `52b24eb14aa42684cb50f48d8e3172f11a0f298f4a3603c539da33f4bfd95cf0` |
| `packages/core/src/plugins/parsers/terraform-parser.ts` | `d6f2811b50dd49b147e53a173f67d1bb3aebbce0604a243029797afb549a6896` |
| `packages/core/src/plugins/parsers/toml-parser.ts` | `0ac3fc6fdf41dc61a5715118a70dd2bed818721f395c20bb47228682995adce0` |
| `packages/core/src/plugins/parsers/yaml-parser.ts` | `ac4defd986696ca6d1ac0e8e714e815b2edcb37b7a43591a391fd1322eda6b2a` |
| `packages/core/src/plugins/registry.ts` | `5cd5e47924b4c98dc6b878773163b549ebbd4e185f4951f22008e5f7936f4bd1` |
| `packages/core/src/plugins/tree-sitter-plugin.test.ts` | `ba8cf7b2d9c550adc07872c6ce67f3195753ce176381ed720c817516643611d1` |
| `packages/core/src/plugins/tree-sitter-plugin.ts` | `db740e481aee496b558c47e2e54b78ef236619dbfd25d2455b1dfa62c2aef100` |
| `packages/core/src/schema.ts` | `e043d70c2d4485fe717ccee9eb54ad4e36256fdafc0713999e7b9b345bbc7c97` |
| `packages/core/src/search.ts` | `62a9313587879a2ca396eb1c749b8f963cc9dd7bc29663b18b015526fe1774ef` |
| `packages/core/src/staleness.ts` | `5ae93f046a4023fc563f4ac09bb740ecaf9c75eb36ecdfad26525699b4f6cba7` |
| `packages/core/src/types.test.ts` | `115a2c521250c631b3a0277210bbbd03847273800d0e592f94b3da7e69a7d24f` |
| `packages/core/src/types.ts` | `34ed1953e3fb688301457b2f240cddd7572e4e822c67230517e8d6c2b7290733` |
| `packages/core/tsconfig.json` | `e883e3117f39afcf9e2cf7d612094ac51421a3bc0c29bd6a4c1a543147a6144b` |
| `packages/core/vitest.config.ts` | `991fbc1dac3e595024391b3055fd169171cabf59c10c69b55d18ddcf5dc8b093` |
| `packages/tree-sitter-dart-wasm/BUILD.md` | `d124dac9e36dee5a7439aec4045a08114cb195b95d7c062938b435d3129590c0` |
| `packages/tree-sitter-dart-wasm/package.json` | `fae52ec2a947c41e80c554ca4268713961d04ffa744c826c844d7cbbc403c921` |
| `packages/tree-sitter-dart-wasm/tree-sitter-dart.wasm` | `3706261fc734e7eddd1a33cf1b031571eba4b017fe55d3b8910af31a1399f9a4` |
| `packages/tree-sitter-swift-wasm/.swift-grammar-pin` | `14032c01cd40d15966c3f8727ca1b764bab1dce3e51bccd018eb1871ebf3e062` |
| `packages/tree-sitter-swift-wasm/BUILD.md` | `7f3763767db3fd5af0adc4269a29d6adfaeacbc7a2fed27b8694efd626ad938e` |
| `packages/tree-sitter-swift-wasm/LICENSE` | `3533cec129bb4bba015c0d61d86dd7c3b7e82110e4d2ff7837a01eff5bad5ccc` |
| `packages/tree-sitter-swift-wasm/package.json` | `58a0007014dd4e7d422edb543b9e06d0402b30512dae414cb416bb0c09023636` |
| `packages/tree-sitter-swift-wasm/tree-sitter-swift.wasm` | `0bbf7a0668f8f155addbcd8284880447dbe393b67b5eb09c7b042b02080d9498` |
