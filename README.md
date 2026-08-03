# Scaling Up

A personal, interactive **system-design course** for a backend engineer leveling up. Built lesson-by-lesson with an AI teacher (`/teach`), grounded in high-trust sources, and tuned to one learner: a Python/Django engineer prepping for design interviews, better on-the-job architecture, and promotion.

The name has two meanings: scaling *systems*, and scaling *yourself*.

> **Not a generic course.** Every lesson traces back to [`MISSION.md`](./MISSION.md) and is pitched at the learner's current level. Lessons lean on Django intuition to make new ideas land faster.

## Running it

The site is built with [Astro](https://astro.build). Two commands:

```bash
npm install     # once
npm run dev     # http://localhost:4321 — live reload while editing
npm run build   # writes the static site to dist/
```

`npm run exams` regenerates the practice exams from their JSON question files
(see "Editing" below).

> Astro **4.x** is pinned deliberately: Astro 5+ requires Node ≥22.12 and this
> machine runs Node 20. Upgrade Node first if you want to move up.

## How to use this

1. Run `npm run dev` and open a lesson in the browser.
2. Do the lesson: read, hit the quizzes, flip the recall cards. **Retrieving from memory is the point** — don't just read.
3. Read the **primary source** linked at the bottom of each lesson.
4. Ask your teacher followup questions. The lessons are the scaffold; the conversation is where it sticks.

## What's where

| Path | What it is |
|------|------------|
| [`MISSION.md`](./MISSION.md) · [`MISSION-AWS.md`](./MISSION-AWS.md) | The *why*. The north star every lesson serves. |
| `src/pages/` | One thin `.astro` file per page. Sets the title and picks the layout. |
| `src/content-html/` | The actual lesson/reference content, as plain HTML. **Edit here.** |
| `src/layouts/Base.astro` | The shell every page shares — head, stylesheets, sidebar, language toggle. Change once, changes everywhere. |
| [`assets/`](./assets/) | Shared CSS/JS: `lesson.css` (theme), `nav.js` (sidebar), `i18n.js` (Roman Urdu toggle). |
| [`exams/`](./exams/) | Practice exams. `questions/*.json` is the source; `build.js` generates the HTML. |
| [`GLOSSARY.md`](./GLOSSARY.md) | The canonical vocabulary. One agreed word per concept. |
| [`RESOURCES.md`](./RESOURCES.md) · [`RESOURCES-AWS.md`](./RESOURCES-AWS.md) | Curated high-trust sources + communities. |
| [`learning-records/`](./learning-records/) | What's been learned and why — steers what gets taught next. |
| [`NOTES.md`](./NOTES.md) | Teaching preferences and working notes. |

## Editing

- **Lesson text** → edit the matching file in `src/content-html/`. It is plain
  HTML; the `data-ur="…"` attribute on an element holds its Roman Urdu version.
- **A new page** → add both `src/content-html/<name>.html` and a small
  `src/pages/<name>.astro` next to an existing one (copy the two-line pattern).
- **The sidebar** → `assets/nav.js`, the `COURSE` array at the top. One entry
  per page; tracks are the `header: true` rows.
- **Styling** → `assets/lesson.css`. After changing any CSS or JS, bump the
  `const v` cache-buster in `src/layouts/Base.astro` so browsers refetch it.
- **Exam questions** → edit `exams/questions/exam-NN.json`, then run
  `npm run exams`. Editing `exams/exam-NN.html` directly is wasted work; it is
  regenerated. The build script refuses malformed or duplicated questions —
  if it complains, fix the question rather than weakening the check.

## Lessons so far

Two tracks that **alternate**: **System Design** (how big systems are built) and **Backend Depth** (why the code & database behave as they do).

👉 **New here? Start with the [This Week plan](./src/content-html/this-week.html)** — a paced 7-day path through both tracks.

**Track A — System Design**
1. **[The Design Framework](./src/content-html/lessons/0001-the-design-framework.html)** — the 5-step script (Scope → Estimate → Draw → Deep-dive → Trade off) for any "Design X" question.
2. **Consistency & Availability**, split into three short lessons:
   - **[2a · Consistency](./src/content-html/lessons/0002-consistency-and-availability.html)** — weak / eventual / strong, via a whiteboard story.
   - **[2b · Failover](./src/content-html/lessons/0003-failover.html)** — active-passive vs active-active, via a shop with a spare cashier.
   - **[2c · The "Nines"](./src/content-html/lessons/0004-the-nines.html)** — measuring uptime; why chains multiply down and backups multiply up.
3. **[Load Balancers](./src/content-html/lessons/0005-load-balancers.html)** — the host at the door; horizontal scaling; stateless servers.
4. **[Caching](./src/content-html/lessons/0006-caching.html)** — desk vs archive; cache-aside vs write-through; staleness.
5. **[CAP Theorem](./src/content-html/lessons/0008-cap-theorem.html)** — pick two when the network breaks; CP vs AP.
6. **[SQL vs NoSQL](./src/content-html/lessons/0010-sql-vs-nosql.html)** — filing cabinet vs labeled boxes; ACID vs BASE; when to choose which.
7. **[Replication & Sharding](./src/content-html/lessons/0012-replication-and-sharding.html)** — copy for reads vs split for size; the scaling ladder.
8. **[Message Queues & Async](./src/content-html/lessons/0013-message-queues.html)** — queues + background workers (Celery); back pressure.
9. **[DNS & CDN](./src/content-html/lessons/0014-dns-and-cdn.html)** — how a request finds you; the phone book and global file warehouses.
10. **[Monolith vs Microservices](./src/content-html/lessons/0016-monolith-vs-microservices.html)** — one big app or many small; the honest tradeoff.
11. **[API Design (REST)](./src/content-html/lessons/0017-api-design-rest.html)** — nouns, verbs, status codes; the why under DRF.
12. **[Capstone: Design a URL Shortener](./src/content-html/lessons/0019-design-walkthrough-url-shortener.html)** — a full "Design X" using every tool so far.

**Track B — Backend Depth**
- **[B1 · The GIL](./src/content-html/lessons/0007-the-gil.html)** — why Python threads don't split CPU work; threads vs processes vs async.
- **[B2 · Database Indexes](./src/content-html/lessons/0009-database-indexes.html)** — the back-of-book index; reading EXPLAIN; the read/write tradeoff.
- **[B3 · The N+1 Query Trap](./src/content-html/lessons/0011-n-plus-1-queries.html)** — the invisible Django ORM bug; select_related / prefetch_related.
- **[B4 · Transactions & Locking](./src/content-html/lessons/0015-transactions-and-locking.html)** — atomic transactions; race conditions; select_for_update.
- **[B5 · async / await](./src/content-html/lessons/0018-async-await.html)** — overlapping I/O waits; when async beats threads; don't block the event loop.

**Plans:** [Week 1](./src/content-html/this-week.html) · [Week 2](./src/content-html/this-week-2.html)

## The learning model

Three ingredients, by design:

- **Knowledge** — pulled from trusted sources (see `RESOURCES.md`), never from guesses.
- **Skills** — built through interactive quizzes, scenarios, and tradeoff drills with instant feedback.
- **Wisdom** — earned by testing ideas in real communities (also in `RESOURCES.md`).

Lessons use *desirable difficulty* — active recall, spacing, interleaving — because struggling to remember is what builds lasting retention, not re-reading.

---

*Built with the `/teach` workflow. To continue, open the workspace and ask the teacher for the next lesson — or a dry-run of any concept.*
