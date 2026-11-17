/* Editorial examples, deliberately not claims of executed Skill results. */
const skillDemos = [
 ['Frontend Design','设计','把读书笔记工具的需求做成清晰的工作台。','需求 → 信息层级 → 页面实现',['最近阅读','即兴演讲 · 第 3 章','整理笔记 → 生成提纲 → 导出'],'布局、字号层级、主要操作','页面示意，不代表自动生成质量'],
 ['Agent Browser','自动化','检查一个演示商店的搜索和购物车流程。','打开页面 → 搜索 → 检查结果',['01 打开演示商店','02 搜索「笔记本」','03 核对标题与购物车按钮'],'可复现的操作步骤与检查记录','需另装浏览器运行环境'],
 ['React Best Practices','开发','审查一个列表页中不必要的串行请求。','识别瀑布请求 → 并行加载 → 验证',['Before  await user(); await posts();','After   await Promise.all([user(), posts()]);','验证：错误处理、请求依赖、页面状态'],'代码改动的结构与验证点','未运行性能基准，不展示虚构加速比例'],
 ['PDF','文档','把三页演示账单整理成结构化明细。','提取文本 → 校验表格 → 导出',['日期            项目       金额','11-01          云服务     ¥80','11-02          存储       ¥20'],'表格字段、来源页码与异常项','样例数据；扫描件可能需要 OCR'],
 ['Excel 表格处理','表格','汇总三个月的演示订阅支出并检查合计。','清理字段 → 设置公式 → 汇总',['九月  ███████       140','十月  █████████     180','十一月 ██████       120'],'公式、分类统计和异常检查','样例数据，不是财务分析结论'],
 ['PPT 演示文稿','演示','把产品介绍整理成三页演示结构。','整理观点 → 分页 → 排版',['01 问题：信息分散','02 方案：统一目录与清单','03 下一步：试用与反馈'],'每页一个观点、可编辑的内容结构','未生成真实 PPTX；依赖见来源'],
 ['SEO Audit','营销','检查一个演示网站的标题与抓取入口。','读取页面 → 归类问题 → 排优先级',['高优先级：主页面缺少唯一 title','中优先级：图片缺少用途说明','人工确认：是否允许索引与收录'],'问题位置、影响和建议动作','示意诊断，不承诺搜索排名'],
 ['Copywriting','写作','把笼统的产品介绍改成具体的首页文案。','理解用户 → 明确利益 → 改写',['原文：释放 AI 的无限潜能','改写：把常用 Skill，整理成一份清单。','行动：挑选技能 → 复制给 Agent'],'具体用户、具体收益与清晰行动','编辑示例，不是转化率实测'],
 ['Systematic Debugging','开发','定位搜索条件改变后列表未更新的问题。','复现 → 收集证据 → 验证根因',['现象：筛选后仍显示旧结果','假设：结果缓存未包含筛选条件','验证：补充缓存键并重跑回归'],'可证伪的假设与复现步骤','演示故障，不宣称修复真实项目'],
 ['MCP Builder','工具','设计一个只读的文档检索 MCP 工具。','定义接口 → 处理异常 → 验证协议',['工具：search_docs(query, limit)','返回：title · excerpt · source_url','边界：只读 · 超时 · 空结果 · 输入校验'],'接口契约、权限边界与错误处理','未启动 MCP 服务，安装依赖见上游']
];
const demoEscape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const showcase = document.createElement('section');
showcase.className='skill-showcase';
showcase.innerHTML=`<div class="demo-heading"><div><span>SKILL IN PRACTICE / 效果样板</span><h3>先看它能帮你做什么。</h3><p>10 个常用 Skill 的输入与输出示意；不是安装后实测，也不承诺相同结果。</p></div><span class="demo-count">10 个示例</span></div><div class="demo-layout"><div class="demo-menu" role="group" aria-label="选择效果样板">${skillDemos.map((d,i)=>`<button data-demo="${i}" aria-pressed="${i===0}"><span>${String(i+1).padStart(2,'0')}</span>${demoEscape(d[0])}</button>`).join('')}</div><div id="demo-detail" aria-live="polite"></div></div>`;
document.querySelector('#skills .skill-toolbar').before(showcase);
function showSkillDemo(index){
 const d=skillDemos[index],item=skillItems.find(x=>x.name===d[0]);
 document.querySelectorAll('[data-demo]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.demo)===index)));
 document.querySelector('#demo-detail').innerHTML=`<div class="demo-detail-head"><span>${demoEscape(d[1])} / ${String(index+1).padStart(2,'0')}</span><span>示意</span></div><h3>${demoEscape(d[0])}</h3><div class="demo-input"><small>给 Agent 的任务</small><p>${demoEscape(d[2])}</p></div><p class="demo-flow">${demoEscape(d[3])}</p><figure class="demo-output"><figcaption>输出效果示意</figcaption>${d[4].map((line,i)=>`<div class="demo-output-line"><span>${String(i+1).padStart(2,'0')}</span><p>${demoEscape(line)}</p></div>`).join('')}</figure><p class="demo-caption">重点看：${demoEscape(d[5])}</p><p class="demo-limit">${demoEscape(d[6])}。</p><div class="demo-actions"><button id="demo-save">${item&&getSavedSkills().includes(item.url)?'已加入我的清单':'加入我的清单'}</button><button id="demo-prompt">复制示例任务</button><button id="demo-image">下载效果示意图</button>${item?`<a href="${demoEscape(item.url)}" target="_blank" rel="noopener noreferrer">来源与安装 ↗</a>`:''}</div><p id="demo-feedback" role="status"></p>`;
 document.querySelector('#demo-save').onclick=()=>{if(item){if(!getSavedSkills().includes(item.url))toggleSkill(item.url);showSkillDemo(index)}};
 document.querySelector('#demo-prompt').onclick=async()=>{try{await navigator.clipboard.writeText(`请先确认 ${d[0]} 已安装并可识别，再执行以下示例任务：${d[2]}\n使用演示数据，输出可验证的结果并说明限制。`);document.querySelector('#demo-feedback').textContent='示例任务已复制'}catch{document.querySelector('#demo-feedback').textContent='请手动复制上方任务：'+d[2]}};
 document.querySelector('#demo-image').onclick=()=>{const lines=[d[0],'效果示意',d[2],...d[4],d[6]];const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="540" viewBox="0 0 1100 540"><rect width="1100" height="540" fill="#fff"/><path d="M40 105H1060" stroke="#ddd"/>${lines.map((v,i)=>`<text x="40" y="${60+i*65}" font-family="Arial,Microsoft YaHei,sans-serif" font-size="${i===0?28:19}" fill="#222">${demoEscape(v)}</text>`).join('')}</svg>`;const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));link.download=d[0].replaceAll(' ','-')+'-example.svg';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);document.querySelector('#demo-feedback').textContent='已下载 SVG 示意图，可在浏览器中打开。'};
}
showcase.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>showSkillDemo(Number(b.dataset.demo)));showSkillDemo(0);
