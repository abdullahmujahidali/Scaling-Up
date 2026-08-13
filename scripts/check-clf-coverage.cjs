#!/usr/bin/env node
/**
 * CLF-C02 coverage checker.
 *
 * Answers one question honestly: what does the CLF track actually cover?
 *
 * Written 2026-08-12 after a claim of "all 112 services, verified by script"
 * turned out to be wrong in three ways — the list has 127 services, no script
 * existed, and 18 services were missing. Rule since: no coverage claim without
 * a script that reproduces it. See learning-records/0011.
 *
 * Sources of truth:
 *   scripts/clf-inscope-services.txt — Appendix A of the official CLF-C02
 *     exam guide, extracted verbatim. Re-extract if AWS revises the guide.
 *   CONCEPTS below — topics the exam tests that are not service names.
 *
 * Usage: npm run check:clf   (or: node scripts/check-clf-coverage.cjs aif)
 */
const fs = require('fs');
const path = require('path');

const CERT = (process.argv[2] || 'clf').toLowerCase();
if (!['clf', 'aif'].includes(CERT)) {
  console.error(`Unknown cert "${CERT}". Use clf or aif.`);
  process.exit(1);
}
const ROOT = path.join(__dirname, '..');
const LESSON_DIR = path.join(ROOT, 'src/content-html/lessons');
const REF_DIR = path.join(ROOT, 'src/content-html/reference');
const QUIZ_DIR = path.join(ROOT, 'exams/questions');

const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function readAll(dir, filter) {
  if (!fs.existsSync(dir)) return '';
  return fs.readdirSync(dir).filter(filter)
    .map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
}

// Strip HTML tags so a tag boundary can never split a phrase and fake a miss.
const strip = s => s.replace(/<[^>]+>/g, ' ');

const matchesCert = f => f.includes(CERT);
const lessons = norm(strip(
  readAll(LESSON_DIR, f => matchesCert(f) && f.endsWith('.html')) +
  readAll(REF_DIR, f => matchesCert(f) && f.endsWith('.html'))
));
const quizzes = norm(readAll(QUIZ_DIR, f => f.startsWith(CERT + '-') && f.endsWith('.json')));

/** Aliases so "AWS Key Management Service (AWS KMS)" matches a lesson saying "KMS". */
function aliases(svc) {
  const m = svc.match(/^(.*?)\s*\((.*?)\)\s*$/);
  const base = m ? [m[1], m[2]] : [svc];
  const out = [];
  for (const b of base) {
    out.push(b, b.replace(/^(AWS|Amazon)\s+/, ''));
  }
  return [...new Set(out)].filter(k => norm(k).length > 2);
}

const services = fs.readFileSync(path.join(__dirname, `${CERT}-inscope-services.txt`), 'utf8')
  .split('\n').map(s => s.trim()).filter(Boolean);

// Concepts each exam tests that are not service names. Each needs ONE variant present.
const CONCEPTS_BY_CERT = {};
CONCEPTS_BY_CERT.clf = {
  'IaaS / PaaS / SaaS': ['IaaS', 'Infrastructure as a Service'],
  'Deployment models (private/hybrid)': ['private cloud', 'hybrid cloud'],
  '5 characteristics of cloud': ['on-demand self-service', 'rapid elasticity', 'resource pooling'],
  'Vertical vs horizontal scaling': ['horizontal scaling', 'scale out'],
  'ELB types (ALB/NLB/GWLB)': ['Application Load Balancer', 'Network Load Balancer'],
  'S3 replication (CRR/SRR)': ['Cross-Region Replication', 'CRR'],
  'RDS read replicas': ['read replica'],
  'DynamoDB DAX / Global Tables': ['DAX', 'Global Table'],
  'Aurora Serverless': ['Aurora Serverless'],
  'SQS FIFO vs standard': ['FIFO'],
  'Decoupling': ['decouple', 'decoupling'],
  'CloudWatch metrics/alarms/logs': ['CloudWatch alarm', 'CloudWatch Logs', 'billing alarm'],
  'VPC Flow Logs / Peering / Endpoints': ['Flow Logs', 'VPC Peering', 'VPC endpoint'],
  'Route 53 routing policies': ['routing policy', 'latency-based routing', 'failover routing'],
  '7 Rs of migration': ['7 Rs', 'rehost', 'replatform'],
  'Disaster recovery strategies': ['pilot light', 'warm standby'],
  'Penetration testing policy': ['penetration test'],
  'IAM credentials report / access advisor': ['credentials report', 'access advisor'],
  'IAM password policy': ['password policy'],
  'Service Control Policies (SCP)': ['Service Control Polic'],
  'Cost Anomaly Detection': ['Cost Anomaly'],
  'Well-Architected 6 pillars': ['Operational Excellence', 'Sustainability'],
};

// AIF-C01: the vocabulary and mechanics the exam tests beyond service names.
CONCEPTS_BY_CERT.aif = {
  'Supervised vs unsupervised learning': ['supervised learning', 'unsupervised'],
  'Reinforcement learning': ['reinforcement learning'],
  'Training vs inference': ['inference'],
  'Neural networks / deep learning': ['deep learning', 'neural network'],
  'Foundation model': ['foundation model'],
  'Large language model (LLM)': ['large language model', 'LLM'],
  'Tokens': ['token'],
  'Embeddings / vectors': ['embedding'],
  'Transformer architecture': ['transformer'],
  'Multimodal models': ['multimodal'],
  'Diffusion models': ['diffusion'],
  'Prompt engineering': ['prompt engineering'],
  'Zero-shot / few-shot prompting': ['few-shot', 'zero-shot'],
  'Chain-of-thought': ['chain-of-thought', 'chain of thought'],
  'Prompt injection / jailbreak': ['prompt injection', 'jailbreak'],
  'Temperature / top-p': ['temperature', 'top-p'],
  'Context window': ['context window'],
  'RAG (retrieval augmented generation)': ['retrieval', 'RAG'],
  'Vector database': ['vector database', 'vector store'],
  'Fine-tuning': ['fine-tun'],
  'Continued pre-training': ['pre-training', 'pretraining'],
  'Hallucination': ['hallucinat'],
  'Overfitting / underfitting': ['overfitting', 'underfitting'],
  'Bias and fairness': ['bias', 'fairness'],
  'Explainability / interpretability': ['explainab', 'interpretab'],
  'Transparency (model cards)': ['model card', 'transparency'],
  'Human-in-the-loop': ['human-in-the-loop', 'human in the loop'],
  'Responsible AI': ['responsible AI'],
  'Guardrails': ['guardrail'],
  'Model evaluation metrics': ['BLEU', 'ROUGE', 'F1', 'accuracy'],
  'Benchmarking / human evaluation': ['benchmark', 'human evaluation'],
  'Confusion matrix / precision / recall': ['precision', 'recall'],
  'ROI / cost of inference': ['cost of inference', 'token cost', 'cost'],
  'Agents': ['agent'],
  'Knowledge Bases (Bedrock)': ['knowledge base'],
  'Data governance / lineage': ['governance', 'lineage'],
  'Shared responsibility model': ['shared responsibility'],
  'Encryption at rest / in transit': ['at rest', 'in transit'],
  'Least privilege / IAM roles': ['least privilege', 'IAM role'],
};

const CONCEPTS = CONCEPTS_BY_CERT[CERT];

function classify(keys) {
  if (keys.some(k => lessons.includes(norm(k)))) return 'taught';
  if (keys.some(k => quizzes.includes(norm(k)))) return 'quizOnly';
  return 'absent';
}

/** Taught but never asked about: the learner reads it and is never made to recall it. */
const untested = keys => !keys.some(k => quizzes.includes(norm(k)));

const svcResult = { taught: [], quizOnly: [], absent: [], untested: [] };
for (const s of services) {
  svcResult[classify(aliases(s))].push(s);
  if (untested(aliases(s))) svcResult.untested.push(s);
}

const conResult = { taught: [], quizOnly: [], absent: [], untested: [] };
for (const [name, keys] of Object.entries(CONCEPTS)) {
  conResult[classify(keys)].push(name);
  if (untested(keys)) conResult.untested.push(name);
}

const pct = (n, d) => ((n / d) * 100).toFixed(0);
const line = '─'.repeat(64);

const CERT_LABEL = { clf: 'CLF-C02', aif: 'AIF-C01' }[CERT];
console.log(`\n${line}\n${CERT_LABEL} COVERAGE — generated by scripts/check-clf-coverage.cjs\n${line}`);
console.log(`\nSERVICES (official in-scope list, ${services.length} total)`);
console.log(`  taught in lessons : ${svcResult.taught.length}  (${pct(svcResult.taught.length, services.length)}%)`);
console.log(`  quiz-only         : ${svcResult.quizOnly.length}`);
console.log(`  ABSENT            : ${svcResult.absent.length}`);
if (svcResult.absent.length) console.log('    ✗ ' + svcResult.absent.join('\n    ✗ '));
if (svcResult.quizOnly.length) console.log('    ~ (tested, never taught) ' + svcResult.quizOnly.join(', '));

const conTotal = Object.keys(CONCEPTS).length;
console.log(`\nCONCEPTS (${conTotal} total)`);
console.log(`  taught            : ${conResult.taught.length}  (${pct(conResult.taught.length, conTotal)}%)`);
console.log(`  quiz-only         : ${conResult.quizOnly.length}`);
console.log(`  ABSENT            : ${conResult.absent.length}`);
if (conResult.absent.length) console.log('    ✗ ' + conResult.absent.join('\n    ✗ '));
if (conResult.quizOnly.length) console.log('    ~ (tested, never taught) ' + conResult.quizOnly.join(', '));

console.log(`\nRETRIEVAL (concepts taught but never asked in any quiz)`);
console.log(`  drilled           : ${conTotal - conResult.untested.length}/${conTotal}`);
if (conResult.untested.length) console.log('    ! ' + conResult.untested.join('\n    ! '));

const gaps = svcResult.absent.length + conResult.absent.length + conResult.untested.length;
console.log(`\n${line}`);
console.log(gaps === 0
  ? 'RESULT: no gaps. Every in-scope service and concept is taught AND drilled.'
  : `RESULT: ${gaps} gap(s) — ${svcResult.absent.length} service(s) untaught, ` +
    `${conResult.absent.length} concept(s) untaught, ${conResult.untested.length} concept(s) never quizzed.`);
console.log(`${line}\n`);
