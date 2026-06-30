# Notes & Preferences

## Learner profile
- Backend engineer, strong Python + Django. Has built real apps with the ORM, migrations, request/response cycle.
- Self-rates as weak across all four system design areas (databases, scaling/caching, distributed theory, async/messaging) — but Django gives a head start on database and request-handling intuition. Use that bridge constantly: "you already know X from Django, here's how it generalizes."

## How they want to be taught
- Simple, plain English. Human tone. Not too lengthy, not too short.
- Wants ALL of: quizzes/active recall, real-world scenarios ("traffic 10x'd"), diagrams/visuals, tradeoff drills.
- Goal blends interview prep + on-the-job architecture + promotion. Frame lessons so they serve all three: teach the concept, then show both "how this comes up in an interview" and "how this bites you at work."

## Teaching approach
- Each lesson: one tangible win, in their zone of proximal development.
- Lean on the Django bridge to lower difficulty during knowledge acquisition.
- Use desirable difficulty for skills: retrieval practice, spacing (revisit prior concepts), interleaving (mix related ideas in drills).
- Every lesson ends with a primary source + a reminder to ask me (the teacher) followup questions.

## Lesson design rules (HARD constraints — learner struggled when violated)
- **ONE concept per lesson.** Never pack 2-3 big ideas into one page. Lesson 2's original version (consistency + failover + nines math) was too much — learner said "too much at once." Split dense Primer sections across multiple short lessons.
- **Analogy-first.** Learner learns best from a simple everyday (non-tech) analogy, THEN map each part of the analogy to the technical concept, THEN the Django/work example. Order: analogy → mechanism → real example.
- Speed of coverage is not the goal. A learner who deeply gets one idea > a learner who skimmed three.

## Steering decisions (learner stated these directly)
- **Path: follow ONE source in order.** Learner does NOT want me choosing topics top-down. March through a single resource section by section. Default spine = the System Design Primer (already started it: Consistency & Availability). Confirm the source with them; don't free-style a curriculum.
- **The real goal is RETENTION, not coverage.** Learner self-describes as forgetting things easily, and worries AI is eroding their recall. They want lessons that "stick after one read." Reframe: nothing sticks from one read — so BUILD SPACED RETRIEVAL INTO THE COURSE. Every new lesson opens with a ~30-sec recall of the previous lesson(s). Learner should never have to organize their own review; the course spaces it for them.
- **System design specifically must live in THEIR head, not the AI's.** They lean on AI for coding (fine), but design judgment is what they carry into interviews / design reviews / promotion conversations — can't be outsourced. So weight lessons toward retrieval + reasoning-out-loud over info-dumps.
- Difficulty calibration: TBD — learner hadn't finished Lesson 1 when asked. Revisit after they've done a couple.

## Open threads / next ideas
- Glossary will be important here (CAP, sharding, replication, idempotency, etc.) — build it as terms are genuinely understood, not on first exposure.
- Lesson 1 candidate: the system design interview FRAMEWORK itself — gives an immediate interview win and a scaffold to hang every later lesson on.
