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
  function timeline() {
    return data.work.map(w => `<article class="timeline-item"><time>${e(w.time)}</time><div><h3>${e(w.company)} · ${e(w.role)}</h3><p>${e(w.text)}</p></div></article>`).join('');
  }
  function home() {
    return `<section class="hero" id="home"><div><div class="eyebrow">JIAWEN SHI / AI NATIVE · AIGC</div><h1>从业务目标出发，<br>设计可执行的<br><em>AI 产品与流程。</em></h1><p class="hero-intro">我是师嘉文。${e(data.introduction)}</p><div class="actions"><a class="button primary" href="#projects">查看重点案例</a><a class="button" href="#resume">查看个人简历</a></div><p class="hero-meta">北京 · ${e(data.experience)} · 工业设计本科</p></div><aside class="capabilities"><div class="small-heading"><span>CORE CAPABILITIES</span><span>03</span></div><div class="capability"><span class="num">01</span><div><h3>需求分析与方案定义</h3><p>拆解业务诉求，梳理角色、任务与流程，明确产品目标和首版范围。</p></div></div><div class="capability"><span class="num">02</span><div><h3>AI Native 工作流设计</h3><p>将方法论与任务沉淀为模块，通过阶段目标、人工对齐与反馈组织 Agent 工作。</p></div></div><div class="capability"><span class="num">03</span><div><h3>原型推进与技术协作</h3><p>通过可操作原型表达产品方案，梳理字段、状态与交互要求，推进技术对接。</p></div></div></aside></section>
    <section class="section" id="projects"><div class="section-heading"><div><div class="eyebrow">SELECTED WORK / 01 — 05</div><h2>围绕业务问题，展示产品决策。</h2></div><p>五个案例展示业务目标、产品取舍、关键流程与个人职责。配有可操作的示例演示，阶段产出与验证计划见各案例。</p></div><div class="interview-entry"><div><strong>先看内容运营方案</strong><p>76 秒体验资料输入、草稿审核与策略确认的任务流程。</p></div><a class="button" href="#case-evocontent/video">观看内容平台视频</a></div><div class="project-list">${data.projects.slice(0,4).map(card).join('')}</div><div class="support-grid">${data.projects.slice(4).map(p => `<article class="support-card"><div class="project-top">${e(p.number)} / ${e(p.category)}</div><h3><a href="${link(p)}">${e(p.name)}</a></h3><p>${e(p.statement)}</p><span class="project-stage">${e(p.stage)}</span><p class="project-evidence">${e(p.evidence)}</p><p style="margin-top:18px"><a class="text-link" href="${link(p)}">阅读项目案例</a></p>${externalLinks(p)}</article>`).join('')}</div></section>
    <section class="section" id="practice"><div class="practice-layout"><div><div class="eyebrow">AIGC / PRODUCTION & DELIVERY</div><h2>从真实内容交付，<br>理解生成式 AI。</h2><p class="practice-copy">在中科趋势承担商业 AIGC 项目的需求对接、制作与交付。不同项目中的独立制作、牵头协作和参与贡献分别说明，作品链接将继续补充。</p><div class="practice-tags"><span>图像与视频</span><span>ComfyUI 工作流</span><span>模型选择</span><span>版本迭代</span></div>${gap('待补 · 作品链接','个人贡献已补充。待加入可展示的短片、图片与制作过程样例。')}</div><div class="production-list">${data.aigc.map((a,i) => `<div class="production-row"><div><strong>${String(i+1).padStart(2,'0')} · ${e(a.name)}</strong><p class="caption">${e(a.contribution)}</p></div><span>链接待补</span></div>`).join('')}<p class="caption">个人贡献依据项目回忆整理，完整作品链接待补充。</p></div></div></section>
    <section class="section"><div class="eyebrow">HOW I WORK</div><h2>从需求到验证，明确每一步的判断。</h2><div class="method-grid">${[['明确业务目标','梳理需求提出者、工作任务和当前问题，区分效率目标与效果目标。'],['定义产品范围','确定首版要完成的任务，说明输入、产出、约束与功能优先级。'],['设计关键流程','把 AI 处理、人工确认和异常处理落实到状态、字段与交互。'],['规划验证方法','用原型沟通方案，列出下一步要验证的问题、方法与所需材料。']].map((v,i) => `<div class="method-item"><span>0${i+1}</span><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('')}</div></section>
    <section class="section" id="about"><div class="section-heading"><div><div class="eyebrow">EXPERIENCE / COMMUNITY</div><h2>商业交付经验与业务需求接触。</h2></div><p>电商视觉、商业 AIGC 交付，以及自主组织的北京 AI 线下交流。</p></div><div class="about-grid"><div>${timeline()}<p class="caption">任职月份依据个人回忆整理。电商阶段建立的地毯渲染与图像处理方法，仍被原团队使用。</p></div><aside class="community"><div class="eyebrow">BEIJING AI COMMUNITY</div><h3>${e(data.community.name)}</h3><div class="community-number">200+</div><p>群成员 · ${e(data.community.started)}</p><p>${e(data.community.summary)}</p><p>${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">查看社群公开活动</a></aside></div></section>
    <section class="section" id="contact"><div class="contact-layout"><div><div class="eyebrow">LET'S CONNECT</div><h2>聊聊 AI 产品与业务场景。</h2><p>${e(data.roles)}</p></div><div><div class="actions"><a class="button primary" href="#resume">查看简历</a><a class="button" href="tel:${e(data.phone)}">${e(data.phone)}</a><a class="button" href="mailto:${e(data.email)}">${e(data.email)}</a></div><p class="caption">GitHub：JIA-WEN-SHI。</p></div></div></section>`;
  }
  function casePage(p) {
    return `<section class="detail-hero"><div class="breadcrumb"><a href="#projects">全部项目</a> / ${e(p.name)}</div><div class="eyebrow">CASE ${e(p.number)} / ${e(p.en)}</div><h1>${e(p.name)}</h1><p class="detail-subtitle">${e(p.statement)}</p><div class="facts"><div class="fact"><small>当前阶段</small><p>${e(p.stage)}</p></div><div class="fact"><small>我的角色</small><p>${e(p.role)}</p></div></div><p class="project-evidence">${e(p.evidence)}</p>${externalLinks(p)}<p class="caption">${e(p.demoScope)}</p></section>${video(p)}<div class="case-grid"><nav class="case-nav" aria-label="案例目录">${p.video ? `<a href="#case-${p.id}/video">方案演示视频</a>` : ''}${[['overview','项目定位与目标'],['problem','业务问题与需求依据'],['decisions','关键产品决策'],['showcase','核心流程与交互'],['implementation','我的职责与协作'],['result','阶段产出与验证计划'],['missing','补充材料']].map((s,i) => `<a href="#case-${p.id}/${s[0]}">${String(i+1).padStart(2,'0')} · ${s[1]}</a>`).join('')}</nav><div>
    <section class="case-section" id="overview"><div class="eyebrow">01 / OVERVIEW</div><h2>项目定位与目标</h2><p>${e(p.summary)}</p>${demoGuide(p)}</section>
    <section class="case-section" id="problem"><div class="eyebrow">02 / PROBLEM & EVIDENCE</div><h2>业务问题与需求依据</h2><p>${e(p.problem)}</p></section>
    <section class="case-section" id="decisions"><div class="eyebrow">03 / PRODUCT DECISIONS</div><h2>关键产品决策</h2>${p.decisions.map((d,i) => `<div class="decision"><span>0${i+1}</span><p>${e(d)}</p></div>`).join('')}</section>
    <section class="case-section" id="showcase"><div class="eyebrow">04 / WORKFLOW & INTERFACE</div><h2>核心流程与交互</h2><div class="flow">${p.flow.map((f,i) => `<div class="flow-step"><small>STEP ${String(i+1).padStart(2,'0')}</small>${e(f)}</div>`).join('')}</div>${image(p)}</section>
    <section class="case-section" id="implementation"><div class="eyebrow">05 / IMPLEMENTATION & COLLABORATION</div><h2>我的职责与协作</h2><p>${e(p.implementation)}</p></section>
    <section class="case-section" id="result"><div class="eyebrow">06 / OUTCOME & VALIDATION</div><h2>阶段产出与验证计划</h2><p>${e(p.outcome)}</p><div class="validation-plan"><h3>下一步怎样验证</h3><p class="caption">以下是拟议的验证方法，尚未形成真实用户验证结果。</p><ul>${p.validationPlan.map(v => `<li>${e(v)}</li>`).join('')}</ul></div></section>
    <section class="case-section" id="missing"><div class="eyebrow">07 / CONTENT TO ADD</div><h2>补充案例依据</h2><ul class="gap-list">${p.gaps.map(g => `<li>${e(g)}</li>`).join('')}</ul><div class="actions" style="margin-top:25px"><a class="button" href="#materials">查看完整补充清单</a><a class="button" href="#projects">返回项目列表</a></div></section>
    </div></div>`;
  }
  function resume() {
    return `<section class="page-heading"><div class="eyebrow">RESUME / WORKING DRAFT</div><h1>师嘉文</h1><p>${e(data.roles)}<br>北京 · ${e(data.experience)} · 本科 / 工业设计 · ${e(data.phone)}<br><a href="mailto:${e(data.email)}">${e(data.email)}</a></p><div class="actions no-print"><button class="button primary" id="print-resume" type="button">打印 / 保存 PDF</button><a class="button" href="#home">返回作品集</a></div></section><div class="resume-layout"><div>
    <section class="resume-section"><h2>个人简介</h2><p>${e(data.introduction)}</p><p>自主组织 200+ 人北京 AI 线下交流社群，通过行业交流接触业务诉求，推进方案沟通与项目合作。持续实践多模态生成、Agent 与工作流工具。</p></section>
    <section class="resume-section"><h2>工作经历</h2>${timeline()}<p>在天津武清地毯电商相关工作中建立渲染与图像处理流程，相关方法仍被原团队使用。</p></section><section class="resume-section"><h2>AIGC 代表作品与个人贡献</h2>${data.aigc.map(a => `<article style="margin-bottom:20px"><h3>${e(a.name)}</h3><p>${e(a.contribution)}</p></article>`).join('')}</section>
    <section class="resume-section"><h2>产品项目</h2>${data.projects.map(p => `<article style="margin-bottom:25px"><h3><a href="${link(p)}">${e(p.name)}</a></h3><p class="caption">${e(p.role)} · ${e(p.stage)}</p><p>${e(p.summary)}</p></article>`).join('')}</section>
    <section class="resume-section"><h2>社群与行业实践</h2><h3>${e(data.community.name)} · 组织者</h3><p>${e(data.community.started)}。${e(data.community.summary)}${e(data.community.practice)}</p><a class="text-link" href="${e(data.community.url)}" target="_blank" rel="noopener noreferrer">社群公开活动记录</a></section>
    <section class="resume-section"><h2>教育与荣誉</h2><h3>华北理工大学轻工学院</h3><p>本科 · 工业设计 · 2020 年毕业</p><h3>全国三维数字化创新大赛（龙鼎奖）</h3><p>2018–2019 年河北赛区一等奖</p></section>
    </div><aside class="resume-aside"><div class="eyebrow">PRODUCT CAPABILITIES & PRACTICE</div>${data.skills.map(s => `<div class="skill-group"><strong>${e(s[0])}</strong><p>${e(s[1])}</p></div>`).join('')}${gap('待补材料','代表作品链接、真实输入输出样例、项目时间线及关键决策的过程记录。') }<p class="caption">这份网页简历按当前已对齐信息整理；最终投递版随材料更新。</p></aside></div>`;
  }
  function materials() {
    const groups = [
      {name:'个人信息与经历',text:'求职方向、邮箱与主要任职月份已补充。',gaps:['地毯渲染流程与原团队持续复用的具体材料','遗漏电商公司的名称与时间（想起后可选补充）','最终投递版简历与短版面试 PDF']},
      {name:'AIGC 作品与交付',text:'六项作品的个人贡献已补充，等待作品链接。',gaps:['短片、图片或公开链接所在位置','一例模型选择、工作流、版本修改或客户交付过程','每项作品的项目时间与可展示版本']},
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
