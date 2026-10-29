# AIF Mistake Log

Only the questions I got wrong. Review them without looking at the answer first.
Review days: **next day → 3 days later → 7 days later.** If I get one right 3 times, mark it ✅.

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
