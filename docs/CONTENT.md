# 网站内容依据

## 当前基线

- 主项目：`innovationasuna/RoomCanvas`。
- 2026-11-02 已运行 `git fetch origin`，远程默认分支 `origin/main` 为 `0b00dc67942775bb11f13fac19eb81fb552dbb92`，提交时间 2026-10-29。
- 初版素材取自 `ce39cd4cac58e7c454b44953b0d4ec487e850537`；已确认远程最新 `main` 的 `README.md`、`web/README.md`、`docs/ROOM_RECONSTRUCTION.md`、`NOTICE`、`docs/images/` 与 `web/icon.svg` 均与此基线相同，因此页面内容与素材无需调整。
- 保留主项目现有分支与未提交改动，没有切分支、清理或覆盖文件。
- 已读取用户指定的 `https://wangzhen-w.github.io/PanoVLN/` 主页 HTML，参考其居中项目标题、主展示图、简介、方法与展示章节的研究项目页结构。本版未复制其代码或素材；尚未确认的作者、论文、视频与实验指标不展示。

## 首版展示

1. LiDAR / RoomPlan 扫描到真实尺寸三维房间的项目目标。
2. 房间重建、物体级编辑、可动部件与漫游的工作流程。
3. 办公室编辑器总览，以及摆放、交互、夜间光照、照片添加物体四组截图。
4. 浏览器本地手势识别与网页 / Android 漫游的文字介绍。
5. 已使用的技术与上游项目致谢。

原 README 把照片物体重建的默认后端列为 BiRefNet / DA3 / MV-SAM3D；TRELLIS 是房间小物件重建路线之一。本页不宣称未合并分支中的重建后端已上线，也不固定新物体所需照片数量。时段光照是展示预设，不写成物理准确的日照模拟。

## 素材清单

| 本地文件 | 来源（主项目） | 展示位置 |
| --- | --- | --- |
| `public/favicon.svg` | `web/icon.svg` | 品牌、favicon |
| `public/assets/editor-office.jpg` | `docs/images/editor-office.jpg` | 主展示图 |
| `public/assets/office-placement.jpg` | `docs/images/office-placement.jpg` | 家具布置 |
| `public/assets/office-preview.jpg` | `docs/images/office-preview.jpg` | 可动部件 |
| `public/assets/office-night.jpg` | `docs/images/office-night.jpg` | 夜间光照 |
| `public/assets/add-object.jpg` | `docs/images/add-object.jpg` | 照片添加物体 |

全部图片均为既有真实截图，没有用生成图替代项目效果。没有提取私人 `room3` 的模型、缩略图或截图，也没有复制主项目运行配置、服务地址、密钥、原始照片和扫描。

## 确认后再补

- 正式英文项目副标题，作者、机构及排序。
- 主项目的公开源码地址；当前私有仓库不作为公开下载入口。
- 演示视频或录屏、更多可公开场景，以及照片重建完成结果。
- 论文、BibTeX、定量实验与已核验的对比结果。
- 可用的在线交互编辑器、模型下载、数据集或 App 下载。
- Cloudflare Pages 最终域名；确定后将 `og:image` 改为绝对 URL，并补充 canonical、`og:url`、sitemap。

当前只链接网站本身的源码仓库，不将其标注为 RoomCanvas 主项目源码。

## 本次验证与交付状态（2026-11-02）

- `npm run build`：通过，输出到 `dist/`。
- `node --check public/app.js`、`node --check scripts/build.mjs`：通过。
- HTML 静态检查：24 个 ID 唯一，7 个内部锚点有效，图片均有替代文字与尺寸，48 处双语文本，四个功能的图片文件均存在。
- 五张照片共约 1.03 MB；没有第三方脚本、字体 CDN 或运行依赖。
- 真实浏览器中的交互、移动端与视觉验收由用户完成；本地预览命令为 `npm run dev`。
- 用户已创建并授权推送到 `https://github.com/jbykkk/RoomCanvasPage`。已检查远程为空，在本地初始化 `main` 并添加该仓库为 `origin`。实际提交与推送结果以 Git 记录为准。
- Cloudflare Pages 由用户连接该仓库并部署；设置见根目录 README。
