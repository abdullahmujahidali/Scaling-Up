> **⚠️ SUPERSEDED 2026-08-03.** The team lead redirected the plan to the
> Foundational certs first: **Cloud Practitioner (CLF-C02) is the active
> mission**, AI Practitioner next, and this DVA-C02 track later. See
> [learning record 0009](./learning-records/0009-pivot-to-foundational-certs-and-astro.md).
> Everything below remains accurate about DVA-C02 itself and is kept for when
> that track resumes — but the learner has **not started** DVA preparation, and
> the "88% complete" figure refers to a Udemy course, not exam progress.

# Mission: Pass AWS Certified Developer – Associate (DVA-C02)

> This is a **second, parallel mission** in this workspace. The original
> [MISSION.md](./MISSION.md) (system design + backend depth) is paused, not cancelled.
> That mission explicitly ruled certification trivia out of scope — this file is the
> deliberate, learner-approved exception. See learning record 0008.

## Why

Abdullah's team lead (Abdullah Ajmal) has told the team to start doing AWS
certifications. The team lead himself holds **AWS Certified Developer – Associate**
(issued March 2025). So this is a work expectation with a known target and a
colleague who has already walked the path.

Abdullah has used AWS for a while in real work but has never sat any certification
exam. The goal is not to learn AWS from zero — it is to convert existing hands-on
experience into a **pass**, quickly, while closing the specific gaps the exam tests
that day-to-day work never forces you to learn.

He is already **88% through Stephane Maarek's Ultimate AWS Certified Developer
Associate 2026 (DVA-C02)** course on Udemy. That course is the content spine.
This workspace is **not** a replacement for it — it is the retention and
exam-technique layer on top of it.

## Why DVA-C02 and not SAA-C03

Decided 2026-07-31, with the learner:

- 88% of the DVA course is already done; 0% of the SAA course. Fastest route to an exam date.
- The team lead holds the same cert — a real person to ask questions of, and it matches company expectations.
- Abdullah is a Python/Django backend engineer. DVA tests Lambda, API Gateway, DynamoDB, SDKs, IAM, CI/CD — code and deployment. SAA tests infrastructure and network design, which is further from his desk.

## The target (verified against the official AWS exam guide, July 2026)

| | |
|---|---|
| Exam code | DVA-C02 |
| Questions | 65 total — **50 scored**, 15 unscored/experimental |
| Time | 130 minutes (= 2 min/question) |
| Passing score | **720** on a 100–1000 scaled score |
| Scoring | Compensatory — you only need to pass overall, not each domain |
| Format | Multiple choice (1 of 4) and multiple response (2+ of 5+) |
| Guessing | No penalty. **Never leave a question blank.** |
| Cost | 150 USD |
| Booking | aws.training → Certification → AWS Certification Account → Schedule New Exam → Pearson VUE |

### Domain weightings

| Domain | Weight | Scored questions (approx) |
|---|---|---|
| 1. Development with AWS Services | 32% | ~16 |
| 2. Security | 26% | ~13 |
| 3. Deployment | 24% | ~12 |
| 4. Troubleshooting and Optimization | 18% | ~9 |

Source: [Official DVA-C02 Exam Guide](https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html)

### What AWS says is OUT of scope for this exam

Worth knowing so time isn't wasted: designing architectures/microservices/schemas,
designing CI/CD pipelines from scratch, administering IAM users and groups,
administering servers and operating systems, designing VPC/Direct Connect networking.

## Timeline

- Pace: **3–4 hours/day** (learner's own stated capacity)
- Target: **exam in ~3 weeks** from 2026-07-31 → around **21 August 2026**
- Book the exam date early. A booked date is the single biggest driver of finishing.

## Success looks like

- Scoring **80%+ consistently** on full-length practice exams (aim above 720 with margin, because practice tests run harder than the real thing).
- Reading a 5-line scenario question and spotting the **one qualifying word** that eliminates two options.
- Finishing 65 questions in 130 minutes without running out of time.
- Knowing the ~15 highest-yield services cold: Lambda, DynamoDB, API Gateway, S3, IAM, Cognito, KMS, CloudFormation/SAM, CodePipeline/CodeBuild/CodeDeploy, ECS/Fargate, ECR, CloudWatch, X-Ray, SQS, SNS, Kinesis, Step Functions, Elastic Beanstalk, Secrets Manager, Parameter Store.
- Not being thrown by English exam phrasing (see Constraints).

## Constraints — important

- **English is not the learner's first language.** He explicitly asked for help with
  this. AWS exam questions are long, wordy, and deliberately use distractor phrasing.
  So every lesson must teach the *English of the exam* alongside the AWS content:
  qualifying words (MOST cost-effective, LEAST operational overhead), the difference
  between similar-sounding options, and how to read a long scenario fast.
  **The real exam is English-only** — so practice questions stay in English, with
  Roman Urdu explanation available via the toggle.
- Roman Urdu toggle on everything, same as the existing 44 lessons (`data-ur` attributes).
- Lesson rules from [NOTES.md](./NOTES.md) still apply: ONE concept per lesson,
  analogy first, short, spaced retrieval at the top of each lesson.
- Has real AWS hands-on experience — do NOT teach "what is a server". Teach the
  exam's opinions, the limits/numbers, and the traps.

## Out of scope

- SAA-C03 content (revisit after passing DVA).
- Deep AWS internals beyond what the exam tests.
- The original system design track — paused until the exam is passed.
