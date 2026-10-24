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
