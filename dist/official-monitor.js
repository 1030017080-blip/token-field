/* No AIHOT data. Source snapshots come from our local official-feed collector. */
document.querySelector('.monitor-warning strong').textContent='官方公告采集 · 本地快照';
document.querySelector('.monitor-warning p').textContent='独立读取官方状态页的公开订阅源；不读取个人账户，不使用付费 X API。状态页不覆盖所有重置公告，候选内容需要人工核验。页面每 5 分钟重新读取本地快照。';
document.querySelector('.auto-feed > p').textContent='以下是官方状态公告中的额度关键词线索，不等于已确认的重置或重置卡发放。';
const officialSummary=document.createElement('div');officialSummary.id='official-summary';document.querySelector('.radar-summary').after(officialSummary);
const priorRenderFeed=renderFeed;
renderFeed=function(){
 const d=feedSnapshot.products?.[radarProduct],posts=d?.posts||[],valid=posts.filter(p=>p.url&&Number.isFinite(Date.parse(p.createdAt))),latest=valid[0];
 const healthy=d?.state==='ok',age=Date.now()-Date.parse(d?.lastSuccessAt||'');
 document.querySelector('#feed-state').textContent=!d?'尚未采集':`${healthy?'采集成功':'采集失败，保留历史'} · ${d.lastSuccessAt?new Date(d.lastSuccessAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'}):'从未成功'}${age>3600000?' · 快照已过期':''}（北京时间）`;
 officialSummary.innerHTML=`<div class="official-latest"><small>官方公告 / ${healthy&&age<3600000?'本次读取成功':'覆盖状态不完整'}</small><h3>${latest?escDash(latest.text):'暂无可核验的重置线索'}</h3><p>尚无人工确认的额外重置记录。不预测下一次重置；常规周期刷新、故障与奖励发放分别处理。</p>${d?.sourceUrl?`<a href="${escDash(d.sourceUrl)}" target="_blank" rel="noopener noreferrer">官方订阅源 ↗</a>`:''}${d?.error?`<p>采集提示：${escDash(d.error)}</p>`:''}</div><div class="official-stats"><div><strong>${valid.length}</strong><span>已收录候选公告</span></div><div><strong>0</strong><span>已确认额外重置</span></div><div><strong>—</strong><span>下次重置 · 未确认</span></div></div>`;
 document.querySelector('#feed-list').innerHTML=valid.slice(0,12).map(p=>`<article class="feed-entry"><span>官方线索 · 待核验 · ${escDash(new Date(p.createdAt).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'}))}</span><p>${escDash(p.text)}</p><a href="${escDash(p.url)}" target="_blank" rel="noopener noreferrer">查看官方公告 ↗</a></article>`).join('')||'<p>此数据源暂未收录相关线索，不代表官方没有发布公告。</p>';
};
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>renderFeed()));
document.querySelector('.calendar-head p').textContent='本机手动记录 · 不计入官方确认统计';
document.querySelector('#add-event').textContent='＋ 添加个人记录';
loadResetFeed();setInterval(loadResetFeed,300000);
