# Mission: Becoming a Top-Tier Backend Engineer

## Why

You're a Python/Django backend engineer who wants to operate at a more senior level — top-1%. Concretely: pass FAANG-style "design X" interviews, make better architecture calls on real systems at work, and use both to get promoted. The underlying goal is to become the person in the room who can confidently reason about how large systems are built *and* why the code and database underneath actually behave the way they do. A worry driving this: AI now writes a lot of your code, and you feel your own depth (recall, fundamentals) eroding — so this course deliberately rebuilds judgment that lives in *your* head, not the AI's.

## Two tracks (they reinforce each other)

- **Track A — System Design.** How large systems are built and the tradeoffs. Follows the System Design Primer in order. (Framework, consistency, availability, load balancing, caching, … databases, queues.)
- **Track B — Backend Depth.** Why the code and data underneath behave as they do: Python internals (GIL, memory, generators, async), Django/ORM depth (N+1, lazy querysets, select_related), and database internals (indexes, EXPLAIN, transactions, locking).

Lessons **alternate** between the two tracks — one system-design lesson, then one depth lesson. Interleaving also aids retention.

## Success looks like

- You can run a 45-minute "design X" interview end-to-end with a clear framework (requirements → estimates → high-level design → deep dives → tradeoffs) without freezing.
- At work, you can look at a scaling or reliability problem and reason out loud about the options and their tradeoffs, then justify a decision.
- You can explain core distributed-systems ideas (replication, sharding, caching, consistency, queues) in plain language and apply them to a concrete design.
- You can explain *why* backend code and databases behave as they do — read an EXPLAIN, spot an N+1, know what the GIL does — without reaching for AI first.
- You build vocabulary and judgment, not just memorized answers — you know *when* to reach for each tool.

## Constraints

- Background: strong Python + Django; weak/uncertain across all system design areas (self-assessed). Start near the fundamentals, but move fast where Django already gave intuition (databases, request/response, ORM, migrations).
- Lessons must be short, simple plain English, human tone — not too long, not too thin. Each lesson = one tangible win.
- Preferred learning styles: active-recall quizzes, real-world "traffic 10x'd" scenarios, diagrams/visuals, and tradeoff drills (forced choices with feedback).

## Out of scope (for now)

- Frontend, mobile, ML systems design.
- Deep math-heavy distributed-systems proofs (consensus algorithm internals like Paxos line-by-line) — we'll cover the *intuition* and tradeoffs, not the formal proofs, until the fundamentals are solid.
- Cloud-provider certification trivia (specific AWS/GCP exam details).
