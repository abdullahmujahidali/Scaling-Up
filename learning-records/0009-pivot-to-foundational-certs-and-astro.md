# 0009 — Pivot to Foundational certs (CLF first), and the Astro migration

**Date:** 2026-08-03
**Status:** Active — supersedes the day-to-day priority set in [0008](./0008-pivot-to-aws-dva-c02.md)

## What changed, and who decided it

The learner's team lead redirected the plan: **do the Foundational certs first**
— AI Practitioner and Cloud Practitioner — with Developer Associate later. His
message described the AWS ladder (Foundational → Associate → Professional),
noted you are not limited to one cert per layer, and closed with "go with AI
Practitioner and Cloud Practitioner". The learner confirmed: *"we need to go with
AI Practioner and Cloud Practionar first he said that will come later."*

Order chosen with the learner: **CLF-C02 first**, AIF-C01 next, DVA-C02 later.

I argued for finishing DVA first (88% of a course already done, all material
built, DVA covers CLF as a subset). The learner's team lead outranks that
reasoning — it is a work expectation, not a preference. Recorded because the
argument should not be re-litigated.

**A correction worth keeping:** the CLF pages initially claimed the learner was
"88% through a DVA course" and that "the DVA work isn't wasted". He stopped me:
*"i havent done anythign of DV02 so dont say anything that in clf."* The 88%
figure came from [0008](./0008-pivot-to-aws-dva-c02.md) and describes a **Udemy
course**, not exam preparation — carrying it onto the CLF page turned it into a
false claim about work he had not done. All such claims are removed. What is
true and still used: he has hands-on AWS from his day job, and billing/pricing
is the domain his work never exposes him to.

## CLF-C02 facts (verified against AWS on 2026-08-03)

65 questions / 50 scored · **90 minutes** · **100 USD** · pass **700**/1000 ·
domains: Cloud Technology & Services 34%, Security & Compliance 30%, Cloud
Concepts 24%, **Billing, Pricing & Support 12%**.

That last domain is the teaching priority: it is small but it is the part a
developer's daily work never touches, and where marks get lost.

## ESL +30 — the highest-value discovery in this whole mission

AWS grants non-native English speakers **30 extra minutes** on request
("ESL +30 MINUTES"): free, no documentation, requested once, and it then applies
to every future AWS exam. For CLF that is 90 → **120 minutes**.

⚠️ **It must be requested BEFORE booking** or it does not apply to that booking.

Given that English is the binding constraint of this entire mission (see
[0008](./0008-pivot-to-aws-dva-c02.md)), this is the single largest lever
available. Steps are in `src/content-html/reference/dva-booking-guide.html`.
The learner surfaced it himself ("i heard you can get extra time or what maybe?")
— worth remembering that he is a source of leads, not only a recipient.

## The workspace is now an Astro site

Migrated from 81 hand-written HTML files. I first argued against a framework and
shipped a smaller fix (`page.js`); the learner asked for Astro anyway, which is
a reasonable call — the migration only gets more expensive as pages accumulate.

Structure and the editing workflow are documented in [README.md](../README.md);
do not restate them here. The parts that are decisions rather than description:

- **Astro 5, deliberately pinned.** Astro 6+ requires Node ≥22.12; this machine
  and CI run Node 20. Two dependabot PRs (#2, #3) would have installed Astro 6/7
  and broken the build — closed with that reasoning, not merged. Remaining audit
  findings are all `sharp`, reachable only via image optimisation that this
  site never calls, and build-time only.
- **Content is imported `?raw` and rendered with `set:html`.** Lesson bodies are
  full of `data-ur="…"` attributes containing quotes and entities; `.astro`
  files parse as JSX-ish and would corrupt them. Keep this pattern.
- **`build.format: 'file'`** so URLs stay `/lessons/x.html` and no existing link
  needed rewriting.
- **Exam pages stay generated** by `exams/build.js` and are copied in by a build
  hook, along with `assets/`. They are deliberately excluded from the Astro
  pipeline.

## Deployment — was broken, now verified

Live at **https://abdullahmujahidali.github.io/Scaling-Up/**

Two bugs found and fixed before they reached anyone:

1. The Pages workflow uploaded `path: '.'` — correct when the site was root-level
   HTML, but those files no longer exist. The next push would have deployed an
   empty site. It now runs `npm ci && npm run build` and publishes `dist/`.
2. Asset URLs were absolute (`/assets/…`) while project Pages serve from
   `/<repo>/`, so every stylesheet would have 404'd. Fixed with Astro's `base`,
   fed by `BASE_PATH` in CI. Verified live.

## Design direction

The theme was rebuilt around one idea: **this is a study instrument**, read for
hours, in a second language, after a full work day — not a marketing page.
Rationale is in the header comment of `assets/lesson.css`. Two measurable
decisions: the reading measure went **74 → 62 characters**, and the body face is
a **humanist sans, not a serif**, because letterform clarity matters more than
prestige when decoding technical English as a second language.

The home page was rebuilt after the learner said *"i am unable to figure and go
through things easily."* The cause was structural, not stylistic: ~45 identical
cards with no answer to "what do I do now?". It now leads with a single primary
action, then three concrete jobs, then scannable groups.

## Attribution

The learner asked that Claude never appear as a commit co-author. Set globally in
`~/.claude/settings.json` via `attribution.commit/pr = ""`, and the trailer was
stripped from all 20 prior commits (`git filter-branch`, force-pushed). Trees
were verified byte-identical before pushing; a `backup-before-rewrite` branch
exists locally. **Do not reintroduce the trailer.**

## Open threads

- **Nothing is booked.** The learner confirmed he had not booked any exam, so
  there is no cancellation to chase.
- **CLF content is not built.** Only the hub (`clf-index.html`) exists. Lessons,
  notes and practice exams are all outstanding — the learner asked for a "full
  track like DVA".
- **No exam date.** The study plan cannot be scheduled until he books and reports
  the date.
- **Unasked:** whether the company reimburses the 100 USD or holds vouchers.
- **AI Practitioner** is a nav placeholder only; nothing is built.
