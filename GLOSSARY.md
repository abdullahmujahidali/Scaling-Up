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
