# AWS DVA-C02 Resources

Sources for the [AWS Developer Associate mission](./MISSION-AWS.md). Official AWS
material first — the exam is written by AWS, so AWS's own wording is the highest-trust
source. Third-party material only where it demonstrably helps.

## Tier 1 — Official AWS (trust these over everything else)

- [**Official DVA-C02 Exam Guide**](https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html)
  The contract. Domains, weightings, in-scope services, out-of-scope services, and the
  exact task statements you will be tested on. Read the whole thing once — it is short.
  Everything in this course maps back to a task statement in here.

- [**Official DVA-C02 Exam Guide (PDF)**](https://docs.aws.amazon.com/pdfs/aws-certification/latest/developer-associate-02/developer-associate-02.pdf)
  Same content, printable. Good for annotating "confident / shaky / no idea" per task statement.

- [**AWS Certified Developer – Associate certification page**](https://aws.amazon.com/certification/certified-developer-associate/)
  Registration, cost (150 USD), retake policy, official sample questions.

- [**Schedule an AWS Certification Exam**](https://aws.amazon.com/certification/certification-prep/testing/)
  How to book: aws.training → Certification → AWS Certification Account → Schedule New
  Exam → Pearson VUE. Online-proctored is available 24/7 from home. Reschedule allowed
  up to 24 hours before.

- [**AWS Skill Builder — Official Practice Question Set (free, 20 questions)**](https://skillbuilder.aws/)
  Written by AWS. The closest thing to real exam wording that exists for free. Worth more
  than 200 third-party questions for calibrating *how questions are phrased*.

- [**AWS Well-Architected Framework**](https://aws.amazon.com/architecture/well-architected/)
  The exam's hidden answer key. When a question asks for "best practice", it means
  Well-Architected. Skim the Security and Operational Excellence pillars.

## Tier 2 — The content spine (already in progress)

- **Udemy: Ultimate AWS Certified Developer Associate 2026 (DVA-C02) — Stephane Maarek**
  Already **88% complete**. This is the primary teaching source; this workspace is the
  retention layer on top of it. Finish the remaining 12% first — it is the fastest
  available win.

- **Udemy: Practice Exams — AWS Certified Developer Associate (Stephane Maarek / Neal Davis)**
  The single highest-value purchase for exam readiness. Practice exams reveal *which*
  gaps exist far faster than re-watching videos. Deliberately run harder than the real
  exam — 75%+ on these means comfortable pass territory.

## Tier 3 — Reference while practising

- [**AWS Service Quotas / Limits documentation**](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html)
  The exam loves specific numbers (Lambda timeout, payload sizes, SQS retention).
  Our own [DVA-C02 Numbers reference](./reference/) sheet is the compressed version.

- [**AWS Lambda Developer Guide**](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
  Domain 1 is 32% of the exam and Lambda is its centre of gravity.

- [**Amazon DynamoDB Developer Guide**](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
  Heavily tested: partition/sort keys, LSI vs GSI, capacity modes, streams.

- [**AWS IAM Policy Evaluation Logic**](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
  Domain 2 is 26%. Explicit deny > explicit allow > implicit deny. Guaranteed exam points.

## Wisdom (communities)

- [**r/AWSCertifications**](https://www.reddit.com/r/AWSCertifications/)
  The single best community for this specific goal. People post detailed "passed DVA-C02,
  here's what was actually on it and what I'd do differently" write-ups almost daily.
  Search it before booking, and post your own after passing.

- **Your team lead, Abdullah Ajmal** — holds this exact certification (issued March 2025).
  The highest-value resource on this list and the only one that knows your context.
  Ask him: which practice exams he used, how the real exam compared, whether the company
  reimburses the 150 USD, and whether there is a company voucher.

- [**AWS re:Post**](https://repost.aws/)
  AWS's official Q&A. Use when documentation is ambiguous about actual behaviour.

## English-language support (learner-specific)

The exam is English-only and deliberately wordy. These are for exam-English, not AWS:

- Our own **Exam English reference sheet** (in `./reference/`) — the qualifying words
  that decide answers: MOST cost-effective, LEAST operational overhead, FASTEST, MINIMUM
  changes to code. These words are the answer, and they are easy to miss when reading fast.

## Gaps / to decide

- Whether the company pays for the exam and for practice-exam courses — ask the team lead.
- Whether to test at a Pearson VUE centre or online-proctored from home.
