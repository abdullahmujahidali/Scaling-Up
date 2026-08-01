# 0008 — Mission pivot: AWS Certified Developer – Associate (DVA-C02)

**Date:** 2026-07-31
**Status:** Active — supersedes day-to-day priority of [MISSION.md](../MISSION.md) until the exam is passed

## What changed

The learner opened a new goal: pass an AWS certification exam, as soon as possible.
This is a genuine mission change, not a lesson topic. The original mission explicitly
listed *"Cloud-provider certification trivia (specific AWS/GCP exam details)"* as **out
of scope**. That exclusion is now deliberately reversed, with the learner's agreement.

A new [MISSION-AWS.md](../MISSION-AWS.md) was created rather than editing MISSION.md,
because the system design mission is **paused, not cancelled** — the learner will
return to it after the exam. 44 lessons of that track already exist and remain valid.

## The driver (this is the real "why")

Not personal curiosity — **a work expectation.** The learner's team lead, Abdullah
Ajmal, told the team to start doing certifications, and holds **AWS Certified
Developer – Associate** himself (issued March 2025, expires March 2028).

This matters for teaching: the mission is externally motivated and time-pressured.
Optimise for *passing*, not for comprehensive AWS understanding. Depth for its own
sake is off-mission here in a way it was not for system design.

## Which exam — and why the learner's own answer beat mine

I offered SAA-C03 as my recommendation before seeing evidence. The learner replied by
sharing screenshots of their Udemy library and the team lead's credential. That
evidence overturned my recommendation. **DVA-C02** was chosen because:

1. The learner is **88% complete** on Stephane Maarek's DVA-C02 course, and **0%** on the
   SAA one. Finishing 12% of a course is the fastest possible route to an exam date,
   and speed was the learner's stated top priority.
2. The team lead holds *this exact cert* — a real human to ask, and it matches what
   the company expects.
3. Python/Django backend work maps onto DVA (Lambda, API Gateway, DynamoDB, SDKs,
   IAM, CI/CD) far better than onto SAA (VPC, networking, infrastructure design).

**Lesson for me:** I asked a "which exam" question when the learner had context I
lacked. Asking was still right, but I should treat my pre-evidence recommendations as
provisional and say so. The learner's constraints (sunk course progress, team norms)
outranked the generic "SAA is more recognised" advice.

## The constraint that shapes every lesson

The learner said plainly: **"i am not that good at english so you have to help me with it."**

This is the single most important teaching input in this mission, because AWS exam
questions are *deliberately* wordy, with long scenarios and distractor options that
differ by one or two words. The exam is **English-only** — no translation is available
in the test centre.

Therefore:
- Roman Urdu toggle stays on everything (learner confirmed), **but practice questions
  stay in English**, with Roman Urdu available for the *explanation*. Practising in
  Urdu would train a skill that cannot be used on exam day.
- Every lesson teaches **exam English** alongside AWS: qualifying words (MOST
  cost-effective, LEAST operational overhead), and the "90%-correct option with one
  wrong word" trap (e.g. "ECS *with EC2 launch type*").
- A new `.english` component in `assets/exam.css` exists specifically for this.

## Decisions made

- **Pace:** 3–4 hours/day (learner's choice). Target exam date ~**21 August 2026**.
- **Lesson 1 is exam technique, not an AWS service.** Deliberate: the learner already
  has hands-on AWS experience, so the gap is not "what is Lambda" — it's converting
  that experience into exam points under time pressure in a second language. Reading
  technique pays off across all 50 scored questions; any single service pays off on ~2.
- **Numbered from 0045** to continue the existing sequence, and added as a new "AWS
  DVA-C02 (active)" section at the **top** of `nav.js`, above System Design.
- **New shared component `assets/exam.css`** — exam-shaped question blocks (deliberately
  styled to look dense and grey like the real exam, not friendly like `.quiz`),
  elimination tables, `.qual` highlighter for qualifying words, `.numbers`, `.english`.

## Verified facts (checked against the official AWS exam guide, not memory)

65 questions / **50 scored** + 15 unscored · 130 minutes · pass = **720**/1000 ·
compensatory scoring · no guessing penalty · 150 USD ·
domains: Development 32%, Security 26%, Deployment 24%, Troubleshooting & Optimization 18%.

Notable: the exam guide now lists **AI-assisted development** as an emerging (unscored,
pretest) topic. Worth knowing about, not worth studying.

## Built (2026-07-31 / 08-01)

Learner asked for **all four domains documented in detail at once**, not lesson-by-lesson
("i want you to create all detailed note section right now we have to focus on aws").
Honoured as asked — this is reference material, which is the right format for that
request, and it complements rather than replaces the one-concept-per-lesson rule
(that rule governs *lessons*, which remain short).

- `aws-index.html` — hub: domain cards, 3-week plan, exam-day checklist
- `reference/dva-domain1-development.html` (32%) — Lambda, DynamoDB, API GW, messaging
- `reference/dva-domain2-security.html` (26%) — IAM eval, STS, Cognito, KMS, secrets
- `reference/dva-domain3-deployment.html` (24%) — strategies, CFN/SAM, CI/CD files
- `reference/dva-domain4-troubleshooting.html` (18%) — CloudWatch, X-Ray, caching, errors
- `reference/dva-numbers.html` — 55-row printable cheat sheet, 10 starred as highest-yield

Every number was fetched from AWS documentation during the build, not recalled. Each
page carries a Sources list. Each has 3 exam-shaped practice questions with explanatory
feedback on both right and wrong answers, and a Django bridge section.

**Bug found and fixed during verification:** `nav.js` highlighted the Glossary link on
*any* `/reference/` page (`inReference` test). The five new AWS notes live in
`/reference/`, so they all wrongly lit up Glossary. Changed to an exact
`here === 'glossary.html'` match. Also added a `ref:` item kind so nav entries can point
at `/reference/` as well as `/lessons/`.

Verified in a real browser (local HTTP server, Playwright): all pages 200, all internal
links resolve, Roman Urdu toggle swaps and restores, quiz feedback and correct-answer
reveal both fire, nav highlight correct on both an AWS page and the glossary.

## Practice exams (2026-08-01)

Learner asked for "10-15 exams with results upon completing a test". Chose (with them)
**65-question full-length exams**, **all 15 built now**, **harder than the real exam**,
**all balanced 21/17/15/12**.

**Important exchange:** the learner asked *"all questions should be unique right? coming
from past exams with the same difficulty?"* — I confirmed uniqueness but corrected the
second half honestly: these are **not** real/leaked exam questions. Real DVA-C02 items are
confidential; anything sold as "dumps" is fabricated or NDA-breaking, and using them
violates the AWS Certification agreement and can void a certification. The questions are
written against the official exam guide's task statements, matching the real exam's
*format* and *traps* rather than reproducing its content. **Do not soften this if asked
again** — it protects their certification.

They then chose "harder than the real exam" so that 75-80%+ here implies comfortable
margin on exam day.

- `assets/exam-engine.js` — timer, flagging, question palette, keyboard shortcuts,
  localStorage resume, scaled scoring (100-1000, pass 720), per-domain breakdown,
  review mode with filters. Data-driven: each exam is just a QUESTIONS array.
- `assets/exam-runner.css` — deliberately plain/clinical, not friendly like `.quiz`;
  practising in a comfortable-looking UI does not prepare you for Pearson VUE.
- `exams/questions/exam-01..15.json` + `exams/build.js` — questions live as JSON and the
  HTML is generated, so the shell exists once rather than being copy-pasted 15 times.
  **Re-run `node exams/build.js` after editing any question file.**
- `exams.html` — hub with best/average scores and readiness advice keyed on the
  **average** (one lucky paper is not evidence of readiness).

**The build script is the guardrail.** It refuses to emit an exam that is not exactly 65
questions weighted 21/17/15/12, has a correct-index out of range, has a multi-select with
<2 answers, or **duplicates a scenario used in any other exam**. That last check is what
enforces the learner's uniqueness requirement mechanically rather than by my memory.
975 questions, zero duplicates.

**Bug found and fixed:** `nav.js` computed `toRoot` from `/lessons/` and `/reference/`
only, so nav links broke from the new `/exams/` directory. Added `inExams`. Exam pages
deliberately omit `nav.js` entirely — a sidebar during a timed exam is a distraction —
but each has a "Back to all exams" link.

Verified in a real browser: full 65-question run submitted with 10 deliberate wrong
answers scored exactly 55/65 with the correct per-domain split, review filters worked,
and the best score persisted to the hub. Test score cleared afterwards.

## Open threads

- **Book the exam date.** Nothing drives completion like a booked date. Also: ask the
  team lead whether the company reimburses the 150 USD or has vouchers.
- Buy a practice-exam course (Maarek or Neal Davis). Practice exams reveal gaps faster
  than re-watching videos — this is the highest-leverage purchase.
- Need a **DVA-C02 numbers reference sheet** (Lambda 15 min / 10 GB memory / 512 MB–10 GB
  ephemeral storage, SQS retention, DynamoDB item size, etc.). The exam tests exact numbers.
- Diagnostic needed: which of the four domains is weakest? Decide after the learner
  takes one full practice exam. Don't guess at the ordering of lessons before that data.
- Difficulty calibration for this track: unknown. Check after lesson A1.
