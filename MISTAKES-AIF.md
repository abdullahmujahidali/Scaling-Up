# AIF Mistake Log

Only the questions I got wrong. Review them without looking at the answer first.
Review days: **next day → 3 days later → 7 days later.** If I get one right 3 times, mark it ✅.

> ### 🗑️ Delete from memory: GuardDuty and Shield
> Checked against the **official exam guide (v1.2, Oct 29 2026)**: **Amazon GuardDuty, AWS Shield, AWS WAF, ACM and Security Hub are OUT OF SCOPE** — they will not be answers on the real exam. My quizzes wrongly used them (now fixed).
> So the rows below about GuardDuty don't matter. **One less confusion: for "scan for vulnerabilities" the answer is Inspector.**

---

## Quiz 1 — 2026-10-22 — 775 (15/20), 5 min

Next reviews: **Thu Oct 23 · Mon Oct 27 · Wed Oct 29**

### Pattern: RAG vs fine-tuning vs prompting (3 of 5 mistakes)

The rule — try the cheapest first, go down only if needed:

| Problem | Answer | Remember |
|---|---|---|
| Model needs **facts / documents** (especially facts that **change**) | **RAG** | RAG = *what it knows* |
| Model needs a **style, tone, format — permanently** | **Fine-tuning** | Fine-tuning = *how it speaks* |
| You have **a few examples** + want **lowest cost** | **Few-shot prompting** | Prompt first, it's free |
| Build a new model from nothing | Pre-training | Almost never the answer (millions $) |

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| Q1 | HR policies **change monthly**, answers must be current | Fine-tune monthly | **RAG** | "Changes" → RAG reads the newest documents. Fine-tuning = retrain every month. |
| Q7 | 20 examples, specific format, **LOWEST cost** | Fine-tune | **Few-shot prompting** | Put the examples in the prompt. 20 is too few to fine-tune anyway. |
| Q19 | Specific style and tone **permanently** | RAG | **Fine-tuning** | Style = how it speaks → fine-tuning. RAG only adds information. |

### Other mistakes

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| Q12 | Metric for **summaries** | F1 score | **ROUGE** | **R**OUGE = **R**educe (summaries). **B**LEU = **B**ilingual (translation). F1 = classification. |
| Q16 | **Sentiment of text reviews**, no ML skills, least effort | Rekognition | **Comprehend** | Rekognition = images/video (**eyes**). Comprehend = text meaning (**reading**). |

---

## Quiz 2 + Quiz 3 — 2026-10-28 — 820 (16/20) and 820 (16/20)

Next reviews: **Thu Oct 29 · Sat Oct 31 · Wed Nov 4**

Good news: **no RAG / fine-tuning mistakes this time.** Quiz 1's big pattern is fixed.

### ⚠️ Repeat mistake: metrics (3 mistakes in 3 quizzes)

| Metric | Use it for | Remember |
|---|---|---|
| **ROUGE** | Summaries | **R**OUGE = **R**educe |
| **BLEU** | Translation | **B**LEU = **B**ilingual |
| **Recall** | "Of all the *real* positives, how many did we catch?" Missing one is costly (disease, fraud) | **Recall = don't miss any** |
| **Precision** | "Of everything we *flagged*, how many were really positive?" False alarms are costly (spam) | **Precision = don't cry wolf** |
| **Accuracy** | % of all predictions correct — a trap answer, misleading on rare cases | Usually a distractor |
| **F1** | Balance of precision + recall | Classification, not text generation |

| Quiz | Q | Question (short) | I chose | Correct |
|---|---|---|---|---|
| 3 | Q12 | Metric for **translation** | Accuracy | **BLEU** (same family as Quiz 1 Q12!) |
| 2 | Q20 | Of all **genuinely positive** cases, how many caught | Accuracy | **Recall** |

### Pattern: security & compliance services (Domain 5)

| Need | Service | Remember |
|---|---|---|
| Find **PII / sensitive data in S3** | **Macie** | Macie = **M**y data **i**s secret |
| **AWS's** compliance reports (SOC, ISO) to download | **Artifact** | Artifact = AWS's *certificates* |
| Collect evidence for **your own** audits | **Audit Manager** | the name says it |
| Who called which API, when | CloudTrail | audit trail |
| Threat detection | GuardDuty | the guard |
| Vulnerability scanning | Inspector | the inspector |

| Quiz | Q | Question (short) | I chose | Correct |
|---|---|---|---|---|
| 2 | Q9 | Discover **PII in S3** | Artifact | **Macie** |
| 2 | Q17 | **TWO** services to show regulatory compliance | missed one | **Artifact + Audit Manager** |

### Pattern: Responsible AI words (Domain 4)

| Quiz | Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|---|
| 2 | Q7 | Great on training data, bad on new data | Underfitting | **Overfitting** | **Over**fitting = memorised **too much**. Underfitting = learned too little, bad everywhere. |
| 3 | Q7 | Outputs are **truthful** and accurate | Modality | **Veracity** | Veracity = truth (*verify*). Modality = text/image/audio type. |
| 3 | Q8 | **Legal** risk: output resembles **copyrighted** work | Data residency | **IP infringement** | Copyright → intellectual property. Data residency = *where* data is stored. |

### Other

| Quiz | Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|---|
| 3 | Q14 | **Recommend products** from past behaviour | Forecast | **Personalize** | Personalize = "you may also like". Forecast = future **numbers** (sales next month). |

---

## Quiz 1 retake + Quiz 4 + Quiz 5 — 2026-10-28 — 1000, 1000, 955

Next review: **Thu Oct 29 · Sat Oct 31 · Wed Nov 4** (same days as Quiz 2+3)

| Quiz | Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|---|
| 5 | Q4 | Which data is **unstructured**? | Relational database table | **Free-text customer emails** | No columns/schema = unstructured (emails, PDFs, images, audio). Tables, CSVs, spreadsheets have columns = **structured**. |

---

## Hard Quiz 1 — 2026-10-28 — 910 (18/20), 8 min

First quiz with **no length or position clues** — so this score is real.

### ⚠️ Repeat mistake: Macie (2nd time — Quiz 2 Q9 too)

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| 19 | Find **credit card numbers in files in S3** | Inspector | **Macie** | Sensitive data **in S3** = Macie. Inspector = **software vulnerabilities** (old packages, open ports) in EC2/Lambda/containers. |

Memory trick: **Macie looks inside your DATA. Inspector looks inside your SOFTWARE.**

### Human review

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| 16 | Low confidence → **a person checks** before release | Model Monitor | **A2I (Augmented AI)** | "Person / human / review" = A2I. Model Monitor = a **machine** watching for drift; no human involved. |

The 4 SageMaker look-alikes, one line each:
- **Clarify** = bias + *why* this prediction
- **Model Monitor** = model getting worse over time (drift)
- **Model Cards** = documentation
- **A2I** = send to a **human**

---

## Hard Quiz 2 — 2026-11-02 — 865 (17/20), 8 min

Next reviews: **Mon Nov 3 · Wed Nov 5 · Mon Nov 9**

### ⚠️ Repeat mistake: overfitting vs underfitting (2nd time — Quiz 2 Q7 too)

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| 1 | 98% on training, 62% on test | Underfitting | **Overfitting** | Look at the **training** score. **High** training score + low test = **Over**fitting (memorised). **Low** training score too = **Under**fitting. |

Memory trick: **Overfitting = student who memorised the past paper** — 100% on it, fails the real exam.
**Underfitting = student who didn't study** — fails both.

### Bedrock pricing

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| 11 | Run a **fine-tuned (custom)** Bedrock model | SageMaker Savings Plan | **Provisioned Throughput** | Base model → on-demand (pay per token). **Custom model → Provisioned Throughput** (exam answer). SageMaker Savings Plans are for SageMaker, not Bedrock. |

### Domain 5 again: encryption

| Q | Question (short) | I chose | Correct | Why |
|---|---|---|---|---|
| 19 | **Encryption keys** you control, rotate, log | Secrets Manager | **AWS KMS** (customer managed keys) | **KMS = Keys** to encrypt data. **Secrets Manager = passwords / API keys** your app logs in with. ACM = HTTPS certificates. |

Domain 5 cheat line: **Macie** finds sensitive data · **KMS** encrypts it · **Secrets Manager** stores passwords · **Inspector** finds software holes · **GuardDuty** finds attackers · **CloudTrail** who did what · **Config** settings history · **Artifact** AWS's reports · **Audit Manager** your audit evidence.

---

## Hard Quiz 3 + Hard Quiz 4 — 2026-11-02 — 550 (10/20) and 640 (12/20), 7–8 min each

Next reviews: **Tue Nov 3 · Thu Nov 5 · Mon Nov 9** · video: *Quick Review → ⚠️ My mistakes 1*

⏱ **Speed problem:** 20 long questions in 7 min = **21 seconds each**. The real exam gives ~80 seconds (more with ESL +30). Several of these I already knew.

### A. I knew these — rushed (repeat topics)

| Quiz | Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|---|
| H3 | 12 | Overlap with human **summaries** | Accuracy | **ROUGE** | ⚠️ 3rd time! **summary → ROUGE** |
| H3 | 2 | Predict sale **price in dollars** | Clustering | **Regression** | a **number** → regression |
| H3 | 5 | **3 examples** in the prompt | Zero-shot | **Few-shot** | examples → few-shot |
| H4 | 10 | **No examples** given | Chain-of-thought | **Zero-shot** | zero examples → zero-shot |
| H4 | 1 | 99% train / 70% validation — fix? | More epochs | **More varied data + regularization/early stopping** | overfitting → make it *simpler* |
| H4 | 3 | Decision in **under 100 ms**, 24/7 | Ground Truth | **Real-time endpoint** | instant → real-time |
| H4 | 17 | Download **AWS's ISO / SOC** reports | Trusted Advisor | **Artifact** | AWS's reports → Artifact |
| H4 | 19 | **Alarm** on **latency** | CloudTrail | **CloudWatch** | speed / alarm → CloudWatch |
| H3 | 17 | Scan Lambda / containers for **CVEs** | GuardDuty | **Inspector** | software holes → Inspector |
| H3 | 18 | EC2 talking to **malicious IPs** | CloudTrail | **GuardDuty** | attacker → GuardDuty |

### B. New topics — not drilled before

| Quiz | Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|---|
| H3 | 4 | Humans **label** images **before training** | Rekognition Custom Labels | **SageMaker Ground Truth** | label before → Ground Truth · review after → A2I |
| H4 | 4 | Read **scanned invoices** | Rekognition | **Textract** | documents/forms → Textract |
| H3 | 9 | Open-source model, **my instance types**, full control | Q Business | **SageMaker JumpStart** | I control the server → SageMaker |
| H3 | 10 | **Employees** chat with **SharePoint/S3/Confluence** docs | Lex | **Amazon Q Business** | employees + company docs → Q Business |
| H3 | 11 | **Unlabelled** text, change the model itself | RAG | **Continued pre-training** | unlabelled → continued pre-training · labelled → fine-tuning |
| H3 | 15 | **AWS's** docs on Rekognition's limits | API reference | **AWS AI Service Cards** | AWS's own AI service → Service Cards · my model → Model Cards |
| H4 | 12 | Judge **helpfulness and tone** | ROUGE | **Human evaluation** | tone / helpful → humans |
| H4 | 18 | Training with **no internet**, private S3 | Shield Advanced | **VPC + S3 VPC endpoint** | private → VPC endpoint · Shield = DDoS |

---

## Hard Quiz 5 (retest) — 2026-11-02 — 865 (17/20), 12 min ✅

Domain 5 security: **4/4** — the mistakes video worked. Slower pace (12 min) = fewer silly mistakes.

### ⚠️ Pattern: few-shot vs fine-tuning vs RAG (again — Quiz 1 Q7/Q19 too)

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 6 | **2 examples pasted in the prompt** | Fine-tuning | **Few-shot** | examples **in the prompt** = few-shot. Fine-tuning = a **training job** with thousands of examples. |
| 12 | **5,000 question + ideal answer pairs**, answer the same way | RAG | **Fine-tuning** | **pairs** (question + answer) = **labelled data** = fine-tuning. RAG = look up **documents/facts**. |

Simple test: **Where do the examples go?**
- In the **prompt** (a few) → **few-shot**
- Into a **training job** (thousands of pairs) → **fine-tuning**
- In a **document store** to look up facts → **RAG**

### SageMaker inference — 4 options

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 4 | Few requests a day, **unpredictable**, answer in seconds, **no idle cost** | Real-time endpoint | **Serverless Inference** | no idle cost → serverless |

| Option | When |
|---|---|
| **Real-time** | steady traffic, milliseconds, 24/7 (pay always) |
| **Serverless** | rare / unpredictable traffic, **no idle cost** |
| **Asynchronous** | big single requests, answer in minutes, queue |
| **Batch transform** | whole dataset, offline, no hurry |

---

## Hard Quiz 6 (extreme) — 2026-11-02 — 685 (13/20), 12 min

Domain 3 (RAG / fine-tuning / few-shot) **5/5** ✅ · Domain 4 **3/3** ✅ · Domain 1 **1/4** ❌

### ⚠️⚠️ Overfitting — 4th time (Quiz 2, Hard 2, Hard 4, now Hard 6)

| Q | Question (short) | I chose | Correct |
|---|---|---|---|
| 2 | Training **ERROR 2%**, validation **ERROR 35%** — fix? | More layers + more epochs | **Regularization (dropout) + early stopping** |

**The fix that always works: turn ERROR into a SCORE first.** 2% error = **98% score**. 35% error = **65% score**.
Now it's easy: 98% on training, 65% on new data → **memorised → OVERFITTING → make the model SIMPLER.**

| Training | New data | Name | Fix |
|---|---|---|---|
| Good | Bad | **Overfitting** (memorised) | **Simpler**: regularization, dropout, early stopping, more varied data |
| Bad | Bad | **Underfitting** (didn't learn) | **Stronger**: more layers, more epochs, more features |

I chose the *underfitting* fix — so I know the fixes, I just mixed up which problem it was.

### ⚠️ Recall vs precision (2nd time — Quiz 2 Q20)

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 1 | Rare disease, **missing a sick patient** is worst | Precision | **Recall** | "missing" = **Recall** = **R**emember every sick patient |

### ⚠️ Domain 5 look-alikes again

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 18 | Passport numbers in S3 + **CVEs in container images** | Macie + GuardDuty | **Macie + Inspector** | scan **software/images** = Inspector · GuardDuty watches **behaviour** |
| 19 | Evidence from **my OWN accounts** mapped to controls | Artifact | **Audit Manager** | Artifact = **AWS's** papers · Audit Manager = **my** papers |

> Update (Nov 2): Audit Manager is **not in the 2026 guide** — that question now asks about **AWS Config** (checks *my* resources against rules). Still true: **Artifact = AWS's papers**. GuardDuty in Q18 was out of scope; the Inspector lesson stays.

### Other

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 4 | Matching: Comprehend | (Lex's job) | **Comprehend = mood + key phrases in reviews** · Lex = chatbot intent | Comprehend **understands** text · Lex **talks** |
| 6 | Bill doubled after adding 3 pages + 10 examples to the prompt | Needs Provisioned Throughput | **More input tokens** | you pay per token, **in and out** |
| 8 | Tax with a **fixed formula**, exact, traceable | Fine-tune a model | **Normal rule-based code** | exact formula → **no AI** |

---

## Hard Quiz 7 (extreme) — 2026-11-02 — 640 (12/20), 12 min

Domain 1 **0/4** ❌ · Domain 3 4/5 · Domain 5 3/4

### ⚠️⚠️⚠️ Overfitting / underfitting — 5th time

| Q | Question (short) | I chose | Correct |
|---|---|---|---|
| 2 | ERROR **40%** training, **41%** test — lower both | Stronger regularization | **More complex model + more features** |

Turn ERROR into SCORE: 40% error = **60% score on training** → bad even on training = **UNDERFITTING** → make it **STRONGER**.
I picked the *overfitting* fix again. **Before choosing a fix, say the problem's name out loud first.**

### SageMaker inference (2nd time)

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 1 | Thousands/sec, <50 ms, **no wake-up delay** | Serverless | **Real-time** | "no wake-up delay" = always awake = real-time. Serverless **sleeps** (cold start). |

### Other

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 3 | Dollar error, **punish big mistakes more** | AUC | **RMSE** | dollars = regression (RMSE/MAE). AUC/F1 = categories. Big mistakes count more → **RMSE** (squares them). |
| 4 | Matching: tagged articles → ? · hiding words in untagged text → ? | swapped them | tagged = **classification** · hide a word & guess it = **self-supervised** | self-supervised = the data makes its own labels |
| 7 | "bank by the river" — how words relate | Tokenizer | **Self-attention** | tokenizer only **cuts** text into pieces |
| 9 | **10,000 message + reply pairs**, same tone always | Few-shot (10 examples) | **Fine-tuning** | ⚠️ again: thousands of **pairs** + lasting style = fine-tune |
| 14 | Model repeats phone numbers **from training data** | Model Card | **Remove personal data before training** | a Model Card only **writes down** the problem; it doesn't fix it |
| 18 | Encrypted-bucket rule + history · GPU alarm | Inspector | **Config + CloudWatch** | settings + rules = Config · alarm = CloudWatch |

---

## Hard Quiz 8 — 2026-11-03 — 1st try 730 (14/20), 17 min · 2nd try 910 (18/20), 16 min

Domain 3 **2/5** on the 1st try (customisation choice + agents).

### ⚠️⚠️⚠️ Overfitting / underfitting — 6th time (wrong on BOTH tries, same wrong pick)

| Q | Question (short) | I chose | Correct |
|---|---|---|---|
| 4 | Error **40%** train, **41%** validation, simple model, 2 columns — pick TWO | **Early stopping** (both tries) | **Add features + reduce regularisation** |

Early stopping, more dropout, fewer columns = all make the model **SMALLER/WEAKER** = overfitting fixes.
High error on train = model is **too weak** → make it **STRONGER**. Never pick a "make it smaller" fix here.

### Customisation choice (fine-tune vs RAG vs continued pre-training) — 3rd time

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 10 | **12,000 message + best-reply pairs**, same short format, no long prompts | Knowledge Base (RAG) | **Fine-tuning** | ⚠️ again: thousands of **pairs** + permanent style = fine-tune |
| 11 | Matching: 40 GB **unlabelled** reports → ? · prices change daily + show source → ? | swapped them | unlabelled text = **continued pre-training** · changing facts + source = **RAG** | Ask: labelled? changes? |

### Other

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 8 | Bedrock on-demand vs JumpStart — who runs servers? | Both serverless | **JumpStart = your instances, pay per hour · Bedrock = serverless, per token** | JumpStart = you get the server keys |
| 13 | Model decides itself which **APIs to call, in what order** | Amazon Q Business | **Bedrock Agents + action groups** | calls APIs = **Agents** |
| 17 | **Replace** phone numbers in the answer, show the rest | Macie | **Guardrails sensitive-info filter → mask** | Macie = S3 only, doesn't change answers |
| 20 (2nd try) | Every IAM role change for a **year**, search with **SQL** | Artifact | **CloudTrail Lake** | who changed what + SQL = CloudTrail **Lake** |

---

## Hard Quiz 9 — 2026-11-03 — 1st try 680 (not saved) · retake 955 (19/20), 6 min, Learn mode

Retake score is high partly because the questions were fresh in memory. The **680** is the real first-try score.

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 16 | Hiring model trained on 10 years where men were hired more | Underfitting | **Learns and repeats the unfair pattern (bias)** | biased history in = biased model out · more data never causes underfitting |

---

## Hard Quiz 10 — 2026-11-03 — 730 (14/20), 12 min

Domain 5 **1/4** ❌ · D1 3/4 · D2 3/4 · D3 4/5 · D4 3/3
**All 6 misses are REPEATS** of traps already in this file.

| Q | Question (short) | I chose | Correct | Repeat of |
|---|---|---|---|---|
| 4 | Rare cancer, **missing a real case is worse** | Precision | **Recall** | Hard 6 |
| 5 | "bank" = river or money — words weigh each other | Tokenizer | **Self-attention** | Hard 7 Q7 (same trap) |
| 12 | Fine-tuned 300 examples, many epochs, **copies training answers**, bad on new — pick TWO | More epochs | **Fewer epochs + more varied data** | over/underfitting — 7th time (this time OVERfitting, and I picked "make it stronger") |
| 17 | Matching: Artifact vs Audit Manager | swapped | Artifact = **download AWS's reports** · Audit Manager = **collect evidence about MY account** | Hard 6 |
| 19 | RDS password, **rotate every 30 days** automatically | KMS rotation | **Secrets Manager** | Hard 2 |
| 20 | CPU alarm + bucket-encryption rule with history | Inspector | **CloudWatch + Config** | Hard 7 Q18 (same trap) |

Over/underfitting: I now remember "make it stronger", but use it without diagnosing first. **Step 1 is always: is the TRAINING result good or bad?**

---

## Hard Quiz 11 — 2026-11-03 — 910 (18/20), 12 min ✅ best first-try hard score

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 14 | How much **each input pushed ONE decision** (own SageMaker model) | AI Service Card | **SageMaker Clarify — SHAP feature attributions** | "how much each feature" = Clarify · Service Card = AWS's own services |
| 18 | Prove **MY OWN account** follows rules, continuously, ready-made packs | Artifact | **AWS Config conformance packs** | Artifact repeat (4th time): Artifact = AWS's reports, never "my account" |

---

## Hard Quiz 12 (new 2026 topics: agents, MCP, AgentCore) — 2026-11-03 — 910 (18/20), 10 min ✅

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 13 | TWO best fits for **agentic AI** | House price from a table | **Trip booking across systems + refund flow via APIs** | agent = **many steps + many tools** · price from a table = normal ML (regression) |
| 20 | Hard rule: no refund tool call over $500, **enforced outside the model** | CloudWatch alarm | **Policy in Bedrock AgentCore** | **stop BEFORE** = AgentCore Policy · CloudWatch only tells you **AFTER** |

Official Practice Question Set (Skill Builder): honest attempt = **75%** (some misses from rushing).

---

## Hard Quiz 13 (last-gaps pack) — 2026-11-03 — 820 (16/20), 17 min

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 6 | Order the FM lifecycle (7 steps) | put fine-tuning last | **Data → Model → Pre-train → Fine-tune → Evaluate → Deploy → Feedback** | "Data, Model, Pre, Fine, Test, Ship, Listen" · fine-tune comes BEFORE testing |
| 10 | Improve prompts that are too long — TWO | "Write once, never change it" | **Clear task/format/length + try several versions** | prompts improve by **experimenting** |
| 16 | Screen reader + simple mode + more languages | Robustness | **Inclusivity** | usable by **everyone** = inclusivity · robustness = handles bad input |
| 17 | **99% train, 68% new**, changes a lot with data | Data drift | **High variance = overfitting** | ⚠️ over/underfitting family, 8th time · drift = AFTER launch · variance = varies a lot |

---

## Hard Quiz 14 (last-gaps pack 2) — 2026-11-03 — 820 (16/20), 18 min

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 11 | 50,000 **instruction → ideal answer** pairs, follow instructions better | RLHF | **Instruction tuning** | pairs = tuning · RLHF = humans **rank** answers |
| 12 | Goal: learners **come back more often** | BLEU | **Weekly returning learners + session length** | match the metric to the business goal · BLEU = translation score |
| 17 | Auditors need the **exact prompt + reply text**, 12 months | CloudTrail | **Bedrock model invocation logging → S3** | CloudTrail = **who** called · invocation logging = **what was said** |
| 20 | Security Scoping Matrix: own app on Bedrock vs train from scratch | swapped 3 and 5 | **3 = your app on a pre-trained model · 5 = train from scratch** | 1→5 = less → more control |

---

## Hard Quiz 15 (retest of My mistakes 2) — 2026-11-12 — 865 (17/20) · video NOT watched first

✅ Q1–Q3 (underfitting / high variance / drift) all correct · ✅ precision vs recall · ✅ instruction tuning vs RLHF · ✅ invocation logging · ✅ Artifact vs Config

| Q | Question (short) | I chose | Correct | Repeat? |
|---|---|---|---|---|
| 5 | Matching: self-attention vs positional encoding | swapped | **self-attention = words weigh each other · positional = word ORDER** | 3rd time near self-attention |
| 19 | Partner **API key** must rotate automatically | KMS | **Secrets Manager** | ⚠️ 3rd time (Hard 2, Hard 10) |
| 20 | Hard limit on a tool call, checked **BEFORE** it runs | Guardrails content filter | **AgentCore Policy** | 2nd time (Hard 12) |

---

## Full Mock 1 — 2026-11-16 — 945 (61/65), 18 min ⚠️ NOT a real readiness score

18 min for 65 questions = 17 s each. The correct answer was the longest option in 47% of questions, and many wrong options were silly ("colour scheme of the console"). The user spotted the length pattern. Replaced by **Mock 2** (hard bank, no length tell).

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 6 | Share of **real positive cases** the model found | Accuracy | **Recall** | found the real ones = recall |
| 28 | Main advantage of a **smaller** model | No need for evaluation | **Lower latency + lower cost** | smaller = faster + cheaper (always still evaluate) |
| 29 | TWO factors when selecting an FM | Support plan tier | **Cost per token + latency** | |
| 39 | Keep most capability, **lower inference cost** | More few-shot examples | **Model distillation** | big teacher → small student; more examples = MORE tokens = more cost |

---

## Full Mock 2 — 2026-11-16 — 848 (54/65) · 45 min · first honest full mock ✅ PASS

Domains: D1 8/13 (62%) · D2 13/16 · D3 17/18 · D4 8/9 · D5 8/9. 45 min = 41 s per question (still fast; the real exam allows about 1.5 min).

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 1 | 38% error on training, 39% on new data, 2 inputs | Overfitting | **Underfitting** | bad + bad = UNDER (turn error into score first) |
| 3 | **Too many honest orders flagged** | Recall | **Precision** | false alarms = precision · missed fraud = recall |
| 4 | 10-min mistake counts **exactly twice** a 5-min one | RMSE | **MAE** | MAE = fair average · RMSE = big mistakes hurt more |
| 7 | Matching: inference options | swapped serverless ↔ async | **few requests = serverless · big files = async** | Fast/Few/Fat/Full |
| 8 | Worse after a competitor opened, nothing changed | Ground Truth Plus | **Model Monitor** | drift → Model Monitor |
| 17 | 120-page manual sent with every question | Provisioned Throughput | **Send only matching sections** | you pay per token in AND out |
| 27 | Provisioned Throughput facts (TWO) | "cheapest for a few tests" | **hourly model units + reserved throughput** | few tests = on-demand |
| 29 | Order: tokens → ? → ? → ? → predict | attention before embedding | **embed → position → self-attention** | cut → number → place → look around → guess |
| 38 | Which part of an agent says **which APIs exist** | Knowledge base | **Action group (API schema + Lambda)** | DOES = action group · KNOWS = KB |
| 49 | Standard record for **our own 12 models** | Artifact | **SageMaker Model Cards** | MY model = Model Card · AWS papers = Artifact |
| 63 | SOC 2 report + S3 encryption proof (TWO) | Macie | **Artifact + Config** | Macie = finds PII, not settings |

---

## Full Mock 3 — 2026-11-17 — 751 (47/65) · 40 min · ⚠️ barely pass, done on phone

Domains: D1 **6/13 (46%)** · D2 12/16 · D3 14/18 · D4 9/9 · D5 6/9. 40 min = 37 s per question (too fast again). 🔁 = same trap as an earlier mock.

| Q | Question (short) | I chose | Correct | Keyword |
|---|---|---|---|---|
| 1 🔁 | 33% train error, 35% test error, strong regularization | Stop training earlier | **More inputs + more complex model** | bad + bad = UNDER = make it stronger |
| 4 🔁 | Good client emails land in spam | Accuracy | **Precision** | false alarms hurt = precision |
| 5 | One 0–1 score, "how much of the price change is explained" | MAE | **R squared** | 0–1 "explains" = R² · dollars = MAE/RMSE |
| 6 🔁 | One huge forecast mistake = blackout | Recall | **RMSE** | number → regression metric · big mistakes hurt more = RMSE |
| 7 🔁 | 4 million policies, weekly, results in S3, nobody waits | Serverless | **Batch transform** | full dataset + schedule = batch |
| 11 | Labelled customer table, predict who leaves, cheapest | Pre-train an FM | **Traditional classification (e.g. XGBoost)** | labelled table = classic ML, not FM |
| 13 | Fraud threshold 0.8 → 0.5 | Precision up | **Recall up, precision down** | lower bar = catch more + more false alarms |
| 16 🔁 | FM lifecycle order | Deploy before Evaluate | **… Fine-tune → Evaluate → Deploy → Feedback** | test before you ship |
| 17 🔁 | 1,500 input tokens @ $1/M vs 200 output @ $5/M | Shorter replies | **Cut 1,500 input tokens** | multiply: $0.0015 > $0.0010 |
| 21 | Regulator: explain which facts led to each loan decision | Hallucination | **Limited interpretability** | "explain why" = interpretability |
| 25 | Why split manuals before embeddings | Model learns new weights | **Each chunk can be matched and sent alone** | chunking = small findable pieces |
| 31 | 9,000 complaint + reply pairs, format by default | Few-shot | **Fine-tune** | thousands of pairs + "by default" = fine-tune |
| 38 | Hide phone/email but keep the summary | Guardrails BLOCK | **Guardrails MASK** | keep text, hide detail = mask |
| 40 | Hidden "ignore earlier instructions" in a CV | Invocation logging | **Guardrails prompt attack filter** | logging records, never stops |
| 47 | RAG steps order | mixed up | **Chunk → embed → store · then embed question → retrieve → add → answer** | Cut, Embed, Store · Ask, Find, Add, Answer |
| 57 🔁 | Encrypt S3, company controls key, can disable, logged | Secrets Manager | **KMS customer managed key** | KMS = keys · Secrets Manager = passwords |
| 59 🔁 | Alert on a setting + 6 months of setting history | CloudTrail | **AWS Config** | rule + settings history = Config |
| 62 🔁 | Staff use vendor's GenAI tool, enterprise agreement | Scope 3 | **Scope 2** | 1–2 USE an app · 3–5 BUILD with a model |

## Full Mock 3 RETAKE — 2026-11-19 — 765 (48/65) · 67 min · ⚠️ same exam, still 12 repeat misses

Domains: D1 9/13 · D2 **9/16 (56%)** · D3 15/18 · D4 8/9 · D5 7/9. 67 min = 62 s per question (good pace). Seen-before exam, so 765 is an inflated score.

**Fixed since first try:** Q1 underfit, Q4 precision, Q13 threshold, Q31 fine-tune, Q40 prompt attack, Q57 KMS.

**Wrong AGAIN, same pick both times (12):** Q5 R² (MAE again) · Q6 RMSE · Q7 batch (serverless again) · Q11 labelled table = classic ML (pre-train FM again) · Q16 Evaluate before Deploy · Q17 token maths (shorter replies again) · Q21 interpretability (hallucination again) · Q25 chunking · Q38 MASK (BLOCK again) · Q47 RAG order · Q59 Config (CloudTrail again) · Q62 Scope 2.

**New misses:** Q14 self-attention (chose positional encoding, old repeat) · Q20 nondeterminism (chose hallucination) · Q23 embedding + vector store (chose temperature) · Q33 distillation (chose Provisioned Throughput) · Q54 fix label quality first (chose more epochs).

Lesson: reading the "Why" after the exam did not stick. Need active recall of the Trick lines, not re-reading.
