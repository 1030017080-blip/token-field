# Token 田野

AI 福利与 Agent Skill 目录，包含资源搜索、技能效果示意、我的清单、教程、官方公告线索与社区入口。

[在线预览](https://1030017080-blip.github.io/token-field/)

## 本地运行

需要 Python 3.10+，无需 npm 依赖。

```sh
python -m http.server 4188 --bind 127.0.0.1 --directory dist
```

打开 http://127.0.0.1:4188/ 。若需定时采集官方状态公告，运行 `python scripts/preview-local.py`（每 15 分钟尝试刷新）。

## 改成你的站点

- `dist/community.js`：反馈表单、GitHub 与社区入口。公开模板的反馈地址为空，请填写自己的飞书表单分享链接。
- `dist/guides.js`：教程内容和分类。
- `dist/skills-market.js`：技能目录；Star 与热度是历史快照。
- `dist/app.js`：福利目录及领取说明。

纯静态内容可托管至静态服务器。没有支付或自动领取后台。我的清单保存在浏览器本地。

## GitHub Pages 发布

仓库的 Pages 发布源设为 GitHub Actions。修改 `dist/` 并推送至 `main` 后，工作流先校验首页引用的本地资源，再发布 `dist/`。也可以在 Actions 中手动运行 **Deploy GitHub Pages**。

Fork 后，在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，然后手动运行一次工作流。项目站点通常部署在仓库名子路径下，请保留资源的相对路径。提交前可运行 `python scripts/check-static.py`。

官方公告采集脚本用于本地或自管服务器，Pages 会展示随静态文件发布的公告快照。

## 数据与示意

2026-11-18 的福利更新参考了 [FreeEgg 鸡蛋榜](https://freeegg.top/#ranking) 和微信小程序「赛博鸡蛋篮」。福利卡片链接到厂商页面，额度、限制和活动时间按厂商公开说明整理。

Skill 预览为 HTML 效果示意，非实际执行产物。公告采集读取官方公开状态源，关键词匹配仅为线索，不代表额度已重置或到账。活动规则以官方页面为准。

## 开源

原创代码使用 MIT 许可。第三方商标、图标、链接内容和技能本体仍受原权利人许可约束，不因本仓库 MIT 许可而改变。参考 AIHOT 的开源文档组织方式，本项目不是 AIHOT 官方项目，也不提供其运营数据。

参见 [贡献指南](CONTRIBUTING.md)、[安全说明](SECURITY.md) 与 [第三方说明](NOTICE)。
