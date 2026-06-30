# System Design Resources

Curated, high-trust sources for a Python/Django backend engineer prepping for design interviews and real architecture work. Primary authors and recognized experts only — paywalled bootcamp marketing deliberately excluded.

## Knowledge

- [Book: _Designing Data-Intensive Applications_ ("DDIA") — Martin Kleppmann](https://dataintensive.net/)
  The book every serious backend engineer cites. Use for: durable mental models — replication, partitioning, consistency, consensus — that outlast any specific tech. 2nd edition landed March 2026; 1st edition (2017) is still the standard.

- [Repo: The System Design Primer — Donne Martin (~355k★)](https://github.com/donnemartin/system-design-primer)
  The most-starred open-source system design resource. Use for: breadth + interview drills — topic summaries, worked questions with diagrams, Anki flashcards.

- [Course: System Design — Karan Pratap Singh (free, book-style, ~44k★)](https://github.com/karanpratapsingh/system-design)
  Reads like a free textbook, networking fundamentals up through databases, brokers, microservices, patterns. Use for: building structured fundamentals from scratch (our default reading spine).

- [Visual: System Design 101 — ByteByteGo (free repo + PDF)](https://github.com/ByteByteGoHq/system-design-101)
  Complex systems explained in diagrams. Use for: quick visual reference. (Only the free repo/PDF — skip the paid courses.)

- [Book: _Database Internals_ — Alex Petrov](https://www.databass.dev/)
  Deep dive into storage engines (B-Trees vs LSM) and the distributed layer. Use for: "level 2" depth after DDIA, when you want to know what's actually inside the database.

- [YouTube: Gaurav Sen — System Design playlist](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)
  Interview-shaped fundamentals explained cleanly. Use for: load balancing, replication, caching as a ~15-20h video curriculum.

- [YouTube: Hussein Nasser — Backend Engineering](https://www.youtube.com/channel/UC_ML5xP23TOWKUcc-oAE_Eg)
  Backend depth and the "why" — Postgres internals, connection pooling, proxies, TCP/HTTP under load. Use for: depth that pairs directly with your Django/Python background.

## Wisdom (Communities)

- [r/ExperiencedDevs](https://www.reddit.com/r/ExperiencedDevs/)
  Mid-to-senior engineers, low hype. Use for: serious feedback on architecture decisions and senior-level interview prep.

- [r/systemdesign](https://www.reddit.com/r/systemdesign/)
  Topic-focused. Use for: post a design, get critique on tradeoffs (scaling, consistency, data modeling).

- [Blind](https://www.teamblind.com/)
  Anonymous, company-verified. Use for: what specific companies' design interviews actually look like. (Ignore the comp/rumor noise.)

## Suggested path
Karan Pratap Singh handbook (fundamentals) → System Design Primer + Gaurav Sen (interview drills) → DDIA (mental models) → Database Internals + Hussein Nasser (depth). Communities for live feedback throughout.

## Gaps
- No resource yet specifically chosen for *back-of-envelope estimation* practice (latency numbers, capacity math). The Primer covers it lightly; may want a dedicated drill source later.
