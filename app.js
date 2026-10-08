(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const main = document.getElementById('main');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const e = escape;
  const link = p => `#case-${p.id}`;
  const externalLinks = p => `<div class="actions" style="margin-top:18px">${p.demo ? `<a class="button primary" href="${e(p.demo)}" target="_blank" rel="noopener noreferrer">打开交互原型</a>` : ''}${p.github ? `<a class="button" href="${e(p.github)}" target="_blank" rel="noopener noreferrer">查看 GitHub 源码</a>` : ''}</div>`;
  const gap = (title, text) => `<div class="pending"><div class="eyebrow">${e(title)}</div>${e(text)}</div>`;
  const image = p => p.image ? `<button class="image-button" type="button" data-image="${e(p.image)}" data-caption="${e(p.imageNote)}" aria-label="放大查看${e(p.name)}界面"><img src="${e(p.image)}" alt="${e(p.name)}已有界面" loading="lazy"></button><p class="caption">${e(p.imageNote)}</p>` : `<div class="empty-figure">项目界面位置已预留</div>`;
  function card(p) {
    return `<article class="project-card"><div class="project-text"><div class="project-top"><span>${e(p.number)} / ${e(p.category)}</span><span class="project-stage">${e(p.stage)}</span></div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="statement">${e(p.statement)}</p><p class="role">我的角色 · ${e(p.role)}</p><a class="text-link" href="${link(p)}">阅读项目案例</a>${externalLinks(p)}</div><a href="${link(p)}" class="project-visual" aria-label="查看${e(p.name)}案例"><img src="${e(p.image)}" alt="${e(p.name)}历史界面预览" loading="lazy"><span class="visual-label">已有界面 · 展示范围见案例说明</span></a></article>`;
  }
  function timeline() {
    return data.work.map(w => `<article class="timeline-item"><time>${e(w.time)}</time><div><h3>${e(w.company)} · ${e(w.role)}</h3><p>${e(w.text)}</p></div></article>`).join('');
  }
  function home() {
    return `<section class="hero"><div><div class="eyebrow">JIAWEN SHI / AIGC · AI PRODUCT</div><h1>从业务需求出发，<br>设计清晰的<br><em>AI 产品方案。</em></h1><p class="hero-intro">我是师嘉文。${e(data.introduction)}</p><div class="actions"><a class="button primary" href="#projects">查看重点案例</a><a class="button" href="#resume">查看个人简历</a></div><p class="hero-meta">北京 · 工业设计本科 · 多模态 / Agent / Workflow</p></div><aside class="capabilities"><div class="small-heading"><span>CORE CAPABILITIES</span><span>03</span></div><div class="capability"><span class="num">01</span><div><h3>业务与产品判断</h3><p>从客户原有工作方式出发，梳理流程、范围和人工协作，再形成产品方案。</p></div></div><div class="capability"><span class="num">02</span><div><h3>AIGC 内容实践</h3><p>参与商业图像与视频交付，理解模型能力、工作流与生成结果之间的关系。</p></div></div><div class="capability"><span class="num">03</span><div><h3>原型与流程实现</h3><p>借助 AI 编程工具，把方案转化为界面和可展示流程，并与技术伙伴对接。</p></div></div></aside></section>
    <section class="section" id="projects"><div class="section-heading"><div><div class="eyebrow">SELECTED WORK / 01 — 04</div><h2>四个场景，四种产品探索。</h2></div><p>多模态生产、个人 AI 工作流、业务审查与内容运营。每个案例说明实际职责、完成阶段和仍待验证的部分。</p></div><div class="project-list">${data.projects.slice(0,4).map(card).join('')}</div><div class="support-grid">${data.projects.slice(4).map(p => `<article class="support-card"><div class="project-top">${e(p.number)} / ${e(p.category)}</div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p>${e(p.statement)}</p><span class="project-stage">${e(p.stage)}</span><p style="margin-top:18px"><a class="text-link" href="${link(p)}">阅读项目案例</a></p></article>`).join('')}</div></section>
    <section class="section" id="practice"><div class="practice-layout"><div><div class="eyebrow">AIGC / COMMERCIAL PRACTICE</div><h2>从真实内容交付，<br>理解生成式 AI。</h2><p class="practice-copy">在中科趋势参与 AIGC 内容制作、需求沟通和版本交付。这里将展示项目片段、制作流程与个人贡献。</p><div class="practice-tags"><span>图像与视频</span><span>ComfyUI 工作流</span><span>模型选择</span><span>版本迭代</span></div>${gap('待补 · 作品材料','商业作品视频或图片、你负责的镜头或环节，以及可公开展示的版本。')}</div><div class="production-list">${data.aigc.map((a,i) => `<div class="production-row"><span>${String(i+1).padStart(2,'0')} · ${e(a)}</span><span>作品待补</span></div>`).join('')}<p class="caption">项目名称来自简历，具体成果与职责将随材料补充。</p></div></div></section>
    <section class="section"><div class="eyebrow">HOW I WORK</div><h2>把需求，一步步变成方案。</h2><div class="method-grid">${[['理解业务','先了解谁在什么环节遇到困难，保留原始需求。'],['梳理流程','组织角色、材料、任务和异常处理，确定首版范围。'],['形成原型','用关键界面串起完整操作，明确 AI 与人工的分工。'],['展示与复盘','记录实际反馈和完成阶段，把待验证的问题保留下来。']].map((v,i) => `<div class="method-item"><span>0${i+1}</span><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('')}</div></section>
    <section class="section" id="about"><div class="section-heading"><div><div class="eyebrow">EXPERIENCE / COMMUNITY</div><h2>内容实践，与真实需求接触。</h2></div><p>电商视觉、商业 AIGC 交付，以及自主组织的北京 AI 线下交流。</p></div><div class="about-grid"><div>${timeline()}<p class="caption">简历中部分任职时间重叠，时间线待核实后更新。</p></div><aside class="community"><div class="eyebrow">BEIJING AI COMMUNITY</div><h3>北京 AI 线下交流社群</h3><div class="community-number">200+</div><p>社群规模 · 自主组织</p><p>通过 Coffee Chat 等形式连接 AI 从业者、开发者、产品经理与业务人员，交流企业 AI 应用、Agent 与产品设计。</p><p>社群带来需求线索与合作接触；法律项目由朋友的客户渠道推进。</p></aside></div></section>
    <section class="section" id="contact"><div class="contact-layout"><div><div class="eyebrow">LET'S CONNECT</div><h2>聊聊 AI 产品与业务场景。</h2><p>${e(data.roles)}</p></div><div><div class="actions"><a class="button primary" href="#resume">查看简历</a><a class="button" href="tel:${e(data.phone)}">${e(data.phone)}</a></div><p class="caption">邮箱待补充。GitHub：JIA-WEN-SHI。</p></div></div></section>`;
  }
  function casePage(p) {
    return `<section class="detail-hero"><div class="breadcrumb"><a href="#projects">全部项目</a> / ${e(p.name)}</div><div class="eyebrow">CASE ${e(p.number)} / ${e(p.en)}</div><h1>${e(p.name)}</h1><p class="detail-subtitle">${e(p.statement)}</p><div class="facts"><div class="fact"><small>当前阶段</small><p>${e(p.stage)}</p></div><div class="fact"><small>我的角色</small><p>${e(p.role)}</p></div></div>${externalLinks(p)}</section><div class="case-grid"><nav class="case-nav" aria-label="案例目录">${[['overview','项目概览'],['problem','需求与原流程'],['decisions','关键产品判断'],['showcase','流程与界面'],['implementation','实现与协作'],['result','结果与复盘'],['missing','待补材料']].map((s,i) => `<a href="#case-${p.id}/${s[0]}">${String(i+1).padStart(2,'0')} · ${s[1]}</a>`).join('')}</nav><div>
    <section class="case-section" id="overview"><div class="eyebrow">01 / OVERVIEW</div><h2>项目概览</h2><p>${e(p.summary)}</p></section>
    <section class="case-section" id="problem"><div class="eyebrow">02 / PROBLEM & EVIDENCE</div><h2>需求与原流程</h2><p>${e(p.problem)}</p>${gap('待补 · 需求来源','原始需求记录、业务沟通摘要或流程图。没有原始记录的内容可按回忆整理，并注明来源。')}</section>
    <section class="case-section" id="decisions"><div class="eyebrow">03 / PRODUCT DECISIONS</div><h2>关键产品判断</h2>${p.decisions.map((d,i) => `<div class="decision"><span>0${i+1}</span><p>${e(d)}</p></div>`).join('')}</section>
    <section class="case-section" id="showcase"><div class="eyebrow">04 / WORKFLOW & INTERFACE</div><h2>流程与界面</h2><div class="flow">${p.flow.map((f,i) => `<div class="flow-step"><small>STEP ${String(i+1).padStart(2,'0')}</small>${e(f)}</div>`).join('')}</div>${image(p)}${gap('待补 · 关键操作','补充能够串起这条流程的 3–5 个页面，或一段短演示。已有截图由我们筛选，无需重新制作。')}</section>
    <section class="case-section" id="implementation"><div class="eyebrow">05 / IMPLEMENTATION & COLLABORATION</div><h2>实现与协作</h2><p>${e(p.implementation)}</p></section>
    <section class="case-section" id="result"><div class="eyebrow">06 / OUTCOME & REFLECTION</div><h2>当前结果与边界</h2><p>${e(p.outcome)}</p>${gap('待补 · 复盘','补充一次实际修改或协作经历：发生了什么、你作了什么判断、结果怎样。尚无业务效果数据的部分保留为待验证。')}</section>
    <section class="case-section" id="missing"><div class="eyebrow">07 / CONTENT TO ADD</div><h2>这个案例还需要什么</h2><ul class="gap-list">${p.gaps.map(g => `<li>${e(g)}</li>`).join('')}</ul><div class="actions" style="margin-top:25px"><a class="button" href="#materials">查看完整补充清单</a><a class="button" href="#projects">返回项目列表</a></div></section>
    </div></div>`;
  }
  function resume() {
    return `<section class="page-heading"><div class="eyebrow">RESUME / WORKING DRAFT</div><h1>师嘉文</h1><p>${e(data.roles)}<br>北京 · 本科 / 工业设计 · ${e(data.phone)}</p><div class="actions no-print"><button class="button primary" id="print-resume" type="button">打印 / 保存 PDF</button><a class="button" href="#home">返回作品集</a></div></section><div class="resume-layout"><div>
    <section class="resume-section"><h2>个人简介</h2><p>具有电商视觉与 AIGC 商业内容制作经历，参与客户需求沟通、方案调整与交付。长期实践多模态生成、ComfyUI、Agent 和自动化工具。</p><p>自主组织 200+ 人北京 AI 线下交流社群，通过交流接触业务需求。推进过产品方案、业务流程与前端原型设计，借助 AI 编程工具开展实现与验证。</p></section>
    <section class="resume-section"><h2>工作经历</h2>${timeline()}</section>
    <section class="resume-section"><h2>产品项目</h2>${data.projects.map(p => `<article style="margin-bottom:25px"><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="caption">${e(p.role)} · ${e(p.stage)}</p><p>${e(p.summary)}</p></article>`).join('')}</section>
    <section class="resume-section"><h2>社群与行业实践</h2><h3>北京 AI 线下交流社群 · 组织者</h3><p>自主组织 Coffee Chat 等线下交流，社群覆盖 200+ 人，主题包含企业 AI 应用、Agent、工作流及产品设计。</p></section>
    <section class="resume-section"><h2>教育与荣誉</h2><h3>华北理工大学轻工学院</h3><p>本科 · 工业设计 · 2020 年毕业</p><h3>全国三维数字化创新大赛（龙鼎奖）</h3><p>2018–2019 年河北赛区一等奖</p></section>
    </div><aside class="resume-aside"><div class="eyebrow">TOOLS & PRACTICE</div>${data.skills.map(s => `<div class="skill-group"><strong>${e(s[0])}</strong><p>${e(s[1])}</p></div>`).join('')}${gap('待核实','工作起止时间、约 4 年经验的计算口径、法律 OCR/LLM 测试归属，以及 PM OS 最新阶段。') }<p class="caption">这份网页简历按当前已对齐信息整理；最终投递版随材料更新。</p></aside></div>`;
  }
  function materials() {
    const groups = [
      {name:'个人信息与经历',text:'首页和简历使用。',gaps:['邮箱及最终投递版简历','中科趋势与科莱奥达任职起止月份、时间重叠说明','主要求职方向与可公开联系方式确认']},
      {name:'AIGC 商业作品',text:'展示已有商业实践，不需要补造效果指标。',gaps:['可公开的图片、视频或项目链接所在位置','每个作品中你实际负责的镜头、制作或沟通环节','一例工作流、版本修改或客户交付过程']},
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
    else if(raw !== 'home' && raw !== 'main') section=raw;
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
      document.title=(view.startsWith('case-') ? data.projects.find(x=>x.id===view.slice(5)).name : view==='resume'?'个人简历':view==='materials'?'内容补充清单':'AIGC / AI 产品作品集')+' · 师嘉文';
    }
    requestAnimationFrame(()=> {
      const target=section && document.getElementById(section);
      if(target) target.scrollIntoView({behavior:'auto',block:'start'});
      else if(changed) {window.scrollTo(0,0);main.focus({preventScroll:true});}
    });
  }
  const dialog=document.getElementById('image-dialog');
  document.addEventListener('click',event=> {
    const button=event.target.closest('[data-image]');
    if(button) {
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
