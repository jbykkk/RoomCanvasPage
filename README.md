# RoomCanvas Project Website

RoomCanvas 的独立静态展示站，准备部署至 Cloudflare Pages。主项目与模型、重建服务均保留在原仓库；此仓库只包含展示页面和经过筛选的办公室截图。

## 本地预览

需要 Node.js 22+（构建）和 Python 3（本地预览）。没有第三方 npm 依赖，不需要 `npm install`。

```bash
npm run dev
```

打开 http://127.0.0.1:4173 。

```bash
npm run build
npm run preview
```

构建脚本检查首页引用的本地文件，再将 `public/` 复制到 `dist/`。站点本身只需静态文件服务，不需要 Python、Node 服务端或 GPU。

## Cloudflare Pages 设置

在 Cloudflare 的 **Workers & Pages → Create application → Pages → Import an existing Git repository** 中，选择 `jbykkk/RoomCanvasPage`。

| 设置 | 值 |
| --- | --- |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | 仓库根目录，保持默认 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 22+，仓库 `.nvmrc` 已设为 22 |

使用 **Cloudflare Pages** 的 Git 集成；本项目不需要 Workers 部署命令、API Token、数据库或环境密钥。连接后，每次推送 `main` 会触发构建与部署。

官方说明：[Static HTML on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)。

## 修改内容

- `public/index.html`：首屏、项目介绍、工作流程、功能展示、致谢。中文直接编写在 HTML 中，英文译文放在对应的 `data-en` 属性。
- `public/app.js`：四组功能截图的中英文标题、说明，语言切换、键盘标签切换和大图查看。没有 JavaScript 时，中文正文及全部截图仍可查看。
- `public/styles.css`：颜色、排版与响应式布局。沿用主项目的浅色背景与绿色视觉方向。
- `public/assets/`：五张真实办公室截图。
- `public/_headers`：Cloudflare Pages 响应头。
- `public/404.html`：独立 404 页面，避免不存在的路径回退为首页。
- `docs/CONTENT.md`：内容来源、已确认范围及后续补充事项。

本站是项目展示页，功能区切换的是实际项目截图。模型交互与重建需要运行主项目；本版不提供在线编辑器。作者、机构、论文、视频、实验指标和主项目源码公开链接尚未确认，因此未展示。

## 许可与素材

网站代码使用 Apache License 2.0，见 `LICENSE` 和 `NOTICE`。引用的项目与素材各自保留原有权利和署名。截图取自主项目 README 已采用的 LiteReality 官方办公室样例；未包含私人卧室、扫描原始资料、模型或服务端配置。
