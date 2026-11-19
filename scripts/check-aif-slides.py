#!/usr/bin/env python3
"""Re-runnable check: are the AIF course slides covered by our lessons + quizzes?

Usage: python3 scripts/check-aif-slides.py ["AWS Certified AI Practitioner Slides v19.pdf"]
Needs pdftotext (poppler). Written 2026-11-18 after the slide audit that
produced lesson I6 and Hard Quiz 16/17. Rule: no coverage claim without a script.
"""
import glob, re, subprocess, sys

PDF = sys.argv[1] if len(sys.argv) > 1 else "AWS Certified AI Practitioner Slides v19.pdf"
slides = subprocess.run(["pdftotext", "-layout", PDF, "-"], capture_output=True, text=True, check=True).stdout

ours = ""
for pat in ["src/content-html/lessons/*aif*.html", "src/content-html/reference/*aif*.html", "exams/questions/aif-*.json"]:
    for f in glob.glob(pat):
        ours += open(f, errors="ignore").read()
lessons = ""
for pat in ["src/content-html/lessons/*aif*.html", "src/content-html/reference/*aif*.html"]:
    for f in glob.glob(pat):
        lessons += open(f, errors="ignore").read()

# AIF topics found in the slides (CLF-only slides — S3 classes, VPC, CloudFormation — are excluded on purpose).
TERMS = {
    "R²": r"R²|R squared|R-squared", "MAPE": r"MAPE", "Confusion matrix": r"confusion matrix",
    "Semi-supervised": r"semi-supervised", "Self-supervised": r"self-supervised", "Pseudo-labelling": r"pseudo-label",
    "Edge / SLM": r"small language model|SLM", "Automatic Model Tuning": r"Automatic Model Tuning",
    "Autopilot": r"Autopilot", "PCA": r"PCA|Principal Component", "K-means": r"K-means", "KNN": r"KNN|nearest neighbo",
    "MLflow": r"MLflow", "Model Dashboard": r"Model Dashboard", "Role Manager": r"Role Manager",
    "Comprehend Medical": r"Comprehend Medical", "Transcribe Medical": r"Transcribe Medical", "HealthScribe": r"HealthScribe",
    "Custom vocabulary": r"custom vocabular", "Custom language model": r"custom language model",
    "Custom entity recognition": r"custom entity", "Custom classification": r"custom classification",
    "IAM Identity Center": r"Identity Center", "Q Apps": r"Q Apps", "PartyRock": r"PartyRock",
    "Sampling bias": r"sampling bias", "Measurement bias": r"measurement bias", "Observer bias": r"observer bias",
    "Confirmation bias": r"confirmation bias", "PDP": r"partial dependence", "Plagiarism": r"plagiari",
    "Emergent capabilities": r"emergent capabilit", "Prompt poisoning": r"poisoning", "Hijacking": r"hijack",
    "Exposure": r"exposure", "Prompt leaking": r"prompt leak", "Jailbreak": r"jailbreak",
}
gaps = 0
print(f"{'topic':28} {'lesson':>6} {'all':>5}")
for name, rx in TERMS.items():
    n_les = len(re.findall(rx, lessons, re.I)); n_all = len(re.findall(rx, ours, re.I))
    flag = "" if n_les and n_all >= 2 else "  <-- GAP"
    gaps += bool(flag)
    print(f"{name:28} {n_les:>6} {n_all:>5}{flag}")
print(f"\n{len(TERMS)} slide topics checked, {gaps} gaps (GAP = not taught in a lesson, or seen < 2 times).")
sys.exit(1 if gaps else 0)
