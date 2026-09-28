import React, {useEffect, useRef, useState} from 'react';
import './enhancements.css';

const achievements = [
  ['4–5', 'Engineers guided', 'Provided architectural leadership, design reviews and technical mentoring at Omnicell.'],
  ['5', 'Financial domains connected', 'Delivered batch and real-time pipelines for payments, transfers, accounts, merchants and risk feeds at NICE.'],
  ['6', 'Infrastructure domains standardized', 'Created reusable Terraform modules covering networking, EKS, IAM, KMS, databases and load balancing.'],
  ['8+', 'Business entities modeled', 'Designed reusable dimensional models for financial and operational reporting at PBG.'],
];

export function Achievements() {
  return <section id="achievements" className="section reveal achievement-section">
    <p className="eyebrow">KEY ACHIEVEMENTS / DELIVERY & LEADERSHIP</p>
    <h2>Architecture that moves<br/><span>teams and platforms forward.</span></h2>
    <div className="achievement-grid">{achievements.map(([number, title, body], i) =>
      <article className="achievement-card" key={title} style={{'--delay': `${i * 90}ms`}}>
        <span className="achievement-index">0{i + 1}</span><strong>{number}</strong>
        <h3>{title}</h3><p>{body}</p>
      </article>)}</div>
    <p className="diagram-note">Scope and leadership figures reported in the résumé.</p>
  </section>;
}

const stages = [
  {name:'Capture', detail:'Capture source changes as events so consumers can receive incremental updates.', tool:'Debezium / Kafka Connect'},
  {name:'Stream', detail:'Decouple producers and consumers with an event log that supports replay.', tool:'Apache Kafka'},
  {name:'Validate', detail:'Apply schema and quality checks. Route malformed events for investigation and recovery.', tool:'Flink / Spark'},
  {name:'Publish', detail:'Deliver trusted data to governed consumption layers and downstream applications.', tool:'Delta Lake / Snowflake'},
];
const scenarios = {
  normal: {label:'Valid event', text:'A valid change passes validation and reaches the consumption layer.', route:'Validated event → governed delivery', color:'#a3edc3'},
  quarantine: {label:'Malformed event', text:'A malformed event is routed to a dead-letter queue for investigation rather than entering trusted data.', route:'Validation failure → quarantine', color:'#ffc47e'},
  replay: {label:'Recover & replay', text:'After correction, replay returns the event to validation. Idempotent processing protects downstream state.', route:'Corrected event → replay → validation', color:'#9dbfff'},
};

export function ArchitectureLab() {
  const [selected, setSelected] = useState(0);
  const [scenario, setScenario] = useState('normal');
  const state = scenarios[scenario];
  return <section id="architecture-lab" className="section reveal architecture-lab">
    <div className="section-heading project-heading"><div><p className="eyebrow">ARCHITECTURE EXPLORER</p><h2>Follow the event.<br/><span>Understand the system.</span></h2></div>
    <p>Explore delivery, quarantine and recovery.<br/>An illustrative model of real-time integration.</p></div>
    <div className="lab-surface" style={{'--signal':state.color}}>
      <div className="lab-toolbar"><span className="lab-label">INTERACTIVE ARCHITECTURE / SIMULATION</span><div className="scenario-controls" role="group" aria-label="Event scenario">{Object.entries(scenarios).map(([key, value])=><button key={key} aria-pressed={scenario===key} onClick={()=>setScenario(key)}>{value.label}</button>)}</div></div>
      <p className="blueprint-hint">Swipe or scroll horizontally to explore the full diagram.</p>
      <div className="blueprint" role="region" aria-label="Scrollable architecture diagram" tabIndex={0}>
        <svg className={'pipeline-svg scenario-'+scenario} viewBox="0 0 1000 320" role="img" aria-labelledby="pipeline-title pipeline-desc">
          <title id="pipeline-title">Event-driven integration and recovery architecture</title><desc id="pipeline-desc">Sources connect to Kafka, validation and governed delivery. Failed validation routes to a dead-letter queue, then replay returns corrected events to validation. This is a simulation, not a live system.</desc>
          <defs><pattern id="blueprint-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="#a3edc3" strokeOpacity=".07"/></pattern></defs>
          <rect width="1000" height="320" fill="url(#blueprint-grid)"/>
          <g className="pipeline-links" fill="none"><path d="M200 100H285M425 100H510M650 100H735"/><path d="M580 140V225H735"/><path d="M815 225H920V175H610V140"/></g>
          <path className="signal signal-main" d="M200 100H580" fill="none"/>
          <path className={'signal '+(scenario==='normal'?'':'signal-hidden')} d="M580 100H735" fill="none"/>
          <path className={'signal '+(scenario==='quarantine'?'':'signal-hidden')} d="M580 100V225H735" fill="none"/>
          <path className={'signal '+(scenario==='replay'?'':'signal-hidden')} d="M815 225H920V175H610V100H735" fill="none"/>
          {[['Sources','DB / API / SaaS',60],['Event log','Apache Kafka',285],['Validation','Flink / Spark',510],['Consumption','Delta / Snowflake',735]].map(([name, sub, x],i)=><g key={name} className={selected===i?'svg-node selected-node':'svg-node'}><rect x={x} y="60" width="140" height="80" rx="6"/><text x={x+70} y="94" textAnchor="middle">{name}</text><text className="svg-sub" x={x+70} y="117" textAnchor="middle">{sub}</text></g>)}
          <g className="svg-node recovery-node"><rect x="735" y="198" width="145" height="54" rx="6"/><text x="807" y="230" textAnchor="middle">Dead-letter queue</text></g>
          <text className="svg-caption" x="600" y="213">QUARANTINE</text><text className="svg-caption" x="695" y="167">CORRECT & REPLAY</text>
          <text className="svg-caption" x="60" y="295">OBSERVABILITY: LAG · LATENCY · FRESHNESS · FAILED EVENTS · SCHEMA DRIFT</text>
        </svg>
      </div>
      <div className="stage-controls" role="group" aria-label="Inspect pipeline stage">{stages.map((stage,i)=><button key={stage.name} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span>0{i+1}</span>{stage.name}<span aria-hidden="true">↗</span></button>)}</div>
      <div className="stage-detail" aria-live="polite"><div><span className="eyebrow">{stages[selected].tool}</span><h3>{stages[selected].name}</h3><p>{stages[selected].detail}</p></div><div className="event-explanation"><span className="event-route">{state.route}</span><p>{state.text}</p></div></div>
      <div className="lab-footer">Illustrative reference architecture based on résumé-described streaming controls. No production connection or operational metrics.</div>
    </div>
  </section>;
}

const moreProjects = [
  {title:'Cloud Platform Modernization', label:'RÉSUMÉ EXPERIENCE / BANNER HEALTH', description:'Containerized an AWS platform on EKS and standardized infrastructure and release workflows.', steps:['Terraform modules','EKS / Helm','CI/CD delivery'], detail:'Reusable infrastructure across six domains and five delivery stages: testing, security scanning, Terraform validation, approval and deployment. Rolling/canary strategies, health checks and automated rollback supported release consistency.', scope:'Résumé-based case study', concept:false},
  {title:'Financial Data Reliability & Reconciliation', label:'RÉSUMÉ EXPERIENCE / NICE & PBG', description:'Built quality, reconciliation and historical modeling controls for trusted financial reporting.', steps:['Source validation','Reconciliation','Trusted reporting'], detail:'NICE work covered transaction counts, monetary totals, duplicates, rejected records and schema changes. PBG work reconciled payment processors, internal transactions, settlements and the general ledger. These are related practices across two roles, not a single shared deployment.', scope:'Résumé-based practice overview', concept:false},
  {title:'Cloud Cost Intelligence', label:'CONCEPT PROJECT / PROPOSED DESIGN', description:'A proposed portfolio build for understanding cost by team, workload and data product.', steps:['Synthetic billing','Cost allocation','Review dashboard'], detail:'Suggested implementation: generate synthetic billing records, model allocation rules in SQL/dbt, and build a dashboard for budget variance and idle-resource review. Evaluate reconciliation accuracy and explainability before claiming any savings.', scope:'Design idea · not implemented', concept:true},
  {title:'Data Contract Reliability Lab', label:'CONCEPT PROJECT / PROPOSED DESIGN', description:'A proposed sandbox for showing how a platform handles breaking schemas and late events.', steps:['Synthetic events','Contract checks','Replay tests'], detail:'Suggested implementation: emit synthetic Kafka events, inject schema changes and duplicates, then verify quarantine, replay and idempotency. Publish reproducible test cases and observed results after implementation.', scope:'Design idea · not implemented', concept:true},
];

export function MoreProjects() {
  const [filter,setFilter]=useState('all');
  return <section id="more-projects" className="section reveal more-projects"><p className="eyebrow">MORE WORK / NEW DIRECTIONS</p><h2>Deeper foundations.<br/><span>Further possibilities.</span></h2>
    <div className="project-filters" role="group" aria-label="Filter additional projects">{[['all','All'],['experience','Résumé-based'],['concept','Concept projects']].map(([key,label])=><button key={key} aria-pressed={filter===key} onClick={()=>setFilter(key)}>{label}</button>)}</div>
    <div className="additional-grid">{moreProjects.filter(p=>filter==='all'||p.concept===(filter==='concept')).map(p=><article key={p.title} className={'additional-card '+(p.concept?'concept-card':'')}><p className="eyebrow">{p.label}</p><h3>{p.title}</h3><p>{p.description}</p><ol className="mini-blueprint" aria-label="Architecture stages">{p.steps.map((step,i)=><li key={step}><span>0{i+1}</span>{step}</li>)}</ol><details><summary>{p.concept?'Read proposed design':'Read architecture notes'} <span aria-hidden="true">+</span></summary><p>{p.detail}</p></details><span className="project-status">{p.scope}</span></article>)}</div>
  </section>;
}

// A bounded decorative network: no timers, canvas or live data feeds.
export function NetworkBackdrop() {
  return <div className="network-backdrop" aria-hidden="true"><svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor"><path d="M0 160L220 270L420 120L740 300L980 130L1440 310M0 560L220 270L520 590L740 300L1110 620L1440 310M420 120L520 590L980 130L1110 620"/></g>{[[220,270],[420,120],[740,300],[980,130],[520,590],[1110,620]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" style={{animationDelay:`-${i}s`}}/>)}</svg></div>;
}

export function useEnhancedMotion(paused) {
  const frame=useRef(0);
  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    if(paused||media.matches)return;
    const cards=[...document.querySelectorAll('.project,.achievement-card,.additional-card')];
    const observers=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('in-view',entry.isIntersecting)),{threshold:.08});
    cards.forEach(card=>observers.observe(card));
    const onMove=event=>{
      if(event.pointerType!=='mouse'||!matchMedia('(hover: hover)').matches)return;
      const card=event.currentTarget;const bounds=card.getBoundingClientRect();
      const x=(event.clientX-bounds.left)/bounds.width;const y=(event.clientY-bounds.top)/bounds.height;
      cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(()=>{card.style.setProperty('--rx',`${(0.5-y)*4}deg`);card.style.setProperty('--ry',`${(x-0.5)*4}deg`);card.style.setProperty('--mx',`${x*100}%`);card.style.setProperty('--my',`${y*100}%`)});
    };
    const reset=event=>{cancelAnimationFrame(frame.current);event.currentTarget.style.setProperty('--rx','0deg');event.currentTarget.style.setProperty('--ry','0deg')};
    cards.forEach(card=>{card.addEventListener('pointermove',onMove);card.addEventListener('pointerleave',reset)});
    return()=>{observers.disconnect();cancelAnimationFrame(frame.current);cards.forEach(card=>{card.removeEventListener('pointermove',onMove);card.removeEventListener('pointerleave',reset);card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')})};
  },[paused]);
}
