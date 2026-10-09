(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.getElementById('main');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const e = escape;
  const link = p => `#case-${p.id}`;
  const externalLinks = p => `<div class="actions" style="margin-top:18px">${p.demo ? `<a class="button primary" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">直接演示</a>` : ''}${p.video ? `<a class="button" href="${link(p)}/video">观看方案视频</a>` : ''}${p.github ? `<a class="button" href="${e(p.github)}" target="_blank" rel="noopener noreferrer">查看 GitHub 源码</a>` : ''}</div>`;
  const imgSize = path => { const s=data.imageSizes[path];return s ? `width="${s[0]}" height="${s[1]}"` : ""; };
  const image = p => p.image ? `<button class="image-button" type="button" data-image="${e(p.image)}" data-caption="${e(p.imageNote)}" aria-label="放大查看${e(p.name)}界面"><img ${imgSize(p.image)} src="${e(p.image)}" alt="${e(p.name)}已有界面" loading="lazy"></button><p class="caption">${e(p.imageNote)}</p>` : `<div class="empty-figure">项目界面位置已预留</div>`;
  const demoGuide = p => `<div class="demo-guide"><div class="eyebrow">CORE TASK / 核心任务</div><h3>体验核心任务流程</h3><p>${e(p.demoScenario)}</p><ol>${p.demoSteps.map(s => `<li>${e(s)}</li>`).join('')}</ol><p class="demo-scope">${e(p.demoScope)}</p></div>`;
  const video = p => p.video ? `<figure class="video-showcase" id="video"><div class="eyebrow">PRODUCT WALKTHROUGH / 01:16</div><h2>内容生产、人工审核与策略迭代</h2><p>通过一条完整任务，展示 AI 与人工的职责分工和关键确认节点。</p><video controls playsinline preload="metadata" poster="${e(p.videoPoster)}" aria-label="EvoContent 内容平台方案演示视频"><source src="${e(p.video)}" type="video/mp4">浏览器暂不支持视频，可<a href="${e(p.video)}">打开演示视频</a>。</video><figcaption>${e(p.videoCaption)}</figcaption><div class="video-chapters"><span>00:00 · 模拟采集与资料</span><span>00:25 · 草稿编辑与审核</span><span>00:52 · SOP 分析与确认</span></div></figure>` : '';
  function card(p) {
    return `<article class="project-card"><div class="project-text"><div class="project-top"><span>${e(p.number)} / ${e(p.category)}</span><span class="project-stage">${e(p.stage)}</span></div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="statement">${e(p.statement)}</p><p class="role">我的角色 · ${e(p.role)}</p><p class="project-evidence">${e(p.evidence)}</p><a class="text-link" href="${link(p)}">阅读项目案例</a>${externalLinks(p)}</div><a href="${link(p)}" class="project-visual" aria-label="查看${e(p.name)}案例"><img ${imgSize(p.image)} src="${e(p.image)}" alt="${e(p.name)}界面预览" loading="lazy"><span class="visual-label">方案与示例界面 · 展示范围见案例说明</span></a></article>`;
  }
  function aigcGallery() {
    return data.aigc.filter(a => a.image).map(a => `<article class="aigc-card library-card" data-library-kind="aigc"><button class="aigc-image" type="button" data-image="${e(a.image)}" data-caption="${e(a.name)} · 我的职责：${e(a.contribution)} 画面来自所提供的视频。" aria-label="放大查看${e(a.name)}作品画面"><img src="${e(a.image)}" width="${a.imageWidth}" height="${a.imageHeight}" alt="${e(a.name)}真实作品画面" loading="lazy"><span>放大画面 ↗</span></button><div class="aigc-body"><div class="eyebrow">${e(a.kind)}</div><h3>${e(a.name)}</h3><p class="aigc-contribution"><strong>我的职责</strong>${e(a.contribution)}</p><a class="text-link" href="${e(a.source)}" target="_blank" rel="noopener noreferrer" aria-label="在飞书打开${e(a.name)}原视频">原视频 ↗</a></div></article>`).join('');
  }
  function detailedFlowDiagram(p, f) {
    const d = f.diagram;
    const kinds = {rule:'规则', ai:'AI', human:'人工', method:'方法'};
    const connector = shape => `<div class="logic-connection" aria-hidden="true"><svg class="logic-connector" viewBox="0 0 100 14" preserveAspectRatio="none"><path d="${shape}"/></svg></div>`;
    const rowMarkup = (r, i) => `<div class="logic-row ${r.join==='parallel'?'logic-parallel':''}"><div class="logic-pair">${r.nodes.map(n=>`<div class="logic-node kind-${e(n.kind)} ${n.pending?'logic-pending':''}"><div class="logic-node-meta"><span>${e(n.number)}</span><small>${e(kinds[n.kind])}</small></div><strong>${e(n.title)}</strong><p>${e(n.detail)}</p><div class="logic-artifact">${e(n.output)}</div></div>`).join('')}${r.join==='parallel'?'':`<div class="logic-edge" aria-hidden="true"><span>→</span><small>${e(r.edge)}</small></div>`}</div>${connector(r.join==='parallel'?'M25 0 V5 H75 V0 M50 5 V14':'M75 0 V5 H50 V14')}<div class="logic-checkpoint ${r.checkpoint.pending?'logic-pending':''}"><div class="logic-check"><span class="logic-diamond" aria-hidden="true">?</span><div><strong>${e(r.checkpoint.question)}</strong><span>${e(r.checkpoint.forward)}</span></div></div><div class="logic-return"><small>不满足 →</small><strong>${e(r.checkpoint.branch)}</strong><span>${e(r.checkpoint.target)}</span></div></div>${i<d.rows.length-1?'<div class="logic-continue" aria-hidden="true">↓</div>':''}</div>`;
    return `<figure class="feature-diagram logic-diagram detailed-diagram" id="full-flow-${e(p.id)}" aria-label="${e(p.name)}产品流程"><div class="diagram-title"><span>${e(f.label)}</span><a href="${link(p)}/technical" aria-label="查看${e(p.name)}技术分析">↗</a></div><div class="logic-name">${e(p.name)}</div><h4>${e(d.heading)}</h4><div class="logic-legend">${d.legend.map(l=>`<span><i class="kind-${e(l[0])}" aria-hidden="true"></i>${e(l[1])}</span>`).join('')}${d.pendingLabel?`<span class="logic-pending-key">${e(d.pendingLabel)}</span>`:''}</div><div class="logic-rows">${d.rows.map(rowMarkup).join('')}</div>${d.contract?`<div class="logic-contract"><strong>${e(d.contract.title)}</strong><ol>${d.contract.steps.map(step=>`<li>${e(step)}</li>`).join('')}</ol></div>`:''}<div class="logic-loop"><strong>${e(d.loop[0])}</strong><span>${e(d.loop[1])}</span></div><div class="logic-records"><small>保留记录</small>${d.records.map(record=>`<span>${e(record)}</span>`).join('')}</div><figcaption class="logic-scope">${e(d.scope)}</figcaption><a class="logic-detail-link" href="${link(p)}/technical">展开流程与技术取舍 <span>↗</span></a></figure>`;
  }
  function featuredFlowDiagram(p, f) {
    const d=f.diagram, v=data.flowPreviews[p.id];
    return `<figure class="feature-diagram preview-diagram" id="flow-${e(p.id)}" aria-label="${e(p.name)}流程摘要"><div class="diagram-title"><span>${e(f.label)}</span><a href="${link(p)}/showcase" aria-label="查看${e(p.name)}完整流程">↗</a></div><h4>${e(v.title)}</h4><div class="preview-legend">${d.legend.map(([kind,label])=>`<span><i class="kind-${e(kind)}" aria-hidden="true"></i>${e(label)}</span>`).join('')}</div><div class="preview-rows">${d.rows.map((r,i)=>`<div class="preview-pair ${r.join==='parallel'?'preview-parallel':''}">${r.nodes.map((n,j)=>`<div class="preview-node kind-${e(n.kind)} ${n.pending?'logic-pending':''}"><span>${e(n.number)}</span><strong>${e(n.title)}</strong><small>${e(v.subtitles[i*2+j])}</small></div>`).join('')}${r.join==='parallel'?'<span class="preview-merge" aria-hidden="true">＋</span>':'<span class="preview-arrow" aria-hidden="true">→</span>'}</div>${i<3?`<div class="preview-gate"><span aria-hidden="true">↓</span>${e(v.gates[i])}</div>`:''}`).join('')}</div><div class="preview-note">${e(v.note)}</div><figcaption class="preview-scope">${e(v.scope)}</figcaption><a class="preview-link" href="${link(p)}/showcase">完整流程、分支与解释 <span>↗</span></a></figure>`;
  }
  function toolsSection() {
    return `<section class="section tools-section" id="tools"><div class="section-heading"><div><div class="eyebrow">TOOLS & PRACTICE</div><h2>使用的工具与实践。</h2></div><p>按任务整理工具使用经历。具体项目的工具链、职责和验证范围，可以在对应案例中查看。</p></div><div class="tools-list">${data.toolsUsed.map((t,i)=>`<article class="tool-row"><div class="tool-title"><small>0${i+1}</small><h3>${e(t.title)}</h3></div><div class="tool-names">${t.names.map(n=>`<span>${e(n)}</span>`).join('')}</div><div class="tool-work"><p>${e(t.text)}</p><a href="${e(t.link[1])}">${e(t.link[0])} ↗</a></div></article>`).join('')}</div><details class="evidence-standard"><summary>案例如何提供依据：背景、决策、执行、失败、评测与复盘</summary><div class="standard-grid">${data.evidenceStandards.map(([title,text,url])=>`<article><h3>${e(title)}</h3><p>${e(text)}</p><a href="${e(url)}">对应案例 ↗</a></article>`).join('')}</div><div class="model-evaluation-design"><h3>模型对比的评测口径</h3><p>这是评测设计，尚未作为已完成的独立 Benchmark 展示。以人物一致性、动作、镜头控制和参考图遵循为任务，用可比较的输入重复生成，保留全部结果和失败样例。</p><p>起步方案：4 类任务 × 2 个模型 × 2 次重复，共 16 次生成。记录指令遵循、时序一致性、运动合理性、一次可用率、重试次数与可用素材成本；小样本结论限定在具体场景。</p></div></details></section>`;
  }
  function featuredCard(p) {
    const f = data.featuredFlows[p.id];
    return `<article class="featured-card">${featuredFlowDiagram(p, f)}<div class="feature-body"><div class="project-top"><span>${e(p.number)} / ${e(p.category)}</span><span class="project-stage">${e(p.stage)}</span></div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="feature-statement">${e(p.statement)}</p><p class="feature-summary">${e(f.summary)}</p><div class="feature-role"><small>我的角色</small><p>${e(p.role)}</p></div><p class="feature-evidence">${e(p.evidence)}</p><div class="actions"><a class="button primary" href="${link(p)}">阅读产品案例 ↗</a><a class="button" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">体验示例流程</a></div><div class="feature-tech"><a href="${link(p)}/technical">技术方案与取舍 ↗</a></div><div class="feature-foot">${p.video?`<a href="${link(p)}/video">76 秒方案视频 ↗</a>`:p.id==='pmos'?'<a href="#case-pmos/showcase">查看完整八阶段方法 ↗</a>':'<a href="#case-carpet/technical">查看图像编辑与任务设计 ↗</a>'}<a href="${e(p.github)}" target="_blank" rel="noopener noreferrer">GitHub 源码 ↗</a></div></div></article>`;
  }
  function systemSection() {
    return `<section class="system-panel" id="system"><div class="system-heading"><div><div class="eyebrow">CROSS-PROJECT PRODUCT DESIGN</div><h2>三个核心案例，<br>展开五层 AI<br>产品系统的设计。</h2></div><p>内容平台处理内容生产与审核，PM OS 处理阶段任务与交接，地毯电商处理商品约束与图像编辑。从三个主案例展开五层设计，并关联各自已有的实现与验证。</p></div><div class="system-layers" aria-label="五层 AI 产品设计关联图">${data.systemLayers.map((l,i) => `<article class="system-layer"><div class="layer-intro"><div><span class="layer-number">0${i+1}</span><h3>${e(l.name)}</h3></div><p>${e(l.description)}</p></div><div class="layer-links">${l.links.map(a=>`<a href="${e(a[1])}"><strong>${e(a[0])}</strong><span>${e(a[2])} ↗</span></a>`).join('')}</div></article>`).join('')}</div><p class="system-scope">跨项目设计视图 · 各项目独立推进；知识库接入、模块复用与效果评估按各自阶段继续验证。</p></section>`;
  }
  function methodSection() {
    const loop = [['业务目标','角色与任务'],['上下文准备','资料与来源'],['AI 执行','生成与处理'],['人工审核','检查与修改'],['产出确认','版本与交接'],['反馈沉淀','SOP 与模块']];
    return `<section class="reliability-panel" id="method"><div class="method-copy"><div class="eyebrow">RELIABILITY BY DESIGN</div><h2>AI 产品的核心不是“自动化更多”，<span class="method-conclusion">而是<em>错误可控。</em></span></h2><p>先明确什么需要交给 AI，什么必须由人判断，再把审核、异常处理和反馈设计进任务流程。</p><div class="principle-grid">${data.productPrinciples.map((p,i)=>`<article><small>0${i+1}</small><h3>${e(p[0])}</h3><p>${e(p[1])}</p></article>`).join('')}</div></div><div class="loop-figure"><div class="control-loop" role="img" aria-label="人机协作闭环：业务目标、上下文准备、AI 执行、人工审核、产出确认、反馈沉淀，再回到业务目标。关键判断由人确认。"><div class="loop-ring" aria-hidden="true"></div><div class="loop-center"><small>HUMAN IN THE LOOP</small><strong>关键判断<br>由人确认</strong><span>审核 · 对齐 · 反馈</span></div>${loop.map((l,i)=>`<div class="loop-node loop-node-${i+1} ${i===3?'loop-human':''}"><small>0${i+1}</small><strong>${e(l[0])}</strong><span>${e(l[1])}</span></div>`).join('')}</div><p class="loop-caption">内容平台的人工审核，PM OS 的阶段确认，<br>是我在产品流程中保留的关键节点。</p></div></section>`;
  }
  function libraryProduct(p) {
    return `<article class="library-card library-product" data-library-kind="product"><a class="library-thumb" href="${link(p)}" aria-label="查看${e(p.name)}案例"><img ${imgSize(p.image)} src="${e(p.image)}" alt="${e(p.name)}界面预览" loading="lazy"><span>产品项目 ↗</span></a><div class="library-body"><div class="eyebrow">${e(p.number)} / ${e(p.category)}</div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="library-statement">${e(p.statement)}</p><span class="project-stage">${e(p.stage)}</span><p class="library-role">我的角色 · ${e(p.role)}</p><div class="library-actions"><a class="text-link" href="${link(p)}">阅读案例 ↗</a><a class="text-link" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">体验示例 ↗</a></div></div></article>`;
  }
  function librarySection() {
    const products=data.projects.filter(p=>!data.featuredIds.includes(p.id));
    const videos=data.aigc.filter(a=>a.image);
    const total=products.length+videos.length;
    return `<section class="section project-library" id="projects"><div class="section-heading"><div><div class="eyebrow">MORE PROJECTS & PRODUCTION</div><h2>更多项目与作品。</h2></div><p>内容平台、PM OS 与地毯电商已在上方展示。这里集中呈现其余业务方案、商业 AIGC 交付与制作实践，保留各项目的职责和当前阶段。</p></div><div class="library-toolbar" id="practice"><div class="library-filters" role="group" aria-label="项目库分类"><button type="button" data-library-filter="all" aria-pressed="true">全部 <span>${total}</span></button><button type="button" data-library-filter="product" aria-pressed="false">产品项目 <span>${products.length}</span></button><button type="button" data-library-filter="aigc" aria-pressed="false">AIGC 作品 <span>${videos.length}</span></button></div><p class="library-count" id="library-count" aria-live="polite">全部 · ${total} 项，另有工作流与制作经历。</p></div><div class="library-grid">${products.map(libraryProduct).join('')}${aigcGallery()}</div><div class="aigc-notes"><div><div class="eyebrow">MORE PRODUCTION</div><h3>其他制作经历</h3><div class="production-list">${data.aigc.filter(a=>!a.image).map(a=>`<div class="production-row"><div><strong>${e(a.name)}</strong><p class="caption">${e(a.contribution)}</p></div></div>`).join('')}</div></div><aside class="workflow-note" id="workflow"><div class="eyebrow">WORKFLOW PRACTICE</div><h3>ComfyUI 业务工作流</h3><p><strong>数字人口播：</strong>将对口型、分镜与剪辑组织为工作流，完成口播内容制作。</p><p><strong>电商控图：</strong>搭建 ComfyUI 流程，使用 Redux 进行画面控制。</p><p class="caption">过往业务实践，当前展示以成片为主；旧工作流文件未保留，因此这里仅说明已确认的业务用途，不展示重建节点为历史成果。</p></aside></div></section>`;
  }
  function filterLibrary(kind) {
    const labels={all:'全部',product:'产品项目',aigc:'AIGC 作品'};
    if(!Object.hasOwn(labels,kind)) return;
    const cards=[...main.querySelectorAll('[data-library-kind]')];
    cards.forEach(card=>{card.hidden=kind!=='all'&&card.dataset.libraryKind!==kind;});
    main.querySelectorAll('[data-library-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.libraryFilter===kind)));
    const count=main.querySelector('#library-count');
    if(count) count.textContent=`${labels[kind]} · ${cards.filter(card=>!card.hidden).length} 项${kind==='aigc'?' · 点击图片可放大，原视频保留飞书入口。':''}`;
  }
  function timeline() {
    return data.work.map(w => `<article class="timeline-item"><time>${e(w.time)}</time><div><h3>${e(w.company)} · ${e(w.role)}</h3><p>${e(w.text)}</p></div></article>`).join('');
  }
  function home() {
    return `<section class="hero" id="home"><div><div class="eyebrow">JIAWEN SHI / AI NATIVE · AIGC</div><h1>从业务目标出发，<br>设计可执行的<br><em>AI 产品与流程。</em></h1><p class="hero-intro">我是师嘉文。${e(data.introduction)}</p><div class="actions"><a class="button primary" href="#featured">查看三个主案例</a><a class="button" href="#resume">查看个人简历</a></div><p class="hero-meta">北京 · ${e(data.experience)} · 工业设计本科</p><div class="hero-proof"><div><strong>03</strong><span>核心产品案例</span></div><div><strong>05</strong><span>产品设计层次</span></div><div><strong>08</strong><span>视频作品展示</span></div></div></div><aside class="capabilities"><div class="small-heading"><span>SKILLS & EVIDENCE</span><span>03</span></div>${data.capabilityEvidence.map((c,i)=>`<div class="capability"><span class="num">0${i+1}</span><div><h3>${e(c.title)}</h3><p class="capability-tools">${e(c.tools)}</p><p>${e(c.text)}</p><div class="capability-links">${c.links.map(([label,url])=>`<a href="${e(url)}">${e(label)} ↗</a>`).join('')}</div></div></div>`).join('')}</aside></section>
    <section class="section featured-section" id="featured"><div class="section-heading"><div><div class="eyebrow">THREE CORE PRODUCT CASES</div><h2>三个核心案例，<br>展开我的 AI 产品实践。</h2></div><p>内容平台关注内容生产与审核，PM OS 关注完整产品过程，地毯电商关注商品约束下的图像编辑。各自展开业务问题、技术方案、关键取舍与实际完成范围。</p></div><div class="featured-grid">${data.featuredIds.map(id=>featuredCard(data.projects.find(p=>p.id===id))).join('')}</div></section>
    ${toolsSection()}
    ${systemSection()}
    ${methodSection()}
    ${librarySection()}
    <section class="section" id="about"><div class="section-heading"><div><div class="eyebrow">EXPERIENCE / COMMUNITY</div><h2>商业交付经验与业务需求接触。</h2></div><p>电商视觉、商业 AIGC 交付，以及自主组织的北京 AI 线下交流。</p></div><div class="about-grid"><div>${timeline()}<p class="caption">电商制作实践：${e(data.workPractice)}</p></div><aside class="community"><div class="eyebrow">BEIJING AI COMMUNITY</div><h3>${e(data.community.name)}</h3><div class="community-number">200+</div><p>群成员 · ${e(data.community.started)}</p><p>${e(data.community.summary)}</p><p>${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">查看社群公开活动</a></aside></div></section>
    <section class="section" id="contact"><div class="contact-layout"><div><div class="eyebrow">LET'S CONNECT</div><h2>聊聊 AI 产品与业务场景。</h2><p>${e(data.roles)}</p></div><div><div class="actions"><a class="button primary" href="#resume">查看简历</a><a class="button" href="tel:${e(data.phone)}">${e(data.phone)}</a><a class="button" href="mailto:${e(data.email)}">${e(data.email)}</a></div><p class="caption">GitHub：JIA-WEN-SHI。</p></div></div></section>`;
  }
  function contextCards(items) {
    return items ? `<div class="case-context">${items.map(([title,text])=>`<article><small>${e(title)}</small><p>${e(text)}</p></article>`).join('')}</div>` : '';
  }
  function productDecisions(p,d) {
    if(!d.decisions) return p.decisions.map((text,i)=>`<div class="decision"><span>0${i+1}</span><p>${e(text)}</p></div>`).join('');
    return `<div class="decision-stories">${d.decisions.map((item,i)=>`<article class="decision-story"><div class="decision-heading"><span>0${i+1}</span><h3>${e(item.title)}</h3></div><dl><dt>当时的问题</dt><dd>${e(item.situation)}</dd><dt>我的选择</dt><dd>${e(item.choice)}</dd><dt>判断依据</dt><dd>${e(item.reason)}</dd></dl></article>`).join('')}</div>`;
  }
  function lifecycle(d) {
    if(!d.lifecycle) return '';
    return `<div class="lifecycle-heading"><h3>从问题到交付，我怎样安排每一步</h3><p>${e(d.lifecycleNote)}</p></div><div class="lifecycle-grid">${d.lifecycle.map(s=>`<article class="lifecycle-card"><div class="stage-title"><span>${e(s.number)}</span><h3>${e(s.title)}</h3></div><p class="stage-question">${e(s.question)}</p><dl><dt>怎么做</dt><dd>${e(s.method)}</dd><dt>留下什么</dt><dd>${e(s.output)}</dd></dl><div class="stage-review"><small>什么时候继续</small><p>${e(s.review)}</p></div></article>`).join('')}</div>`;
  }
  function mechanisms(d) {
    if(!d.mechanisms) return '';
    return `<div class="case-mechanisms"><h3>流程里的具体处理方式</h3><div class="mechanism-grid">${d.mechanisms.map(([title,text])=>`<article><h4>${e(title)}</h4><p>${e(text)}</p></article>`).join('')}</div><p class="caption">${e(d.mechanismNote)}</p></div>`;
  }
  function evidenceTable(rows,headers) {
    if(!rows) return '';
    return `<div class="case-table-wrap"><table class="case-table"><thead><tr>${headers.map(h=>`<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((value,i)=>i===0?`<th scope="row">${e(value)}</th>`:`<td>${e(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function processDiagram(d) {
    const f=d.diagram;
    if(!f) return '';
    return `<figure class="task-diagram" id="workflow-diagram"><div class="eyebrow">${e(f.label)}</div><h3>${e(f.title)}</h3><p class="diagram-scope">${e(f.scope)}</p><ol class="task-route">${f.nodes.map(([label,title,note],i)=>`<li><small>${e(label)}</small><strong>${e(title)}</strong><p>${e(note)}</p>${i<f.nodes.length-1?'<span class="route-arrow" aria-hidden="true">→</span>':''}</li>`).join('')}</ol><div class="branch-label">↓ 按检查结果处理</div><div class="task-branches">${f.outcomes.map(([label,title,note,kind])=>`<div class="task-branch ${e(kind)}"><small>${e(label)}</small><strong>${e(title)}</strong><p>${e(note)}</p></div>`).join('')}</div><figcaption>${e(f.note)}</figcaption></figure>`;
  }
  function executionEvidence(p,d) {
    const x=d.execution;
    if(!x) return '';
    return `<section class="case-section execution-section" id="evidence"><div class="eyebrow">EXECUTION EVIDENCE</div><h2>实际任务与错误记录</h2><div class="evidence-heading"><span>${e(x.type)}</span><time>${e(x.date)}</time></div><h3 class="execution-title">${e(x.title)}</h3><p>${e(x.intro)}</p><dl class="execution-facts">${x.facts.map(([label,text])=>`<div><dt>${e(label)}</dt><dd>${e(text)}</dd></div>`).join('')}</dl><div class="evidence-lesson">${e(x.lesson)}</div><h3 class="case-subheading">${e(x.checksTitle)}</h3>${evidenceTable(x.checks,['动作或问题','实际记录','产品含义'])}<p class="caption">${e(x.checksNote)}</p><figure class="execution-image"><button class="image-button" type="button" data-image="${e(x.image)}" data-caption="${e(x.imageCaption)}" aria-label="放大查看${e(p.name)}验收记录"><img ${imgSize(x.image)} src="${e(x.image)}" alt="${e(x.imageCaption)}" loading="lazy"></button><figcaption>${e(x.imageCaption)}</figcaption></figure><div class="evidence-test"><strong>离线规则核对</strong><p>${e(x.test)}</p></div><div class="evidence-links">${x.sources.map(([label,url])=>`<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a>`).join('')}<a href="assets/product-execution-records.json" target="_blank" rel="noopener noreferrer">验收记录摘编 ↗</a></div><p class="evidence-boundary">${e(x.scope)}</p></section>`;
  }
  function technicalAnalysis(p,d) {
    const t=d.technical;
    if(!t) return '';
    return `<section class="case-section technical-section" id="technical"><div class="eyebrow">TECHNICAL ANALYSIS / 实现与产品取舍</div><h2>技术方案与取舍</h2><p>${e(t.lead)}</p><p class="technical-role">${e(t.role)}</p><div class="technical-stack">${t.stack.map(([label,tools,work])=>`<article><small>${e(label)}</small><h3>${e(tools)}</h3><p>${e(work)}</p></article>`).join('')}</div><figure class="architecture-figure"><h3>一条任务怎样经过系统</h3><ol class="architecture-path">${t.architecture.map(([title,text],i)=>`<li><small>0${i+1}</small><strong>${e(title)}</strong><p>${e(text)}</p>${i<t.architecture.length-1?'<span aria-hidden="true">→</span>':''}</li>`).join('')}</ol><figcaption>${e(t.architectureNote)}</figcaption></figure><h3 class="case-subheading">哪些信息需要一起保存</h3>${evidenceTable(t.objects,['对象','保存什么','为什么需要'])}<div class="technical-choices">${t.choices.map((choice,i)=>`<article><div class="technical-choice-title"><span>0${i+1}</span><h3>${e(choice.title)}</h3></div><div><p><strong>现有实现</strong>${e(choice.implementation)}</p><p><strong>产品考虑</strong>${e(choice.reason)}</p><p class="technical-limit"><strong>当前限制</strong>${e(choice.limit)}</p></div></article>`).join('')}</div><h3 class="case-subheading">规则、模型和人工分别负责什么</h3>${evidenceTable(t.division,['责任','工作','判断范围'])}<h3 class="case-subheading">发生失败时怎样处理</h3>${evidenceTable(t.failures,['情况','处理方式','边界'])}<p class="technical-verification">${e(t.verification)}</p><div class="evidence-links">${t.sources.map(([label,url])=>`<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a>`).join('')}</div></section>`;
  }
  function caseWorkflow(p,d) {
    if(!data.featuredIds.includes(p.id)) return `<div class="flow">${p.flow.map((f,i)=>`<div class="flow-step"><small>STEP ${String(i+1).padStart(2,'0')}</small>${e(f)}</div>`).join('')}</div>${processDiagram(d)}${mechanisms(d)}${image(p)}`;
    return `${detailedFlowDiagram(p,data.featuredFlows[p.id])}<div class="flow-explanations"><h3>为什么这样安排流程</h3>${d.flowNotes.map(([title,reason,boundary],i)=>`<article><span>0${i+1}</span><div><h4>${e(title)}</h4><p>${e(reason)}</p><p class="flow-boundary">${e(boundary)}</p></div></article>`).join('')}</div>${d.stageContract?`<div class="stage-contract"><h3>阶段交接的数据结构</h3><p>${e(d.stageContract.lead)}</p>${evidenceTable(d.stageContract.fields,['工程字段','保存的内容'])}<p class="caption">${e(d.stageContract.note)}</p><a class="text-link" href="${e(d.stageContract.source)}" target="_blank" rel="noopener noreferrer">查看实际字段定义 ↗</a></div>`:''}${d.lifecycle?`<details class="case-expand"><summary>逐阶段查看问题、方法、产出与确认条件 · 8 阶段</summary>${lifecycle(d)}</details>`:''}${d.mechanisms?`<details class="case-expand"><summary>查看资料、版本与操作机制</summary>${mechanisms(d)}</details>`:''}${image(p)}`;
  }
  function evaluationDesign(d) {
    const v=d.evaluationDesign;
    if(!v) return '';
    return `<section class="case-section evaluation-section" id="evaluation"><div class="eyebrow">EVALUATION DESIGN / 评测口径</div><h2>怎样判断产出可用</h2><p>${e(v.lead)}</p><p class="evaluation-state">${e(v.state)}</p>${evidenceTable(v.rows,['维度','核对方式','结果口径'])}${v.formula?`<div class="cost-definition"><strong>${e(v.formula)}</strong><p>${e(v.formulaNote)}</p></div>`:''}</section>`;
  }
  function casePage(p) {
    const d=data.caseDetails?.[p.id] || {};
    const sections=[['overview','为什么做这个项目'],['problem','问题与范围'],['decisions','我做的关键选择'],['showcase',d.lifecycle?'完整八阶段方法':'流程与处理方式'],...(d.technical?[['technical','技术方案与取舍']]:[]),...(d.execution?[['evidence','实际任务与错误记录']]:[]),['implementation','职责与实现范围'],...(d.evaluationDesign?[['evaluation','评测口径与验证范围']]:[]),['result','交付与验证']];
    return `<section class="detail-hero"><div class="breadcrumb"><a href="#featured">作品集</a> / ${e(p.name)}</div><div class="eyebrow">CASE ${e(p.number)} / ${e(p.en)}</div><h1>${e(p.name)}</h1><p class="detail-subtitle">${e(p.statement)}</p><div class="facts"><div class="fact"><small>当前阶段</small><p>${e(p.stage)}</p></div><div class="fact"><small>我的角色</small><p>${e(p.role)}</p></div></div><p class="project-evidence">${e(p.evidence)}</p>${externalLinks(p)}<p class="caption">${e(p.demoScope)}</p></section>${video(p)}<div class="case-grid"><nav class="case-nav" aria-label="案例目录">${p.video ? `<a href="#case-${p.id}/video">方案演示视频</a>` : ''}${sections.map((s,i)=>`<a href="#case-${p.id}/${s[0]}">${String(i+1).padStart(2,'0')} · ${s[1]}</a>`).join('')}</nav><div>
    <section class="case-section" id="overview"><div class="eyebrow">01 / BACKGROUND</div><h2>${e(sections[0][1])}</h2>${(d.intro||[p.summary]).map(text=>`<p>${e(text)}</p>`).join('')}${demoGuide(p)}</section>
    <section class="case-section" id="problem"><div class="eyebrow">02 / PROBLEM & SCOPE</div><h2>${e(sections[1][1])}</h2><p>${e(p.problem)}</p>${contextCards(d.contexts)}</section>
    <section class="case-section" id="decisions"><div class="eyebrow">03 / PRODUCT DECISIONS</div><h2>${e(sections[2][1])}</h2>${productDecisions(p,d)}</section>
    <section class="case-section" id="showcase"><div class="eyebrow">04 / METHOD & WORKFLOW</div><h2>${e(sections[3][1])}</h2>${caseWorkflow(p,d)}</section>
    ${technicalAnalysis(p,d)}
    ${executionEvidence(p,d)}
    <section class="case-section" id="implementation"><div class="eyebrow">ROLE & IMPLEMENTATION</div><h2>职责与实现范围</h2><p>${e(p.implementation)}</p></section>
    ${evaluationDesign(d)}
    <section class="case-section" id="result"><div class="eyebrow">DELIVERY & VALIDATION</div><h2>交付与验证</h2><p>${e(p.outcome)}</p>${evidenceTable(d.results,['产出','当前状态','能说明什么'])}<div class="case-return"><a class="text-link" href="#featured">返回主案例 ↗</a><a class="text-link" href="#projects">查看更多项目 ↗</a></div></section>
    </div></div>`;
  }
  function resume() {
    return `<section class="page-heading"><div class="eyebrow">RESUME / AI PRODUCT</div><h1>师嘉文</h1><p>${e(data.roles)}<br>北京 · ${e(data.experience)} · 本科 / 工业设计 · ${e(data.phone)}<br><a href="mailto:${e(data.email)}">${e(data.email)}</a></p><div class="actions no-print"><button class="button primary" id="print-resume" type="button">打印 / 保存 PDF</button><a class="button" href="#home">返回作品集</a></div></section><div class="resume-layout"><div>
    <section class="resume-section"><h2>个人简介</h2><p>${e(data.introduction)}</p><p>自主组织 200+ 人北京 AI 线下交流社群，通过行业交流接触业务诉求，推进方案沟通与项目合作。持续实践多模态生成、Agent 与工作流工具。</p></section>
    <section class="resume-section"><h2>工作经历</h2>${timeline()}<p>${e(data.workPractice)}</p></section><section class="resume-section"><h2>AIGC 代表作品与个人贡献</h2>${data.aigc.map(a => `<article style="margin-bottom:20px"><h3>${e(a.name)}</h3><p>${e(a.contribution)}</p>${a.source ? `<a class="text-link no-print" href="${e(a.source)}" target="_blank" rel="noopener noreferrer">查看原视频</a>` : ''}</article>`).join('')}</section>
    <section class="resume-section"><h2>产品项目</h2>${data.projects.map(p => `<article style="margin-bottom:25px"><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="caption">${e(p.role)} · ${e(p.stage)}</p><p>${e(p.summary)}</p></article>`).join('')}</section>
    <section class="resume-section"><h2>社群与行业实践</h2><h3>${e(data.community.name)} · 组织者</h3><p>${e(data.community.started)}。${e(data.community.summary)}${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">社群公开活动记录</a></section>
    <section class="resume-section"><h2>教育与荣誉</h2><h3>华北理工大学轻工学院</h3><p>本科 · 工业设计 · 2017–2021</p><p>${e(data.designFoundation)}</p><h3>全国三维数字化创新大赛（龙鼎奖）</h3><p>2018–2019 年河北赛区一等奖</p></section>
    </div><aside class="resume-aside"><div class="eyebrow">PRODUCT CAPABILITIES & PRACTICE</div>${data.skills.map(s => `<div class="skill-group"><strong>${e(s[0])}</strong><p>${e(s[1])}</p></div>`).join('')}<p class="caption">项目当前阶段与个人职责，详见对应案例。</p></aside></div>`;
  }
  let currentView = '';
  function route() {
    const raw = location.hash.slice(1) || 'home';
    let view='home',section='';
    if(raw.startsWith('case-')) [view,section] = raw.split('/');
    else if(raw==='resume') view=raw;
    else if(raw !== 'main') section=raw;
    const changed = view !== currentView;
    if(changed) {
      if(view==='resume') main.innerHTML=resume();
      else if(view.startsWith('case-')) {
        const p=data.projects.find(x=>x.id===view.slice(5));
        if(!p) { location.hash='home';return; }
        main.innerHTML=casePage(p);
      } else main.innerHTML=home();
      currentView=view;
      document.title=(view.startsWith('case-') ? data.projects.find(x=>x.id===view.slice(5)).name : view==='resume'?'个人简历':'AI Native / AIGC 产品作品集')+' · 师嘉文';
    }
    if(view==='home' && ['practice','workflow'].includes(section)) filterLibrary('aigc');
    if(view==='home' && section==='projects') filterLibrary('all');
    requestAnimationFrame(()=> {
      const target=section && document.getElementById(section);
      if(target) target.scrollIntoView({behavior:'instant',block:'start'});
      else if(changed) {window.scrollTo({top:0,left:0,behavior:'instant'});main.focus({preventScroll:true});}
    });
  }
  const dialog=document.getElementById('image-dialog');
  document.addEventListener('click',event=> {
    const filter=event.target.closest('[data-library-filter]');
    if(filter) filterLibrary(filter.dataset.libraryFilter);
    const button=event.target.closest('[data-image]');
    if(button) {
      dialog.classList.toggle('aigc-dialog',button.classList.contains('aigc-image'));
      dialog.querySelector('img').src=button.dataset.image;
      dialog.querySelector('img').alt=button.getAttribute('aria-label');
      dialog.querySelector('p').textContent=button.dataset.caption;
      dialog.showModal();
    }
    if(event.target.closest('.dialog-close')) dialog.close();
    if(event.target.closest('#print-resume')) window.print();
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  window.addEventListener('hashchange',route);
  route();
})();
