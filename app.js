(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.getElementById('main');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const e = escape;
  const link = p => `#case-${p.id}`;
  const externalLinks = p => `<div class="actions" style="margin-top:18px">${p.demo ? `<a class="button primary" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">直接演示</a>` : ''}${p.video ? `<a class="button" href="${link(p)}/video">观看方案视频</a>` : ''}${p.github ? `<a class="button" href="${e(p.github)}" target="_blank" rel="noopener noreferrer">查看 GitHub 源码</a>` : ''}</div>`;
  const gap = (title, text) => `<div class="pending"><div class="eyebrow">${e(title)}</div>${e(text)}</div>`;
  const image = p => p.image ? `<button class="image-button" type="button" data-image="${e(p.image)}" data-caption="${e(p.imageNote)}" aria-label="放大查看${e(p.name)}界面"><img src="${e(p.image)}" alt="${e(p.name)}已有界面" loading="lazy"></button><p class="caption">${e(p.imageNote)}</p>` : `<div class="empty-figure">项目界面位置已预留</div>`;
  const demoGuide = p => `<div class="demo-guide"><div class="eyebrow">CORE TASK / 核心任务</div><h3>体验核心任务流程</h3><p>${e(p.demoScenario)}</p><ol>${p.demoSteps.map(s => `<li>${e(s)}</li>`).join('')}</ol><p class="demo-scope">${e(p.demoScope)}</p></div>`;
  const video = p => p.video ? `<figure class="video-showcase" id="video"><div class="eyebrow">PRODUCT WALKTHROUGH / 01:16</div><h2>内容生产、人工审核与策略迭代</h2><p>通过一条完整任务，展示 AI 与人工的职责分工和关键确认节点。</p><video controls playsinline preload="metadata" poster="${e(p.videoPoster)}" aria-label="EvoContent 内容平台方案演示视频"><source src="${e(p.video)}" type="video/mp4">浏览器暂不支持视频，可<a href="${e(p.video)}">打开演示视频</a>。</video><figcaption>${e(p.videoCaption)}</figcaption><div class="video-chapters"><span>00:00 · 模拟采集与资料</span><span>00:25 · 草稿编辑与审核</span><span>00:52 · SOP 分析与确认</span></div></figure>` : '';
  function card(p) {
    return `<article class="project-card"><div class="project-text"><div class="project-top"><span>${e(p.number)} / ${e(p.category)}</span><span class="project-stage">${e(p.stage)}</span></div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="statement">${e(p.statement)}</p><p class="role">我的角色 · ${e(p.role)}</p><p class="project-evidence">${e(p.evidence)}</p><a class="text-link" href="${link(p)}">阅读项目案例</a>${externalLinks(p)}</div><a href="${link(p)}" class="project-visual" aria-label="查看${e(p.name)}案例"><img src="${e(p.image)}" alt="${e(p.name)}界面预览" loading="lazy"><span class="visual-label">方案与示例界面 · 展示范围见案例说明</span></a></article>`;
  }
  function aigcGallery() {
    return data.aigc.filter(a => a.image).map(a => `<article class="aigc-card library-card" data-library-kind="aigc"><button class="aigc-image" type="button" data-image="${e(a.image)}" data-caption="${e(a.name)} · 我的职责：${e(a.contribution)} 画面来自所提供的视频。" aria-label="放大查看${e(a.name)}作品画面"><img src="${e(a.image)}" width="${a.imageWidth}" height="${a.imageHeight}" alt="${e(a.name)}真实作品画面" loading="lazy"><span>放大画面 ↗</span></button><div class="aigc-body"><div class="eyebrow">${e(a.kind)}</div><h3>${e(a.name)}</h3><p class="aigc-contribution"><strong>我的职责</strong>${e(a.contribution)}</p><a class="text-link" href="${e(a.source)}" target="_blank" rel="noopener noreferrer" aria-label="在飞书打开${e(a.name)}原视频">原视频 ↗</a></div></article>`).join('');
  }
  function featuredCard(p) {
    const f = data.featuredFlows[p.id];
    return `<article class="featured-card"><a class="feature-diagram" href="${link(p)}/showcase" aria-label="查看${e(p.name)}流程"><div class="diagram-title"><span>${e(f.label)}</span><span>↗</span></div><div class="diagram-nodes">${f.nodes.map((n,i) => `<div class="diagram-node ${i===2?'human-node':''}"><small>0${i+1}</small><strong>${e(n[0])}</strong><span>${e(n[1])}</span></div>`).join('')}</div><div class="diagram-note"><span class="status-dot"></span>${e(f.note)}</div></a><div class="feature-body"><div class="project-top"><span>${e(p.number)} / ${e(p.category)}</span><span class="project-stage">${e(p.stage)}</span></div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="feature-statement">${e(p.statement)}</p><p class="feature-summary">${e(f.summary)}</p><div class="feature-role"><small>我的角色</small><p>${e(p.role)}</p></div><p class="feature-evidence">${e(p.evidence)}</p><div class="actions"><a class="button primary" href="${link(p)}">阅读产品案例 ↗</a><a class="button" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">体验示例流程</a></div><div class="feature-foot">${p.video?`<a href="${link(p)}/video">76 秒方案视频 ↗</a>`:'<span>资料 · 报告 · 阶段确认</span>'}<a href="${e(p.github)}" target="_blank" rel="noopener noreferrer">GitHub 源码 ↗</a></div></div></article>`;
  }
  function systemSection() {
    return `<section class="system-panel" id="system"><div class="system-heading"><div><div class="eyebrow">CROSS-PROJECT PRODUCT DESIGN</div><h2>两个核心案例，<br>展开五层 AI<br>产品系统的设计。</h2></div><p>内容平台聚焦内容生产与人工审核，PM OS 聚焦阶段任务与方法复用。结合业务方案与 AIGC 实践，从目标到反馈，梳理产品能力的五个层次。</p></div><div class="system-layers" aria-label="五层 AI 产品设计关联图">${data.systemLayers.map((l,i) => `<article class="system-layer"><div class="layer-intro"><div><span class="layer-number">0${i+1}</span><h3>${e(l.name)}</h3></div><p>${e(l.description)}</p></div><div class="layer-links">${l.links.map(a=>`<a href="${e(a[1])}"><strong>${e(a[0])}</strong><span>${e(a[2])} ↗</span></a>`).join('')}</div></article>`).join('')}</div><p class="system-scope">跨项目设计视图 · 各项目独立推进；知识库接入、模块复用与效果评估按各自阶段继续验证。</p></section>`;
  }
  function methodSection() {
    const loop = [['业务目标','角色与任务'],['上下文准备','资料与来源'],['AI 执行','生成与处理'],['人工审核','检查与修改'],['产出确认','版本与交接'],['反馈沉淀','SOP 与模块']];
    return `<section class="reliability-panel" id="method"><div class="method-copy"><div class="eyebrow">RELIABILITY BY DESIGN</div><h2>AI 产品的核心不是“自动化更多”，<span class="method-conclusion">而是<em>错误可控。</em></span></h2><p>先明确什么需要交给 AI，什么必须由人判断，再把审核、异常处理和反馈设计进任务流程。</p><div class="principle-grid">${data.productPrinciples.map((p,i)=>`<article><small>0${i+1}</small><h3>${e(p[0])}</h3><p>${e(p[1])}</p></article>`).join('')}</div></div><div class="loop-figure"><div class="control-loop" role="img" aria-label="人机协作闭环：业务目标、上下文准备、AI 执行、人工审核、产出确认、反馈沉淀，再回到业务目标。关键判断由人确认。"><div class="loop-ring" aria-hidden="true"></div><div class="loop-center"><small>HUMAN IN THE LOOP</small><strong>关键判断<br>由人确认</strong><span>审核 · 对齐 · 反馈</span></div>${loop.map((l,i)=>`<div class="loop-node loop-node-${i+1} ${i===3?'loop-human':''}"><small>0${i+1}</small><strong>${e(l[0])}</strong><span>${e(l[1])}</span></div>`).join('')}</div><p class="loop-caption">内容平台的人工审核，PM OS 的阶段确认，<br>是我在产品流程中保留的关键节点。</p></div></section>`;
  }
  function libraryProduct(p) {
    return `<article class="library-card library-product" data-library-kind="product"><a class="library-thumb" href="${link(p)}" aria-label="查看${e(p.name)}案例"><img src="${e(p.image)}" alt="${e(p.name)}界面预览" loading="lazy"><span>产品项目 ↗</span></a><div class="library-body"><div class="eyebrow">${e(p.number)} / ${e(p.category)}</div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="library-statement">${e(p.statement)}</p><span class="project-stage">${e(p.stage)}</span><p class="library-role">我的角色 · ${e(p.role)}</p><div class="library-actions"><a class="text-link" href="${link(p)}">阅读案例 ↗</a><a class="text-link" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">体验示例 ↗</a></div></div></article>`;
  }
  function librarySection() {
    const products=data.projects.filter(p=>!data.featuredIds.includes(p.id));
    const videos=data.aigc.filter(a=>a.image);
    const total=products.length+videos.length;
    return `<section class="section project-library" id="projects"><div class="section-heading"><div><div class="eyebrow">MORE PROJECTS & PRODUCTION</div><h2>更多项目与作品。</h2></div><p>内容平台与 PM OS 已在上方展示。这里集中呈现其余业务方案、商业 AIGC 交付与制作实践，保留各项目的职责和当前阶段。</p></div><div class="library-toolbar" id="practice"><div class="library-filters" role="group" aria-label="项目库分类"><button type="button" data-library-filter="all" aria-pressed="true">全部 <span>${total}</span></button><button type="button" data-library-filter="product" aria-pressed="false">产品项目 <span>${products.length}</span></button><button type="button" data-library-filter="aigc" aria-pressed="false">AIGC 作品 <span>${videos.length}</span></button></div><p class="library-count" id="library-count" aria-live="polite">全部 · ${total} 项，另有工作流与制作经历。</p></div><div class="library-grid">${products.map(libraryProduct).join('')}${aigcGallery()}</div><div class="aigc-notes"><div><div class="eyebrow">MORE PRODUCTION</div><h3>其他制作经历</h3><div class="production-list">${data.aigc.filter(a=>!a.image).map(a=>`<div class="production-row"><div><strong>${e(a.name)}</strong><p class="caption">${e(a.contribution)}</p></div></div>`).join('')}</div></div><aside class="workflow-note" id="workflow"><div class="eyebrow">WORKFLOW PRACTICE</div><h3>ComfyUI 业务工作流</h3><p><strong>数字人口播：</strong>将对口型、分镜与剪辑组织为工作流，完成口播内容制作。</p><p><strong>电商控图：</strong>搭建 ComfyUI 流程，使用 Redux 进行画面控制。</p><p class="caption">过往业务实践，当前展示以成片为主；具体节点、工具版本与迭代过程待补充。</p></aside></div></section>`;
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
    return `<section class="hero" id="home"><div><div class="eyebrow">JIAWEN SHI / AI NATIVE · AIGC</div><h1>从业务目标出发，<br>设计可执行的<br><em>AI 产品与流程。</em></h1><p class="hero-intro">我是师嘉文。${e(data.introduction)}</p><div class="actions"><a class="button primary" href="#featured">查看两个主案例</a><a class="button" href="#resume">查看个人简历</a></div><p class="hero-meta">北京 · ${e(data.experience)} · 工业设计本科</p><div class="hero-proof"><div><strong>02</strong><span>核心产品案例</span></div><div><strong>05</strong><span>产品设计层次</span></div><div><strong>08</strong><span>视频作品展示</span></div></div></div><aside class="capabilities"><div class="small-heading"><span>CORE CAPABILITIES</span><span>03</span></div><div class="capability"><span class="num">01</span><div><h3>需求分析与方案定义</h3><p>拆解业务诉求，梳理角色、任务与流程，明确产品目标和首版范围。</p></div></div><div class="capability"><span class="num">02</span><div><h3>AI Native 工作流设计</h3><p>将方法论与任务沉淀为模块，通过阶段目标、人工对齐与反馈组织 Agent 工作。</p></div></div><div class="capability"><span class="num">03</span><div><h3>原型推进与技术协作</h3><p>通过可操作原型表达产品方案，梳理字段、状态与交互要求，推进技术对接。</p></div></div></aside></section>
    <section class="section featured-section" id="featured"><div class="section-heading"><div><div class="eyebrow">TWO CORE PRODUCT CASES</div><h2>两个核心案例，<br>展开我的 AI 产品实践。</h2></div><p>一个面向内容生产的人机协作，一个面向项目过程的信息对齐与方法复用。展示业务目标、产品取舍、关键流程与个人职责。</p></div><div class="featured-grid">${data.featuredIds.map(id=>featuredCard(data.projects.find(p=>p.id===id))).join('')}</div></section>
    ${systemSection()}
    ${methodSection()}
    ${librarySection()}
    <section class="section" id="about"><div class="section-heading"><div><div class="eyebrow">EXPERIENCE / COMMUNITY</div><h2>商业交付经验与业务需求接触。</h2></div><p>电商视觉、商业 AIGC 交付，以及自主组织的北京 AI 线下交流。</p></div><div class="about-grid"><div>${timeline()}<p class="caption">任职月份按已确认信息整理。电商阶段建立的地毯渲染与图像处理方法，仍被原团队使用。</p></div><aside class="community"><div class="eyebrow">BEIJING AI COMMUNITY</div><h3>${e(data.community.name)}</h3><div class="community-number">200+</div><p>群成员 · ${e(data.community.started)}</p><p>${e(data.community.summary)}</p><p>${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">查看社群公开活动</a></aside></div></section>
    <section class="section" id="contact"><div class="contact-layout"><div><div class="eyebrow">LET'S CONNECT</div><h2>聊聊 AI 产品与业务场景。</h2><p>${e(data.roles)}</p></div><div><div class="actions"><a class="button primary" href="#resume">查看简历</a><a class="button" href="tel:${e(data.phone)}">${e(data.phone)}</a><a class="button" href="mailto:${e(data.email)}">${e(data.email)}</a></div><p class="caption">GitHub：JIA-WEN-SHI。</p></div></div></section>`;
  }
  function casePage(p) {
    return `<section class="detail-hero"><div class="breadcrumb"><a href="#featured">作品集</a> / ${e(p.name)}</div><div class="eyebrow">CASE ${e(p.number)} / ${e(p.en)}</div><h1>${e(p.name)}</h1><p class="detail-subtitle">${e(p.statement)}</p><div class="facts"><div class="fact"><small>当前阶段</small><p>${e(p.stage)}</p></div><div class="fact"><small>我的角色</small><p>${e(p.role)}</p></div></div><p class="project-evidence">${e(p.evidence)}</p>${externalLinks(p)}<p class="caption">${e(p.demoScope)}</p></section>${video(p)}<div class="case-grid"><nav class="case-nav" aria-label="案例目录">${p.video ? `<a href="#case-${p.id}/video">方案演示视频</a>` : ''}${[['overview','项目定位与目标'],['problem','业务问题与需求依据'],['decisions','关键产品决策'],['showcase','核心流程与交互'],['implementation','我的职责与协作'],['result','阶段产出与验证计划'],['missing','补充材料']].map((s,i) => `<a href="#case-${p.id}/${s[0]}">${String(i+1).padStart(2,'0')} · ${s[1]}</a>`).join('')}</nav><div>
    <section class="case-section" id="overview"><div class="eyebrow">01 / OVERVIEW</div><h2>项目定位与目标</h2><p>${e(p.summary)}</p>${demoGuide(p)}</section>
    <section class="case-section" id="problem"><div class="eyebrow">02 / PROBLEM & EVIDENCE</div><h2>业务问题与需求依据</h2><p>${e(p.problem)}</p></section>
    <section class="case-section" id="decisions"><div class="eyebrow">03 / PRODUCT DECISIONS</div><h2>关键产品决策</h2>${p.decisions.map((d,i) => `<div class="decision"><span>0${i+1}</span><p>${e(d)}</p></div>`).join('')}</section>
    <section class="case-section" id="showcase"><div class="eyebrow">04 / WORKFLOW & INTERFACE</div><h2>核心流程与交互</h2><div class="flow">${p.flow.map((f,i) => `<div class="flow-step"><small>STEP ${String(i+1).padStart(2,'0')}</small>${e(f)}</div>`).join('')}</div>${image(p)}</section>
    <section class="case-section" id="implementation"><div class="eyebrow">05 / IMPLEMENTATION & COLLABORATION</div><h2>我的职责与协作</h2><p>${e(p.implementation)}</p></section>
    <section class="case-section" id="result"><div class="eyebrow">06 / OUTCOME & VALIDATION</div><h2>阶段产出与验证计划</h2><p>${e(p.outcome)}</p><div class="validation-plan"><h3>下一步怎样验证</h3><p class="caption">以下是拟议的验证方法，尚未形成真实用户验证结果。</p><ul>${p.validationPlan.map(v => `<li>${e(v)}</li>`).join('')}</ul></div></section>
    <section class="case-section" id="missing"><div class="eyebrow">07 / CONTENT TO ADD</div><h2>补充案例依据</h2><ul class="gap-list">${p.gaps.map(g => `<li>${e(g)}</li>`).join('')}</ul><div class="actions" style="margin-top:25px"><a class="button" href="#materials">查看完整补充清单</a><a class="button" href="#projects">查看更多项目</a></div></section>
    </div></div>`;
  }
  function resume() {
    return `<section class="page-heading"><div class="eyebrow">RESUME / WORKING DRAFT</div><h1>师嘉文</h1><p>${e(data.roles)}<br>北京 · ${e(data.experience)} · 本科 / 工业设计 · ${e(data.phone)}<br><a href="mailto:${e(data.email)}">${e(data.email)}</a></p><div class="actions no-print"><button class="button primary" id="print-resume" type="button">打印 / 保存 PDF</button><a class="button" href="#home">返回作品集</a></div></section><div class="resume-layout"><div>
    <section class="resume-section"><h2>个人简介</h2><p>${e(data.introduction)}</p><p>自主组织 200+ 人北京 AI 线下交流社群，通过行业交流接触业务诉求，推进方案沟通与项目合作。持续实践多模态生成、Agent 与工作流工具。</p></section>
    <section class="resume-section"><h2>工作经历</h2>${timeline()}<p>在天津武清地毯电商相关工作中建立渲染与图像处理流程，相关方法仍被原团队使用。</p></section><section class="resume-section"><h2>AIGC 代表作品与个人贡献</h2>${data.aigc.map(a => `<article style="margin-bottom:20px"><h3>${e(a.name)}</h3><p>${e(a.contribution)}</p>${a.source ? `<a class="text-link no-print" href="${e(a.source)}" target="_blank" rel="noopener noreferrer">查看原视频</a>` : ''}</article>`).join('')}</section>
    <section class="resume-section"><h2>产品项目</h2>${data.projects.map(p => `<article style="margin-bottom:25px"><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="caption">${e(p.role)} · ${e(p.stage)}</p><p>${e(p.summary)}</p></article>`).join('')}</section>
    <section class="resume-section"><h2>社群与行业实践</h2><h3>${e(data.community.name)} · 组织者</h3><p>${e(data.community.started)}。${e(data.community.summary)}${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">社群公开活动记录</a></section>
    <section class="resume-section"><h2>教育与荣誉</h2><h3>华北理工大学轻工学院</h3><p>本科 · 工业设计 · 2017–2021</p><h3>全国三维数字化创新大赛（龙鼎奖）</h3><p>2018–2019 年河北赛区一等奖</p></section>
    </div><aside class="resume-aside"><div class="eyebrow">PRODUCT CAPABILITIES & PRACTICE</div>${data.skills.map(s => `<div class="skill-group"><strong>${e(s[0])}</strong><p>${e(s[1])}</p></div>`).join('')}${gap('待补材料','工作流的真实输入输出样例、项目时间线及关键决策的过程记录。') }<p class="caption">这份网页简历按当前已对齐信息整理；最终投递版随材料更新。</p></aside></div>`;
  }
  function materials() {
    const groups = [
      {name:'个人信息与经历',text:'求职方向、邮箱与主要任职月份已补充。',gaps:['地毯渲染流程与原团队持续复用的具体材料','遗漏电商公司的名称与时间（想起后可选补充）','最终投递版简历与短版面试 PDF']},
      {name:'AIGC 作品与交付',text:'八个视频的真实画面、原链接与个人贡献已加入。',gaps:['数字人口播与电商控图：关键控制难点、自己的调整步骤和结果对比','华泰自动化脚本的输入、所用工具与运行过程','李白与安徽文旅的可展示画面（可选）','各作品的项目时间，以及一例客户反馈与版本修改']},
      {name:'NeuroLab 社群',text:'200+ 群成员、近 20 场线下主题活动及公开账号已补充。',gaps:['一到两场代表活动的组织过程与产出','黑客松中个人负责的工作及可展示材料（可选）']},
      ...data.projects.map(p => ({name:p.name,text:p.stage,gaps:p.gaps})),
      {name:'后续可选内容',text:'不影响当前结构预览。',gaps:['模型评测研究：当前只有框架探索，正式实验与结果待补','短版面试 PDF；英文介绍','基于已核实案例的 AI 导览']}
    ];
    return `<section class="page-heading"><div class="eyebrow">CONTENT WORKSPACE</div><h1>慢慢补，把每个案例讲清楚。</h1><p>结构已经准备好。你可以逐次提供聊天摘要、文件夹位置、截图或自己的说明，我们把材料放回对应页面。</p><div class="actions"><a class="button primary" href="#home">返回首页</a></div></section>${groups.map(g => `<section class="materials-group"><div><h2>${e(g.name)}</h2><p>${e(g.text)}</p></div><ul class="gap-list">${g.gaps.map(v => `<li>${e(v)}</li>`).join('')}</ul></section>`).join('')}`;
  }
  let currentView = '';
  function route() {
    const raw = location.hash.slice(1) || 'home';
    let view='home',section='';
    if(raw.startsWith('case-')) [view,section] = raw.split('/');
    else if(['resume','materials'].includes(raw)) view=raw;
    else if(raw !== 'main') section=raw;
    const changed = view !== currentView;
    if(changed) {
      if(view==='resume') main.innerHTML=resume();
      else if(view==='materials') main.innerHTML=materials();
      else if(view.startsWith('case-')) {
        const p=data.projects.find(x=>x.id===view.slice(5));
        if(!p) { location.hash='home';return; }
        main.innerHTML=casePage(p);
      } else main.innerHTML=home();
      currentView=view;
      document.title=(view.startsWith('case-') ? data.projects.find(x=>x.id===view.slice(5)).name : view==='resume'?'个人简历':view==='materials'?'内容补充清单':'AI Native / AIGC 产品作品集')+' · 师嘉文';
    }
    if(view==='home' && ['practice','workflow'].includes(section)) filterLibrary('aigc');
    if(view==='home' && section==='projects') filterLibrary('all');
    requestAnimationFrame(()=> {
      const target=section && document.getElementById(section);
      if(target) target.scrollIntoView({behavior:'auto',block:'start'});
      else if(changed) {window.scrollTo(0,0);main.focus({preventScroll:true});}
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
