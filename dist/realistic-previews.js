/* Editable HTML mockups; illustrated examples only, not generated results. */
genericVisual=function(item){
 const tag=(item.tags||[])[0]||item.category;const name=demoEscape(item.name);let body='';
 if(/视频|动画|动图|素材生成|字幕|音频|React 视频/.test(tag)||item.category==='媒体'){
 body=`<div class="work-video"><div class="work-video-screen"><small>PREVIEW / 示例画面</small><strong>${/音频/.test(tag)?'♫':'▶'}</strong><b>${/字幕/.test(tag)?'让每一句话，都被看见。':'让想法，动起来。'}</b></div><div class="work-timeline"><span>00:00</span><i></i><i></i><i></i><span>00:15</span></div><div class="work-tracks"><i>画面</i><i>字幕</i><i>声音</i></div></div>`;
 }else if(/海报|生成艺术|主题|品牌|视觉|界面|原型|交互/.test(tag)||item.category==='设计'){
 body=`<div class="work-design"><div class="work-design-side">◒ STUDIO<br><br>首页<br><br>作品<br><br>关于</div><div class="work-design-main"><small>DESIGN COLLECTION / 01</small><h4>${/海报|艺术/.test(tag)?'创造，\n从一张白纸开始。':'把复杂的事，\n做得简单。'}</h4><p>一个清晰、有温度的数字体验。</p><div class="work-design-button">查看作品 ↗</div><div class="work-design-cards"><i></i><i></i><i></i></div></div></div>`;
 }else if(/表格|配额|费用|PostgreSQL|数据库|数据管理/.test(tag)||item.category==='数据库'){
 body=`<div class="work-data"><div class="work-minihead">▦　数据概览 <span>本月报告</span></div><div class="work-metrics"><div><small>总计</small><b>¥ 4,820</b><em>示例数据</em></div><div><small>完成项目</small><b>24</b><em>本月</em></div></div><div class="work-bars"><i style="height:40%"></i><i style="height:65%"></i><i style="height:48%"></i><i style="height:85%"></i><i style="height:70%"></i><i style="height:95%"></i></div><div class="work-axis">一月　　　 二月　　　三月　　　四月</div></div>`;
 }else if(/日程|会议|目标|审批/.test(tag)){
 body=`<div class="work-office"><div class="work-minihead">▦　工作日程 <span>本周</span></div><div class="work-calendar"><div><small>周一</small><b>09:30</b><p>项目同步</p></div><div><small>周二</small><b>14:00</b><p>方案讨论</p></div><div><small>周三</small><b>16:00</b><p>工作复盘</p></div></div><div class="work-task">✓　整理会议纪要　<span>已完成</span></div><div class="work-task">○　确认下一步安排　<span>待处理</span></div></div>`;
 }else if(/文档|笔记|论文|学习|Markdown|内部沟通|会话交接|解释重述/.test(tag)||item.category==='文档'||item.category==='办公'){
 body=`<div class="work-document"><div class="work-docbar">▤　项目报告.docx <span>编辑预览</span></div><div class="work-page"><small>PROJECT BRIEF　 /　 01</small><h4>${/论文/.test(tag)?'研究方法与复现记录':/学习/.test(tag)?'知识要点与练习':'项目进展与下一步'}</h4><p>目标：清晰整理当前任务与关键信息。</p><b>01　主要内容</b><p>梳理已有资料，提炼结论并列出待办。</p><b>02　下一步行动</b><p>核对来源，确认负责人和完成时间。</p></div></div>`;
 }else if(/技能搜索|技能目录|技能选择/.test(tag)||item.category==='资源'){
 body=`<div class="work-directory"><div class="work-minihead">✦　Skill 发现 <span>探索目录</span></div><div class="work-search">⌕　搜索：网页设计</div><div class="work-result"><b>Frontend Design</b><small>界面设计 · 网页实现</small></div><div class="work-result"><b>Web Design Guidelines</b><small>设计审查 · 无障碍</small></div><div class="work-result"><b>UI Design</b><small>组件 · 排版 · 交互</small></div></div>`;
 }else if(/需求|计划|任务拆解|工作流|开发流程|问卷|方案/.test(tag)){
 body=`<div class="work-plan"><div class="work-minihead">▤　项目执行计划 <span>示例项目</span></div><div class="work-board"><div><b>待处理</b><p>明确目标与范围</p><p>整理需求清单</p></div><div><b>进行中</b><p>设计核心页面</p><p>确认交互流程</p></div><div><b>已完成</b><p>收集用户反馈</p></div></div></div>`;
 }else if(/云|Kubernetes|虚拟机|身份|OAuth|Agent 开发/.test(tag)||item.category==='云服务'){
 body=`<div class="work-cloud"><div class="work-minihead">☁　资源概览 <span>示例环境</span></div><div class="work-metrics"><div><small>运行实例</small><b>03</b><em>健康</em></div><div><small>资源状态</small><b>正常</b><em>已检查</em></div></div><div class="work-cloud-list"><p>●　应用服务 <span>运行中</span></p><p>●　数据服务 <span>运行中</span></p><p>●　权限配置 <span>待核验</span></p></div></div>`;
 }else{
 body=`<div class="work-code"><div class="work-codebar"><span>● ● ●</span>　project / review.ts</div><div class="work-codebody"><div class="work-code-num">1<br>2<br>3<br>4<br>5<br>6</div><pre><span>// ${demoEscape(tag)} · 示例</span>\nconst result = await runTask({\n  input: request,\n  validate: true,\n});\n<span>// 检查结果与错误处理</span></pre></div><div class="work-code-foot">✓ 变更说明　　✓ 验证记录</div></div>`;
 }
 return `<div class="work-preview" aria-label="${name} 的效果示意">${body}</div>`;
};
renderSkills();
