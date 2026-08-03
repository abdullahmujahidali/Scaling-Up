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

## Update 3: full domain coverage + 14 quizzes

He asked for complete coverage — *"make sure you have covered everything for both
so I have sufficient just by going through your notes"* — plus **14 quizzes with
solutions**. Both tracks now cover **every domain of both exam guides**.

### Lessons added

| File | Lesson | Domain |
|---|---|---|
| `lessons/0058-clf-cloud-concepts.html` | C4 · Cloud Concepts | CLF D1 (24%) |
| `lessons/0059-clf-security-services.html` | C5 · IAM & security services | CLF D2 (30%) |
| `lessons/0060-clf-core-services.html` | C6 · Core services | CLF D3 (34%) |
| `lessons/0061-aif-prompt-and-evaluation.html` | I4 · Prompting & evaluation | AIF D3 (28%) |

Coverage is now **CLF 100% (all 4 domains)** and **AIF 100% (all 5 domains)**.

### The quizzes

**14 quizzes × 20 questions = 280 new questions**, every one with a written
explanation covering why the right answer is right *and* why the distractors are
wrong. Banks live in `exams/questions/{clf,aif}-0N.json`; pages are generated —
never hand-edit `exams/*.html`.

Index pages: `clf-quizzes.html`, `aif-quizzes.html` (score tracking, readiness
banner, both linked from their hubs and the sidebar).

### Exam builder work — read this before touching it

1. **`exams/build.js` was silently broken** and had been since the Astro
   migration: `package.json` gained `"type": "module"`, which makes Node treat
   `.js` as ESM, but the script is CommonJS. The 15 DVA exam HTML files only
   still existed because they were generated *before* that change — any
   `npm run exams` would have failed. **Renamed to `exams/build.cjs`** and the
   npm script updated. This was pre-existing, not caused by this session.

2. **The builder is now multi-cert.** A `CERTS` table keys off `meta.cert`
   (`dva` | `clf` | `aif`) supplying exam name, pass mark (DVA 720, CLF/AIF 700),
   domain names and weightings. **`dva` is the default**, so the existing 15 DVA
   banks build unchanged with no JSON edits.

3. **Validation was made cert-aware, not weaker.** DVA keeps its hard equality
   check (exactly 65 questions, 21/17/15/12). Short quizzes are checked
   *proportionally*: every domain must appear and none may deviate more than
   ±1.5 from its share of the real weighting. This caught two genuinely
   miscategorised questions, which were re-domained rather than the check being
   relaxed.

4. **`assets/exam-engine.js` had three hardcoded `[1,2,3,4]` domain loops** which
   silently dropped **AIF's Domain 5** from scoring and from the results table.
   Now driven by `DOMAIN_NAMES` from `EXAM_META`. The pass mark, domain labels
   and back-link are also passed through, all defaulting to the DVA values so
   older pages behave identically.

**Verified no DVA regression:** `exam-01.html` differs only by the intended new
`EXAM_META` fields (whose values equal the previous hardcoded defaults) and the
asset cache-buster. Confirmed in-browser: DVA still shows 720, "~47 correct",
"full-length mock", "Start exam".

**End-to-end browser tests run:** an AIF quiz answered fully correct (1000 PASS),
one with two deliberate errors (910, all five domain rows, weakest domain named),
and a CLF quiz deliberately failed (460, NOT YET, correct CLF domain names and
back-link). Explanations render under "Why:" in the review section, and the
"Wrong N" filter works. All test attempts were cleared from localStorage
afterwards; his language preference was left untouched.

## Update 4: the two remaining gaps closed

He asked to make both tracks fully exam-ready. The two gaps flagged in Update 3
are now closed.

### 1. Ordering and matching question types now work

AIF-C01 uses two question types CLF does not — **ordering** and **matching** —
and AWS awards **no partial credit** on either. The engine previously rendered
only single/multi-select, so he would have met that format cold on exam day.

`assets/exam-engine.js` now supports both:
- **Ordering** — click options in sequence; a numbered badge shows each
  position, clicking again removes and renumbers.
- **Matching** — one `<select>` per prompt. Deliberately NOT drag-and-drop,
  which is unusable with a keyboard and on a 390px phone.
- **Scored strictly**: every position must match, mirroring AWS.
- **`isAnswered()` added**: a half-filled ordering or matching question counts
  as unanswered in the palette and submit warning. Without this the palette
  would show it as done and it would silently score zero.
- **Review screen** names the exact mistake — which position was wrong and what
  he put there — and says so explicitly when a sequence was left incomplete.

`exams/build.cjs` validates both types (correct-length ordering with no
duplicate indices; one correct index per matching prompt) and allows the 3
options a matching question legitimately has.

**`exams/questions/aif-08.json`** is a dedicated drill: 4 ordering + 6 matching
+ 10 standard questions, so he practises the *format*, not just the content.

### 2. Full-length mock exams

`clf-mock-01` and `aif-mock-01`: **65 questions, 90 minutes** each, matching the
real papers' domain weightings (CLF 16/19/22/8; AIF 13/16/18/9/9). These build
exam-day stamina that 20-question quizzes cannot. The validator now accepts
either 20 or 65 questions per bank, with the proportional tolerance scaling by
length rather than being loosened.

Three questions in the AIF mock initially duplicated scenarios from existing
quizzes — the cross-bank duplicate check caught them and they were rewritten.

**Totals now: 17 CLF/AIF banks, 430 questions**, every one explained.

### Verified in-browser

Ordering: numbered badges, renumbering on removal, partial placement correctly
counting as unanswered. Matching: 4 rows, dropdowns, partial completion counts
as unanswered, stacks vertically at 390px with no overflow. Scoring: a single
swapped pair in ordering and one wrong match each cost the full mark (18/20,
then 19/20 with one swap) — confirming the all-or-nothing behaviour. Review
screen names the exact wrong positions. CLF mock verified at 65q/90min/700/~46.
**DVA regression re-checked**: still "full-length mock", 720, "Start exam",
`../exams.html`, and no new question types leaked into its banks.

## Still open

1. **Neither exam is booked.** The plan cannot be scheduled without dates. Ask.
2. **ESL +30 must be requested before booking** — one request covers *both*
   exams. Still the biggest lever, still unconfirmed as done.
3. **Team lead: does the company pay the fees?** 200 USD for both. Still unasked.
4. **Only one mock per certification.** A second would help closer to exam day,
   but only if his first attempt shows he needs it — build on evidence, not
   speculation.
5. **Quiz scores should drive what gets built next.** If AIF questions land
   below ~70%, write more questions in his weak domains rather than guessing now.
