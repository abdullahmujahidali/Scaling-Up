# System Design Glossary

The canonical vocabulary for this course. All lessons use these exact terms. A term lands here only once it's genuinely understood — not on first exposure.

## Terms

**Consistency**:
How fresh a read is after a write — whether a later read sees the change. A choice on a spectrum, not a yes/no.
_Avoid_: Accuracy, correctness (too vague)

**Weak consistency**:
After a write, a read may never see it — best effort. Good when stale-for-a-moment is harmless and speed matters most (e.g. video chat).

**Eventual consistency**:
After a write, reads will see it after a short asynchronous delay (often milliseconds). Copies sync in the background. Seen in DNS, email, and database read replicas.
_Avoid_: Delayed consistency, loose consistency

**Strong consistency**:
After a write, every subsequent read immediately sees it. Copies update synchronously. Seen in bank balances and classic RDBMS transactions.

**Synchronous**:
The write isn't "done" until all copies agree. Drives strong consistency.

**Asynchronous**:
Write now, copy to others later. Drives eventual consistency.

**Availability**:
Whether the system stays up, especially when a machine fails. Measured as uptime percentage ("nines").

**Failover**:
Keeping a spare or twin server so the system survives one dying.
_Avoid_: Fallback, backup (mean other things)

**Active–passive failover**:
One server serves traffic; a standby waits and exchanges a heartbeat. When the heartbeat stops, the standby takes over the IP. (Old name: master-slave.)

**Active–active failover**:
Both servers serve traffic and split load; if one dies the other absorbs it. Everyone (DNS or app code) must know both. (Old name: master-master.)

**Heartbeat**:
A regular "still alive?" signal between servers, used to detect failure.

**Nines**:
Shorthand for availability percentage by counting leading nines. 99.9% = three nines; 99.99% = four nines. More nines = less allowed downtime.

**Availability in sequence**:
When a request must pass through multiple components in a chain, their availabilities multiply (A × B), so the total drops below any single one.

**Availability in parallel**:
When redundant components can each serve the request, availability rises: 1 − (1−A)(1−B). A backup only fails if both fail at once.

## Scaling & Caching

**Load balancer**:
One front door that spreads incoming requests across many servers, skips unhealthy ones, and removes a single choke point.

**Horizontal scaling**:
Handling more load by adding more (cheap) servers behind a load balancer.
_Avoid_: scaling out (as jargon)

**Vertical scaling**:
Handling more load by making one server bigger/faster. Simple, but hits a ceiling.

**Stateless (server)**:
A server that keeps no private per-user memory, so any server can handle any request. Shared state (sessions) lives in a database or shared cache. Required for horizontal scaling behind a load balancer.

**Layer 4 vs Layer 7**:
Layer 4 routes by the "envelope" (IP addresses and ports) — fast, doesn't read content. Layer 7 reads the request (URL, cookies) and routes smartly — flexible, more work.

**Cache**:
A small, fast store of copies of frequently used data, kept close to avoid re-doing expensive work. Faster, but copies can go stale.

**Cache hit / miss**:
A hit = data was in the cache (instant). A miss = it wasn't, so fetch from the source and usually store a copy.

**Cache-aside**:
Default strategy: app checks the cache, and on a miss reads the database then fills the cache. Simple; first read is slow and data can go stale.
_Avoid_: lazy loading (as the only name)

**Write-through**:
Write to cache and database together, so the cache is never stale — at the cost of slightly slower writes.

**Cache invalidation**:
Knowing when a cached copy is out of date and refreshing/removing it. Famously hard. A TTL (timeout) is the simplest form.

## Python Internals

**GIL (Global Interpreter Lock)**:
A single lock that lets only one thread run Python code at a time (in the default build). Being made optional from Python 3.13–3.14 onward.

**CPU-bound**:
Work limited by processing power (math, parsing, image resize). Threads don't speed it up because of the GIL — use multiple processes.

**I/O-bound**:
Work limited by waiting (network, disk, database). Threads (and async) help: a waiting thread drops the GIL so others run.

**Thread vs process**:
Threads in one process share one GIL (good for I/O-bound work). Separate processes each get their own GIL (good for CPU-bound work — real multi-core use).

**async / await**:
One worker overlapping many I/O waits by switching at each `await` (cooperative). Very lightweight; scales to thousands of waits. Helps I/O-bound work only, not CPU.

**Event loop**:
The single loop that runs async tasks, switching at each `await`. A blocking call freezes it and stalls every task.

## Data Integrity

**Transaction**:
A group of database steps treated as all-or-nothing. The "A" (atomicity) in ACID. Django: `transaction.atomic()`.

**Race condition**:
Two operations running at the same time that read-then-write the same data, producing a wrong result (e.g. selling one seat twice).

**Lock**:
Reserves a row so only one transaction can touch it at a time; others wait. Prevents race conditions. Django: `select_for_update()`. Overuse risks deadlocks.

## Delivery & Structure

**DNS (Domain Name System)**:
The internet's phone book: name (example.com) → IP address. Cached with a TTL. A record = name→IP; CNAME = name→another name.

**CDN (Content Delivery Network)**:
Global servers holding copies of static files near users, for speed. Push = you upload up front; Pull = fetched on first request then cached.

**Monolith**:
One application that does everything, deployed as a unit. Simple; can be coupled. Often the right default.

**Microservices**:
Splitting an app into many small, independently deployable services talking over the network. Buys independence, pays in complexity.

**REST**:
API style: resources (nouns) at URLs, acted on by a small set of HTTP verbs, with self-describing status codes. Good for public APIs.

**RPC**:
Calling a named function on a remote server (exposes actions). Fast, tightly coupled — good for internal service-to-service calls (gRPC).

**Idempotent**:
Safe to repeat with the same result (GET, PUT, DELETE are; POST usually isn't). Important for safe retries.
