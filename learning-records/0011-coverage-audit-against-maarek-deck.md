# 0011 — Coverage audit against the Maarek CLF deck: the "100% covered" claim was wrong

**Date:** 2026-08-12
**Status:** Active — corrects [0010](./0010-clf-track-built.md)

## What was asked

He supplied `AWS Certified Cloud Practitioner Slides v44.pdf` (Stephane Maarek,
516 slides, 19 sections) and asked to verify the CLF track covers everything
correctly.

## What was checked

Three sources compared mechanically, not by impression:

1. The **deck** — 516 slides, sectioned and inventoried by slide title.
2. The **official CLF-C02 exam guide** (fetched from AWS this session) —
   Appendix A's in-scope list, extracted to a flat list.
3. The **workspace** — all 7 CLF lessons + `clf-numbers.html` (238KB) and all 8
   CLF question banks (115KB), HTML tags stripped so tag boundaries could not
   split a phrase and produce a false "absent".

## The headline finding

**NOTES.md claimed "all 112 services on AWS's official in-scope list (verified
by script)". That claim is false in three ways:**

- The in-scope list has **127 services, not 112**.
- **No such script exists** anywhere in the repo.
- **18 in-scope services appear nowhere** in the workspace, and 2 more are
  tested in quizzes but never taught.

Coverage is **107/127 taught (84%)** — good, but not the "nothing is missing"
that lesson C7 tells him in its own opening paragraph. That sentence is the
real damage: it invites him to stop looking.

### The 18 absent services

Activate for Startups, Billing Conductor, Cloud9, CloudShell, CodeArtifact,
CodeCommit, CodeDeploy, CodeStar, Data Exchange, Device Farm, IQ, IoT
Greengrass, Launch Wizard, Network Firewall, Resource Groups and Tag Editor,
Transfer Family, MemoryDB for Redis, WorkSpaces Web.

Quiz-only (tested, never taught): AWS Management Console, Amazon OpenSearch
Service.

Note the cluster: **the entire developer-tools family is missing** (CodeCommit,
CodeDeploy, CodeArtifact, CodeStar, Cloud9, CloudShell). That is not 6 random
names — it is one whole appendix category, and it is the category his DVA
background would otherwise make cheap to learn.

## The more important finding: concept gaps outrank service gaps

Missing service *names* cost at most a recognition question each. These missing
**concepts** are taught heavily in the deck and carry far more exam weight:

| Gap | Why it matters |
|---|---|
| **ELB types — ALB / NLB / GWLB** | The deck gives NLB its own slide. "Which load balancer?" is a stock question. |
| **CloudWatch metrics / alarms / logs** | 5 deck slides. Monitoring is core Domain 3. Only the *name* CloudWatch appears in the lessons. |
| **SQS FIFO vs Standard + decoupling** | Decoupling is the exam's favourite architecture word; neither "FIFO" nor "decouple" appears anywhere. |
| **Route 53 routing policies** | 2 slides, incl. latency and failover — classic distractor set. |
| **The 7 Rs of migration** | 5 consecutive deck slides. Pure recall, cheap marks, entirely absent. |
| **Disaster recovery strategies** | Backup/restore, pilot light, warm standby, multi-site — none present. |
| **5 characteristics of cloud computing** | Domain 1 (24%) list question. |
| **CRR / SRR, DAX, Global Tables, Aurora Serverless** | Named service features the exam asks by name. |
| **IAM credentials report / access advisor** | The deck's "IAM Security Tools" slide, straight Domain 2 material. |
| **Penetration testing policy** | What you may test without approval — a known exam question. |
| **Cost Anomaly Detection** | Domain 4, and Domain 4 is his weakest area by design. |

## What this changes

The deck is **not** redundant with the workspace, which is what the "100%"
claim implied. It is the better spine for Domain 3 breadth, and the workspace
is the better retention/exam-technique layer — the same relationship the DVA
track has with the Udemy course.

**Rule going forward: no coverage claim without a committed script that
reproduces it.** The 112 figure was asserted, propagated into NOTES.md and into
C7's own text, and then trusted. A claim that cannot be re-run is a claim that
silently rots.

## Verified this session

- Support plans: the exam guide **still names the old ladder** verbatim in Task
  Statement 4.3 ("AWS Developer Support, AWS Business Support, AWS Enterprise
  On-Ramp Support, AWS Enterprise Support"). **Record 0010's warning is correct
  and still current** — keep teaching the old names.
- Domain weightings unchanged: D1 24%, D2 30%, D3 34%, D4 12%.
- Interesting: the deck (v44) has already moved to the **new** plan names
  (Basic, Business Support+, Enterprise, Unified Operations). So the deck and
  the exam guide now disagree with each other, exactly as 0010 predicted. The
  exam guide wins.

## Update, same day: all gaps closed, and this time it is checkable

He asked "ok now its covering all right??" after C8. The honest answer was no —
so rather than answer from memory (the exact failure that caused this record),
the audit was rewritten as a committed script and re-run.

**`scripts/check-clf-coverage.cjs`** (`npm run check:clf`) diffs the lessons and
quiz banks against `scripts/clf-inscope-services.txt` — Appendix A extracted
verbatim — plus a 22-entry concept list. It strips HTML tags before matching so
a tag boundary cannot split a phrase and fake a miss, and it distinguishes
*taught in lessons* from *quiz-only* (tested but never taught), which is how the
SCP gap below was caught.

Three lessons written:

| File | Lesson | Closes |
|---|---|---|
| `lessons/0063-clf-elb-monitoring-messaging.html` | C8 · ELB, CloudWatch, SQS, Route 53 | 4 concepts |
| `lessons/0064-clf-resilience-and-vocabulary.html` | C9 · Resilience & Domain 1 vocabulary | 9 concepts |
| `lessons/0065-clf-last-service-names.html` | C10 · The last 18 names | 18 services |

**Final state, reproducible by anyone running the script:**

```
SERVICES : 127/127 taught (100%)   ABSENT 0
CONCEPTS :  22/22  taught (100%)   ABSENT 0
RESULT: no gaps.
```

### What the quiz-only column caught

**Service Control Policies were tested in three questions across clf-05 and
clf-06 but taught in no lesson.** That is worse than an untaught topic — he
would have met SCPs first as a question he could not answer, with no page to
revise from. Added to C9. The same check cleared "deployment models", which was
genuinely taught and only missed the literal string "private cloud".

This is the argument for keeping the quiz-only distinction in the script rather
than collapsing it into a single covered/not-covered flag.

## Next

- The **7 Rs of migration** are named in C7 only in passing; the deck gives them
  five slides. If his practice scores show migration questions failing, that is
  the first thing to write.
- **Quiz banks have not been extended** to cover C8–C10's new material. The
  lessons teach it, but spaced retrieval will not reach it until questions exist.
  Build those on evidence — after he reports scores, not before.
