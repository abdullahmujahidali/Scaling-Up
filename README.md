# Scaling Up

A personal, interactive **system-design course** for a backend engineer leveling up. Built lesson-by-lesson with an AI teacher (`/teach`), grounded in high-trust sources, and tuned to one learner: a Python/Django engineer prepping for design interviews, better on-the-job architecture, and promotion.

The name has two meanings: scaling *systems*, and scaling *yourself*.

> **Not a generic course.** Every lesson traces back to [`MISSION.md`](./MISSION.md) and is pitched at the learner's current level. Lessons lean on Django intuition to make new ideas land faster.

## How to use this

1. Open the latest lesson in [`lessons/`](./lessons/) in your browser — they're self-contained HTML.
2. Do the lesson: read, hit the quizzes, flip the recall cards, play with the interactive bits. **Retrieving from memory is the point** — don't just read.
3. Read the **primary source** linked at the bottom of each lesson.
4. Ask your teacher followup questions. The lessons are the scaffold; the conversation is where it sticks.

## What's where

| Path | What it is |
|------|------------|
| [`MISSION.md`](./MISSION.md) | The *why*. The north star every lesson serves. |
| [`lessons/`](./lessons/) | The course. Numbered HTML lessons (`0001-…`, `0002-…`). Start here. |
| [`reference/`](./reference/) | Compressed cheat-sheets to revisit later (lessons are read once; references are read often). |
| [`GLOSSARY.md`](./GLOSSARY.md) | The canonical vocabulary. One agreed word per concept. |
| [`RESOURCES.md`](./RESOURCES.md) | Curated high-trust sources + communities. No bootcamp marketing. |
| [`learning-records/`](./learning-records/) | What's been learned and why — steers what gets taught next. |
| [`assets/`](./assets/) | Shared components (the stylesheet every lesson links). |
| [`NOTES.md`](./NOTES.md) | Teaching preferences and working notes. |

## Lessons so far

Two tracks that **alternate**: **System Design** (how big systems are built) and **Backend Depth** (why the code & database behave as they do).

**Track A — System Design**
1. **[The Design Framework](./lessons/0001-the-design-framework.html)** — the 5-step script (Scope → Estimate → Draw → Deep-dive → Trade off) for any "Design X" question.
2. **Consistency & Availability**, split into three short lessons:
   - **[2a · Consistency](./lessons/0002-consistency-and-availability.html)** — weak / eventual / strong, via a whiteboard story.
   - **[2b · Failover](./lessons/0003-failover.html)** — active-passive vs active-active, via a shop with a spare cashier.
   - **[2c · The "Nines"](./lessons/0004-the-nines.html)** — measuring uptime; why chains multiply down and backups multiply up.
3. **[Load Balancers](./lessons/0005-load-balancers.html)** — the host at the door; horizontal scaling; stateless servers.
4. **[Caching](./lessons/0006-caching.html)** — desk vs archive; cache-aside vs write-through; staleness.

**Track B — Backend Depth**
- **[B1 · The GIL](./lessons/0007-the-gil.html)** — why Python threads don't split CPU work; threads vs processes vs async.

## The learning model

Three ingredients, by design:

- **Knowledge** — pulled from trusted sources (see `RESOURCES.md`), never from guesses.
- **Skills** — built through interactive quizzes, scenarios, and tradeoff drills with instant feedback.
- **Wisdom** — earned by testing ideas in real communities (also in `RESOURCES.md`).

Lessons use *desirable difficulty* — active recall, spacing, interleaving — because struggling to remember is what builds lasting retention, not re-reading.

---

*Built with the `/teach` workflow. To continue, open the workspace and ask the teacher for the next lesson — or a dry-run of any concept.*
