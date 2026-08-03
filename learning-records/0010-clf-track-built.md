# 0010 — The CLF-C02 track: first three lessons and the support-plan trap

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

## Still open

1. **He has not booked.** The plan cannot be scheduled without a date. Ask.
2. **ESL +30 must be requested before booking** — still the biggest lever, still
   unconfirmed as done.
3. **Team lead: does the company pay the 100 USD, or is there a voucher?**
   Still unasked.
4. **C4 not built** — Cloud Concepts: the 6 benefits, Well-Architected's 6
   pillars, CapEx vs OpEx, Regions/AZs/Edge. Placeholder card is on the hub.
5. **No CLF practice exam.** The DVA track has 975 questions; CLF has none.
   Generated exams come from `exams/questions/*.json` via `npm run exams` —
   never edit `exams/exam-NN.html` by hand.
