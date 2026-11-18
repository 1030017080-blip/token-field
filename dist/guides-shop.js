(()=>{
const guides=[
{id:'calendar',category:'入门',title:'领取提醒与日历',lead:'把需要手动领取的活动整理成重复提醒，适合刚开始管理多个平台。',meta:'入门 · 无需编程 · 约 5 分钟',visual:'<div class="mini-calendar"><b>领取日历</b><div>一　二　三　四　五　六　日</div><strong>　01　02　03　04　05　06</strong><p>● 每日检查　　○ 领取后核对</p></div>',body:`<h4>适用场景</h4><p>适合有签到、限时领取或固定刷新时间的平台。提醒只负责通知，是否需要点击领取以官方规则为准。</p><ol><li>在福利库将项目加入「我的清单」，记录平台、领取入口、活动截止日期和重置时区。</li><li>在常用日历中新建事件，例如「检查 Cloudflare Workers AI 额度」，选择每天 08:05（北京时间）并设置重复提醒。</li><li>Cloudflare 官方说明免费额度在 00:00 UTC 自动刷新，即北京时间 08:00；无需点击领取。打开官方控制台查看用量和当前套餐。</li><li>对确实需要手动领取的活动，收到提醒后由本人登录官方页面操作，核对到账数量和有效期。</li></ol><p class="guide-note">免费额度和模型条件可能调整；部分模型需要付费方式。不要将自动刷新误认为可额外领取。</p><a href="https://developers.cloudflare.com/workers-ai/platform/pricing/" target="_blank" rel="noopener noreferrer">Cloudflare 官方定价与刷新规则 ↗</a>`},
{id:'windows',category:'定时提醒',title:'Windows 定时打开官方页面',lead:'使用系统自带的任务计划程序，到时间自动打开页面，由你自行确认。',meta:'入门 · Windows · 约 10 分钟',visual:'<div class="mini-window"><div>◷　任务计划程序</div><b>每日额度检查</b><p>触发器　每天 08:05</p><p>操作　　打开官方页面</p><small>等待用户确认</small></div>',body:`<h4>准备工作</h4><p>一台 Windows 电脑、一个已经核实的官方活动页面。任务触发时电脑需处于可运行状态。</p><ol><li>在开始菜单搜索并打开「任务计划程序」，选择右侧「创建基本任务」。</li><li>输入名称，例如「检查每日 AI 额度」；选择「每天」并设置时间。</li><li>选择「启动程序」。程序填写 <code>explorer.exe</code>，在「添加参数」中填写活动官方网址，例如 <code>https://dash.cloudflare.com/</code>。</li><li>完成后在任务列表中右键选择「运行」，确认打开的是预期的官方页面。回到官方账户检查额度并按需要手动操作。</li><li>不再需要时，在任务计划程序中选中该任务并禁用或删除；电脑休眠或关机时执行情况取决于任务设置。</li></ol><p class="guide-note">这个方法不会登录账户，也不会自动点击领取。</p><a href="https://learn.microsoft.com/en-us/windows/win32/taskschd/about-the-task-scheduler" target="_blank" rel="noopener noreferrer">Microsoft 任务计划程序说明 ↗</a>`},
{id:'api',category:'官方接口',title:'官方 API 与定时任务',lead:'当平台公开允许相应操作时，通过官方接口和定时工具运行；先核实具体接口。',meta:'进阶 · 需要开发基础 · 约 20 分钟',visual:'<div class="mini-terminal"><div>● ● ●　任务配置</div><p>$ 检查官方接口文档</p><p>$ 配置环境变量与定时任务</p><p class="term-ok">✓ 查看执行结果</p></div>',body:`<h4>先确认是否存在接口</h4><p>本站尚未核实到可直接用于本目录福利的通用「自动领取 API」。仅在目标平台明确提供并允许调用相应接口时，才继续配置；不要把下述调度方法当作领取接口。</p><ol><li>阅读目标平台官方接口文档，确认操作、权限、频率限制、费用与是否允许定时执行。</li><li>在个人环境准备一个经过审阅的脚本，把密钥保存在环境变量或工具提供的密钥管理中，避免写入代码或公开仓库。</li><li>先手动运行一次，检查返回状态与官方账户余额；如返回未授权、限流或异常，停止并检查文档。</li><li>确认允许后，可用 Windows 任务计划程序或 GitHub Actions 调度已有脚本。GitHub Actions 的 schedule 默认使用 UTC，最短间隔为 5 分钟，可能延迟；按北京时间计算时注意时差。</li><li>在官方账户核对实际结果和有效期；查看执行日志时不要输出密钥。暂停时禁用定时任务并按需撤销令牌。</li></ol><a href="https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#onschedule" target="_blank" rel="noopener noreferrer">GitHub Actions 定时规则 ↗</a>`},
{id:'browser',category:'浏览器辅助',title:'浏览器辅助操作与人工确认',lead:'仅在平台规则允许时，录制或整理重复操作；登录与最终确认由本人完成。',meta:'进阶 · 浏览器与 Node.js · 约 20 分钟',visual:'<div class="mini-window"><div>● ● ●　官方活动页面</div><b>领取任务</b><p>✓　打开活动页面</p><p>○　本人登录并确认</p><small>查看账户记录</small></div>',body:`<h4>什么时候适用</h4><p>仅适用于官方规则允许辅助操作的页面。平台未明确允许时，优先使用提醒和手动操作。不要绕过验证码或风控。</p><ol><li>先查看平台使用条款，确认是否允许浏览器自动化；检查辅助工具的来源和脚本内容。</li><li>Playwright 官方提供 codegen 录制工具。安装及运行方式以官方文档为准，建议先在自己的测试页面熟悉操作。</li><li>在目标站点由本人登录，并手动处理验证码和任何确认步骤；不要把登录态文件、Cookie 或密码发送给他人。</li><li>录制或编写仅执行获准步骤的操作，先在可见浏览器中单次运行，检查页面变化和结果。</li><li>到官方账户独立核对余额及有效期；页面改版或登录失效时停止，重新核实后再调整。</li></ol><p class="guide-note">Playwright 的登录态可能包含敏感凭证；请限制文件访问并避免提交至仓库。</p><a href="https://playwright.dev/docs/codegen" target="_blank" rel="noopener noreferrer">Playwright 录制与登录态文档 ↗</a>`}
];
const automation=document.querySelector('#automation');
automation.innerHTML=`<div class="guide-heading"><h2>把重复领取，变成有序的日常</h2><p>从基础提醒到官方接口，按平台规则选择适合自己的方法。</p></div><div class="guide-layout"><div><label class="guide-search"><span>⌕</span><input id="guide-query" type="search" placeholder="搜索教程、平台或关键词…" aria-label="搜索教程"></label><div class="guide-filters" role="group" aria-label="教程分类">${['全部','入门','定时提醒','官方接口','浏览器辅助'].map((x,i)=>`<button type="button" data-guide-filter="${x}" class="${i?'':'active'}">${x}</button>`).join('')}</div><div id="guide-list"></div></div><aside class="guide-aside"><h3>✓　开始前检查</h3><p>在设置自动化之前，先确认以下事项。</p><div><b>了解官方规则</b><p>核实活动是否仍有效、是否允许自动操作，以及额度是否自动刷新。</p></div><div><b>保护本地凭证</b><p>密码、API Key 和浏览器登录态由自己保管，不要提交到公开仓库。</p></div><div><b>预留人工确认</b><p>登录、验证码和最终到账检查由本人完成。</p></div><a href="#plan">打开我的清单 →</a></aside></div>`;
let filter='全部';const list=automation.querySelector('#guide-list'),query=automation.querySelector('#guide-query');function renderGuides(){const q=query.value.trim().toLowerCase();let matches=guides.filter(g=>(filter==='全部'||g.category===filter)&&(`${g.title} ${g.lead} ${g.category} ${g.body}`.toLowerCase().includes(q)));list.innerHTML=matches.length?matches.map((g,i)=>`<article class="guide-row">${g.visual}<div class="guide-summary"><h3>${String(guides.indexOf(g)+1).padStart(2,'0')} ${g.title}</h3><p>${g.lead}</p><span>${g.meta}</span><details><summary>查看教程 <span>↓</span></summary><div class="guide-detail">${g.body}</div></details></div></article>`).join(''):'<p class="guide-empty">没有找到相关教程，请尝试其他关键词。</p>'}query.addEventListener('input',renderGuides);automation.querySelectorAll('[data-guide-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.guideFilter;automation.querySelectorAll('[data-guide-filter]').forEach(x=>x.classList.toggle('active',x===b));renderGuides()}));renderGuides();
  const products = document.querySelector('#products');
  const support = products.querySelector('#support');
  const supportHeading = support.querySelector('h2');
  const defaultHeading = supportHeading.textContent;
  const offers = [
    { name: 'Codex Team 直充', price: 109, poster: "product-team-standard.png", width: 1289, height: 1221, delivery: '充值到现有账号' },
    { name: 'PLUS 直充', price: 129, poster: "product-plus.png", width: 1289, height: 1221, delivery: '充值到现有账号' },
    { name: '成品号', price: 159, poster: "product-plus.png", width: 1289, height: 1221, delivery: '交付成品账号' },
  ];

  products.innerHTML = `
    <div class="guide-heading shop-heading">
      <h2>AI 商品展示</h2>
      <p>比较价格与交付方式，选好后可通过 QQ 咨询。</p>
    </div>
    <div class="shop-grid">
      ${offers.map((offer, index) => `
        <article aria-labelledby="offer-title-${index}">
          <a class="offer-poster" href="${offer.poster}" target="_blank" rel="noopener" aria-label="放大查看${offer.name}商品图">
            <img src="${offer.poster}" alt="" width="${offer.width}" height="${offer.height}" decoding="async">
          </a>
          <h3 id="offer-title-${index}">${offer.name}</h3>
          <p class="offer-price"><span>¥</span>${offer.price}</p>
          <p class="offer-delivery">${offer.delivery}</p>
          <a class="offer-contact" data-offer="${index}" href="#support">
            咨询此商品 <span aria-hidden="true">↗</span>
          </a>
        </article>
      `).join('')}
    </div>
    <p class="shop-terms">服务期限、适用条件、交付细节与售后请向客服确认。本站仅提供商品展示与咨询。</p>`;

  support.tabIndex = -1;
  support.setAttribute('aria-labelledby', 'shop-support-title');
  supportHeading.id = 'shop-support-title';
  products.append(support);

  let selectedOffer;
  products.querySelectorAll('.offer-contact').forEach(link => {
    const offer = offers[Number(link.dataset.offer)];
    link.setAttribute('aria-label', '咨询' + offer.name);
    link.addEventListener('click', () => {
      selectedOffer = offer;
      supportHeading.textContent = '咨询' + offer.name;
      support.focus({ preventScroll: true });
      if (location.hash === '#support') support.scrollIntoView();
    });
  });

  window.addEventListener('hashchange', () => {
    const showOffer = location.hash === '#support' && selectedOffer;
    supportHeading.textContent = showOffer ? '咨询' + selectedOffer.name : defaultHeading;
    selectedOffer = undefined;
  });
})();
