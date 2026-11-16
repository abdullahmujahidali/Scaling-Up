#!/usr/bin/env node
/**
 * AIF-C01 coverage checker against the CURRENT official exam guide.
 *
 * Source of truth: AWS Certified AI Practitioner Exam Guide (AIF-C01) v1.2,
 * published 2026-10-29 at
 * https://docs.aws.amazon.com/pdfs/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf
 * v1.2 only removed retired services from the out-of-scope list, so its
 * objectives match v1.1 (2026-04-30), which is what the exam tests in Nov 2026.
 * Re-extract the lists below whenever AWS publishes a new version.
 *
 * It answers three questions, each re-runnable:
 *   1. Which in-scope services and objective terms are TAUGHT (lessons/reference)?
 *   2. Which are DRILLED (appear in any AIF quiz bank)?
 *   3. Which quiz questions have an OUT-OF-SCOPE service as a correct answer?
 *
 * Usage: npm run check:aif-guide
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (dir, keep) => fs.existsSync(dir)
  ? fs.readdirSync(dir).filter(keep).map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n') : '';
const norm = s => s.replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-z0-9]/g, '');

const taught = norm(
  read(path.join(ROOT, 'src/content-html/lessons'), f => f.includes('aif') && f.endsWith('.html')) +
  read(path.join(ROOT, 'src/content-html/reference'), f => f.includes('aif') && f.endsWith('.html')));
const banks = fs.readdirSync(path.join(ROOT, 'exams/questions'))
  .filter(f => f.startsWith('aif-') && f.endsWith('.json'))
  .map(f => ({ f, qs: JSON.parse(fs.readFileSync(path.join(ROOT, 'exams/questions', f), 'utf8')).questions }));
const drilled = norm(JSON.stringify(banks));

// Guide appendix "In-Scope AWS Services". Each entry: [label, ...aliases].
const IN_SCOPE = [
  ['AWS Data Exchange'], ['Amazon EMR'], ['AWS Glue'], ['AWS Glue DataBrew', 'DataBrew'],
  ['AWS Lake Formation', 'Lake Formation'], ['Amazon OpenSearch Service', 'OpenSearch'],
  ['Amazon Quick', 'Amazon Quick'], ['Amazon Redshift', 'Redshift'],
  ['AWS Budgets'], ['AWS Cost Explorer', 'Cost Explorer'],
  ['Amazon EC2', 'EC2'], ['AWS Lambda', 'Lambda'],
  ['Amazon ECS', 'ECS'], ['Amazon EKS', 'EKS'],
  ['Amazon Aurora', 'Aurora'], ['Amazon DocumentDB', 'DocumentDB'], ['Amazon DynamoDB', 'DynamoDB'],
  ['Amazon ElastiCache', 'ElastiCache'], ['Amazon Neptune', 'Neptune'], ['Amazon RDS', 'RDS'],
  ['Kiro'], ['Strands Agents', 'Strands'],
  ['Amazon Bedrock', 'Bedrock'], ['Amazon Bedrock AgentCore', 'AgentCore'],
  ['Amazon Comprehend', 'Comprehend'], ['Amazon Lex'], ['Amazon Nova', 'Nova'],
  ['Amazon Personalize', 'Personalize'], ['Amazon Polly', 'Polly'], ['Amazon Rekognition', 'Rekognition'],
  ['Amazon SageMaker AI', 'SageMaker'], ['Amazon SageMaker JumpStart', 'JumpStart'],
  ['Amazon Textract', 'Textract'], ['Amazon Transcribe', 'Transcribe'], ['Amazon Translate'],
  ['AWS Transform'],
  ['AWS CloudTrail', 'CloudTrail'], ['Amazon CloudWatch', 'CloudWatch'], ['AWS Config'],
  ['AWS Trusted Advisor', 'Trusted Advisor'], ['AWS Well-Architected Tool', 'Well-Architected'],
  ['Amazon CloudFront', 'CloudFront'], ['Amazon VPC', 'VPC'],
  ['AWS Artifact'], ['AWS IAM', 'IAM'], ['Amazon Inspector'], ['AWS KMS', 'KMS'],
  ['Amazon Macie', 'Macie'], ['AWS Secrets Manager', 'Secrets Manager'],
  ['Amazon S3', 'S3'], ['Amazon S3 Glacier', 'Glacier'],
];

// Objective terms named in the five domains' task statements (examples AWS lists).
const OBJECTIVES = [
  ['1.1', 'agentic AI', 'agentic'], ['1.1', 'batch inference', 'batch'], ['1.1', 'asynchronous inference', 'asynchronous'],
  ['1.1', 'serverless inference', 'serverless'], ['1.1', 'time-series data', 'time-series', 'timeseries'],
  ['1.1', 'reinforcement learning'], ['1.2', 'when AI is not appropriate', 'not appropriate', 'when not to use'],
  ['1.2', 'traditional ML vs FM', 'traditional ml'], ['1.3', 'MLOps'], ['1.3', 'model re-training', 'retrain'],
  ['1.3', 'managed API vs self-hosted', 'self-hosted', 'selfhosted'], ['1.3', 'F1 score', 'f1'],
  ['1.3', 'ROI', 'return on investment'], ['1.3', 'cost per user'],
  ['2.1', 'tokens', 'token'], ['2.1', 'chunking', 'chunk'], ['2.1', 'embeddings', 'embedding'],
  ['2.1', 'transformer'], ['2.1', 'multi-modal', 'multimodal'], ['2.1', 'diffusion'],
  ['2.1', 'FM lifecycle', 'lifecycle'], ['2.1', 'token-based pricing', 'per token'],
  ['2.1', 'context engineering'], ['2.1', 'Model Context Protocol (MCP)', 'model context protocol', 'MCP'],
  ['2.1', 'multi-agent systems', 'multi-agent', 'multiagent'], ['2.1', 'agent memory', 'memory management', 'agent memory'],
  ['2.1', 'tool usage', 'tool use', 'tools'], ['2.1', 'workflow orchestration', 'orchestration'],
  ['2.2', 'hallucination'], ['2.2', 'nondeterminism', 'nondeterministic'], ['2.2', 'interpretability'],
  ['2.2', 'customer lifetime value'], ['2.2', 'conversion rate'], ['2.2', 'average revenue per user'],
  ['2.3', 'provisioned throughput'], ['2.3', 'regional coverage', 'region'],
  ['3.1', 'prompt caching'], ['3.1', 'inference parameters / temperature', 'temperature'],
  ['3.1', 'RAG / Knowledge Bases', 'knowledge base'], ['3.1', 'vector database', 'vector'],
  ['3.1', 'Aurora / RDS for PostgreSQL vectors', 'pgvector', 'postgresql'],
  ['3.1', 'in-context learning', 'in-context'], ['3.1', 'model distillation', 'distillation'],
  ['3.1', 'AI agents business uses', 'agents'],
  ['3.2', 'negative prompts', 'negative prompt'], ['3.2', 'chain-of-thought', 'chain of thought'],
  ['3.2', 'zero-shot', 'zero shot'], ['3.2', 'single-shot / one-shot', 'single-shot', 'one-shot'],
  ['3.2', 'few-shot', 'few shot'], ['3.2', 'prompt templates', 'prompt template'],
  ['3.2', 'prompt poisoning', 'poisoning'], ['3.2', 'hijacking', 'hijack', 'prompt injection'],
  ['3.2', 'jailbreaking', 'jailbreak'], ['3.2', 'prompt exposure / leaking', 'exposure', 'prompt leak'],
  ['3.2', 'Bedrock Prompt Management', 'prompt management'],
  ['3.3', 'pre-training', 'pretraining', 'pre-train'], ['3.3', 'continued pre-training', 'continued pre-training', 'continuous pre-training'],
  ['3.3', 'instruction tuning'], ['3.3', 'transfer learning'], ['3.3', 'RLHF', 'reinforcement learning from human feedback'],
  ['3.3', 'data curation / representativeness', 'representative'],
  ['3.4', 'human-in-the-loop evaluation', 'human evaluation', 'human-in-the-loop'],
  ['3.4', 'benchmark datasets', 'benchmark'], ['3.4', 'Bedrock Model Evaluation', 'model evaluation'],
  ['3.4', 'ROUGE'], ['3.4', 'BLEU'], ['3.4', 'BERTScore'], ['3.4', 'LLM-as-a-judge', 'llm-as-a-judge', 'llm as a judge'],
  ['3.4', 'task completion rate'], ['3.4', 'cost per interaction'], ['3.4', 'user satisfaction'],
  ['4.1', 'inclusivity'], ['4.1', 'robustness'], ['4.1', 'veracity'], ['4.1', 'Bedrock Guardrails', 'guardrails'],
  ['4.1', 'environmental / sustainability', 'sustainab'], ['4.1', 'IP infringement', 'intellectual property'],
  ['4.1', 'bias and variance', 'variance'], ['4.1', 'overfitting'], ['4.1', 'underfitting'],
  ['4.1', 'subgroup analysis', 'subgroup'], ['4.1', 'label quality'], ['4.1', 'human audits', 'human audit'],
  ['4.2', 'SageMaker Model Cards', 'model card'], ['4.2', 'open source models / licensing', 'licens'],
  ['4.2', 'interpretability vs performance trade-off', 'trade-off', 'tradeoff'],
  ['4.2', 'human-centered design', 'human-centered', 'human centered'],
  ['5.1', 'IAM roles and policies', 'iam role'], ['5.1', 'AWS PrivateLink', 'privatelink'],
  ['5.1', 'shared responsibility', 'shared responsibility'], ['5.1', 'AgentCore Identity'],
  ['5.1', 'Policy in AgentCore', 'agentcore policy', 'policy in agentcore'],
  ['5.1', 'data lineage', 'lineage'], ['5.1', 'data cataloging', 'data catalog'],
  ['5.1', 'privacy-enhancing technologies', 'privacy-enhancing'], ['5.1', 'data integrity'],
  ['5.1', 'threat detection'], ['5.1', 'vulnerability management', 'vulnerabilit'],
  ['5.1', 'encryption at rest and in transit', 'in transit'], ['5.1', 'data leakage', 'leakage'],
  ['5.1', 'output filtering / validation', 'output validation', 'output filtering'],
  ['5.1', 'audit trail / logging of AI interactions', 'invocation logging', 'audit trail'],
  ['5.1', 'toxicity'], ['5.1', 'grounding', 'grounding'], ['5.1', 'confidence scoring', 'confidence scor'],
  ['5.2', 'data residency', 'residency'], ['5.2', 'data retention', 'retention'], ['5.2', 'data lifecycle', 'lifecycle'],
  ['5.2', 'Generative AI Security Scoping Matrix', 'scoping matrix'], ['5.2', 'review cadence', 'cadence'],
  // Added 2026-11-02 after an independent line-by-line audit (362 rows) found
  // these example items thin or missing; keyword rows above had hidden them.
  ['1.1', 'algorithm'], ['1.2', 'assist human decision making', 'assist human decision', 'human decides', 'humandecides'],
  ['1.2', 'solution scalability', 'scalability'], ['1.2', 'automation'], ['1.2', 'cost-benefit analysis', 'cost-benefit'],
  ['1.3', 'open-source pre-trained models', 'open-source pre-trained'], ['1.3', 'MLOps experimentation', 'experimentation'],
  ['1.3', 'technical debt'], ['1.3', 'production readiness'], ['1.3', 'repeatable processes', 'repeatable'],
  ['1.3', 'development costs', 'development cost'], ['1.3', 'customer feedback'],
  ['2.1', 'video generation', 'video'], ['2.1', 'audio generation', 'audio'], ['2.1', 'FM lifecycle: feedback', 'feedback'],
  ['2.1', 'multi-agent communication patterns', 'communication pattern', 'supervisor'],
  ['2.2', 'adaptability'], ['2.2', 'responsiveness'], ['2.2', 'conversational'], ['2.2', 'compliance (model selection)', 'compliance'],
  ['2.2', 'cross-domain performance', 'cross-domain'], ['2.2', 'efficiency'],
  ['2.3', 'accessibility'], ['2.3', 'cost-effectiveness', 'cost-effective'], ['2.3', 'availability / redundancy', 'redundancy'],
  ['2.3', 'cross-Region inference', 'cross-region inference'],
  ['3.1', 'Neptune as a vector store', 'neptune'], ['3.1', 'customization (selection criterion)', 'customization'],
  ['3.2', 'specificity and concision', 'concise'], ['3.2', 'prompt discovery', 'discovery'],
  ['3.2', 'prompt versions / variants', 'variants'], ['3.3', 'instruction tuning'],
  ['3.4', 'productivity'], ['3.4', 'user engagement'], ['3.4', 'evaluating RAG apps', 'faithfulness'],
  ['3.4', 'evaluating agents / workflows', 'tool chosen', 'right tool', 'correct tool'],
  ['4.1', 'loss of customer trust', 'customer trust'], ['4.1', 'end-user risk', 'end-user risk', 'end user risk'],
  ['4.2', 'AWS AI Service Cards', 'service card'], ['4.2', 'Bedrock Model Evaluations (transparency)', 'model evaluation'],
  ['5.1', 'application security'], ['5.1', 'infrastructure protection'],
  ['5.1', 'Bedrock model invocation logging', 'invocation logging'], ['5.2', 'observability'],
  ['5.2', 'S3 Lifecycle', 's3 lifecycle'], ['5.2', 'governance policies', 'policies'], ['5.2', 'review strategies'],
  ['5.2', 'transparency standards'], ['5.2', 'team training'],
];

// Guide appendix "Out-of-Scope AWS Services" — the ones a quiz might plausibly use.
const OUT_OF_SCOPE = ['GuardDuty', 'Shield', 'AWS WAF', 'Certificate Manager', 'ACM', 'Security Hub',
  'Cognito', 'Detective', 'CloudHSM', 'Firewall Manager', 'Security Lake', 'Route 53', 'Direct Connect',
  'Global Accelerator', 'AWS Backup', 'X-Ray', 'Amplify', 'Control Tower', 'Service Catalog', 'Timestream',
  'Keyspaces', 'DataSync', 'Database Migration Service', 'Kafka'];

const has = (hay, keys) => keys.some(k => hay.includes(norm(k)));
const row = (label, keys) => ({ label, t: has(taught, keys), d: has(drilled, keys) });

function report(title, rows) {
  const miss = rows.filter(r => !r.t || !r.d);
  console.log(`\n${title}: ${rows.filter(r => r.t).length}/${rows.length} taught, ${rows.filter(r => r.d).length}/${rows.length} drilled`);
  miss.forEach(r => console.log(`  ${r.t ? '   ' : 'NOT TAUGHT'} ${r.d ? '' : 'NOT DRILLED'}  ${r.label}`.replace(/\s+$/, '')));
}

report('In-scope services', IN_SCOPE.map(([l, ...a]) => row(l, [l, ...a])));
report('Objective terms', OBJECTIVES.map(([t, l, ...a]) => row(`${t} ${l}`, a.length ? a : [l])));

console.log('\nQuiz questions whose CORRECT answer uses an out-of-scope service:');
let bad = 0;
for (const { f, qs } of banks) for (const q of qs) {
  const right = q.type === 'matching' ? q.options : q.correct.map(i => q.options[i]);
  const hit = OUT_OF_SCOPE.filter(s => right.some(o => new RegExp(`\\b${s}\\b`).test(o)));
  if (hit.length) { bad++; console.log(`  ${f} Q${q.id}: ${hit.join(', ')}`); }
}
console.log(bad ? `  ${bad} question(s)` : '  none');
