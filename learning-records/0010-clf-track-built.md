# 0010 — Two tracks built: CLF-C02 and AIF-C01 (both exams, in parallel)

**Date:** 2026-08-03
**Status:** Active — continues [0009](./0009-pivot-to-foundational-certs-and-astro.md)

## What was built

The CLF hub had no lessons under it. It now has a track, weighted to where the
learner actually loses marks rather than to domain size:

| File | Lesson | Domain |
|---|---|---|
| `lessons/0052-clf-shared-responsibility.html` | C1 · Shared Responsibility Model | 2 (30%) |
| `lessons/0053-clf-support-plans.html` | C2 · Support plans, billing & cost tools | 4 (12%) |
| `lessons/0054-clf-pricing-models.html` | C3 · Pricing models | 4 (12%) |
| `reference/clf-numbers.html` | Numbers & Trigger Words cheat sheet | all |

Two of the three lessons cover Domain 4, which is only 12% of the exam. That is
deliberate and follows the reasoning in 0009: he has real hands-on AWS, so
Technology (34%) is largely already his, while **buying support plans is not a
developer's job and nothing in his work will ever teach it**. Domain 4 is where
the marginal question is won. C1 is included because the Shared Responsibility
Model is the exam's one guaranteed topic.

## The discovery that changes what we teach

**AWS restructured its support plans in December 2025, and the CLF-C02 exam
guide has not followed.**

- The live site and docs now show **Basic, Business Support+, Enterprise,
  Unified Operations**.
- **Developer, Business and Enterprise On-Ramp are discontinued 1 January 2027**
  (they survive only in AWS GovCloud (US)). Enterprise's minimum dropped from
  $15,000 to $5,000; Business Support+ starts at $29/month.
- The **CLF-C02 exam guide still names the old ladder verbatim** in Task
  Statement 4.3: "AWS Developer Support, AWS Business Support, AWS Enterprise
  On-Ramp Support, AWS Enterprise Support".

So a learner who studies support plans from aws.amazon.com — the obvious,
sensible thing to do — will memorise names that are **not the answers on his
exam**. C2 teaches the old ladder for the exam and carries a warning box
explaining why the AWS website disagrees. The cheat sheet repeats the warning,
because that page is the one he will actually revise from.

**Rule going forward: for CLF, the exam guide outranks the marketing pages.**
Re-verify this before he books — if AWS updates the guide, C2 and
`clf-numbers.html` both need changing, and the warning box removed.

## A design change: trigger words over numbers

`clf-numbers.html` is not a copy of `dva-numbers.html`. CLF asks far fewer
numbers than DVA — it asks "which service". So the sheet leads with a
**Trigger Words** table mapping exam English straight to answers
("designated" → Enterprise; "fault-tolerant" → Spot; "unknown access pattern"
→ Intelligent-Tiering).

This targets the binding constraint from
[0008](./0008-pivot-to-aws-dva-c02.md) directly: he can get many questions
right by recognising one word, without parsing the whole sentence. For an
English-second-language candidate this is worth more than any number.

## Facts verified against AWS this session

All from AWS's own documentation, 3 Aug 2026 (third-party summaries were
rejected — one returned model general-knowledge rather than page content, which
is exactly how wrong numbers get taught):

- Spot: up to **90%** off, **2-minute** interruption notice.
- Reserved Instances: **1 or 3 years only**; All/Partial/No Upfront; Standard
  can be modified but not exchanged, Convertible can be exchanged; cannot be
  cancelled after purchase; Regional gives AZ flexibility but no capacity
  reservation, Zonal reserves capacity.
- Savings Plans: Compute **up to 66%** (covers EC2, Fargate, Lambda),
  EC2 Instance **up to 72%**.
- Exam mechanics: 65 questions / 50 scored, 15 unscored and unmarked,
  **compensatory scoring** (no per-domain pass needed), **no penalty for
  guessing** — so never leave a blank. Both facts are on the cheat sheet.

## Update, same day: both exams, not one

He corrected the plan: *"team lead said to give both exams combined so we need to
prepare for both exams"*. **CLF and AIF are now both active and studied in
parallel** — not CLF-then-AIF. He chose parallel study explicitly when asked.

He also stated his AI background: **"barely any — mostly new to me"**. This
inverts the standing AWS teaching rule. For CLF the rule is *never teach basics*
because he has hands-on experience. **For AIF the opposite holds** — AI
vocabulary must be built from zero, assuming nothing. Lesson I1 exists for
exactly this and every later AIF lesson depends on it.

### The AIF track as built

| File | Lesson | Domains |
|---|---|---|
| `lessons/0055-aif-vocabulary.html` | I1 · The language of AI | 1 + 2 (44%) |
| `lessons/0056-aif-aws-ai-services.html` | I2 · Which AWS AI service? | 1–3 |
| `lessons/0057-aif-responsible-ai.html` | I3 · Responsible AI, security, governance | 4 + 5 (28%) |
| `reference/aif-numbers.html` | Terms & Trigger Words cheat sheet | all |
| `aif-index.html` | Track hub | — |

**AIF-C01 facts (verified 3 Aug 2026):** 65 questions / 50 scored / 15 unscored ·
90 min · 100 USD · 700 to pass · compensatory scoring · no guessing penalty.
Domains: Applications of FMs **28%**, GenAI **24%**, AI/ML fundamentals **20%**,
Responsible AI **14%**, Security/Compliance/Governance **14%**.

### Two findings that shaped the teaching

**1. AIF has question types CLF does not.** Beyond multiple choice/response it
adds **Ordering** and **Matching**, and AWS states you must get *every* element
right to earn credit — **no partial marks**. This is flagged in I1, the hub and
the cheat sheet. It also argues for drilling the AI/ML lifecycle *as a sequence*,
not just as a list.

**2. AIF Domain 5 is largely CLF material.** The exam guide names IAM,
encryption, the shared responsibility model, CloudTrail, Config, Artifact,
Audit Manager and Trusted Advisor. That is 14% of AIF answered by CLF study —
the strongest concrete argument for the parallel plan, and it is made explicit
in I3 and cross-linked from both hubs.

**Sequencing advice given:** study in parallel, but **book CLF first and AIF a
few weeks later** — the dependency runs CLF → AIF, not the reverse.

### Teaching bridges that worked

Reused the Django bridge on genuinely new material: **prompt injection = SQL
injection** (same instinct: never trust user input as instructions), **embeddings
= a database index** but matching on meaning, **RAG = a `SELECT` whose result is
pasted into the prompt**, **training vs inference = `migrate` vs `runserver`**,
and **human-in-the-loop = an admin approval workflow**. These let a "mostly new
to me" subject start from things he already does.

## Still open

1. **Neither exam is booked.** The plan cannot be scheduled without dates. Ask.
2. **ESL +30 must be requested before booking** — one request covers *both*
   exams. Still the biggest lever, still unconfirmed as done.
3. **Team lead: does the company pay the fees?** Now **200 USD** for both.
   Still unasked.
4. **C4 (CLF) not built** — Cloud Concepts: the 6 benefits, Well-Architected's
   6 pillars, CapEx vs OpEx, Regions/AZs/Edge.
5. **I4 (AIF) not built** — prompt engineering techniques (zero/few-shot,
   chain-of-thought), inference parameters (temperature, top-p), and evaluation
   metrics (ROUGE, BLEU, BERTScore, LLM-as-a-judge).
6. **No practice exams for either CLF or AIF.** DVA has 975 questions; these
   have none. Generated exams come from `exams/questions/*.json` via
   `npm run exams` — never edit `exams/exam-NN.html` by hand. **An AIF question
   set must include ordering and matching items**, which the current exam builder
   may not support — check before promising it.
