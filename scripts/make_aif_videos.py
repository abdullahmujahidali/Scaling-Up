#!/usr/bin/env python3
"""
Build the AIF Quick Review lecture videos — one MP4 per part.

Each slide reveals its points one at a time with the current point
highlighted; macOS `say` narrates, headless Chrome renders the slides and
ffmpeg stitches the result. Content lives in aif_video_script.py.

The --ur variant reuses the same slides but narrates in Urdu with Microsoft's
neural ur-PK voice via edge-tts (needs internet and `pip install edge-tts`;
set EDGE_TTS to the binary if it isn't on PATH). Lines: aif_video_script_ur.py.

Usage:  python3 scripts/make_aif_videos.py            # all parts, English voice
        python3 scripts/make_aif_videos.py 6 7        # only parts 6 and 7
        python3 scripts/make_aif_videos.py --ur       # Urdu voice
Output: public/videos/aif/part-NN.mp4, part-NN-ur.mp4  (gitignored — regenerate, don't commit)
"""
import html, json, os, re, shutil, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from aif_video_script import PARTS
from aif_video_script_ur import UR, FIXED

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/videos/aif"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
VOICE, RATE = "Samantha", "160"   # slow, clear exam English
UR_VOICE, UR_RATE = "ur-PK-UzmaNeural", "-10%"
EDGE_TTS = os.environ.get("EDGE_TTS", "edge-tts")
PAUSE_SECS = 5                    # thinking time before each answer
W, H = 1920, 1080

CSS = """
*{box-sizing:border-box;margin:0}
body{width:%dpx;height:%dpx;background:#0f172a;color:#f1f5f9;
 font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;padding:70px 110px;position:relative;overflow:hidden}
.top{font-size:26px;color:#94a3b8;letter-spacing:.04em;text-transform:uppercase}
h1{font-size:62px;margin:18px 0 6px;line-height:1.15}
.h1ur{font-size:32px;color:#94a3b8;font-style:italic;margin-bottom:38px}
.item{border-left:8px solid #334155;padding:14px 26px;margin:14px 0;border-radius:6px;opacity:.55}
.item .en{font-size:40px;line-height:1.25}.item .ur{font-size:28px;color:#94a3b8;font-style:italic;margin-top:4px}
.item.now{opacity:1;background:#fde68a;border-left-color:#f59e0b;color:#111827}
.item.now .ur{color:#475569}
b{color:#fbbf24}.item.now b{color:#b45309}
.center{display:flex;flex-direction:column;justify-content:center;height:100%%}
.big{font-size:86px;line-height:1.15;margin:20px 0}
.q{font-size:56px;line-height:1.3;margin:30px 0 10px}.qur{font-size:34px;color:#94a3b8;font-style:italic}
.ans{margin-top:50px;font-size:64px;background:#14532d;border-left:10px solid #22c55e;padding:24px 34px;border-radius:8px}
.pause{margin-top:50px;font-size:44px;color:#fbbf24}
.bar{position:absolute;left:0;bottom:0;height:12px;background:#f59e0b}
.foot{position:absolute;right:110px;top:74px;font-size:24px;color:#64748b}
""" % (W, H)


def md(s):
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", html.escape(s))


def page(body, part, frac):
    return (f"<!doctype html><meta charset=utf-8><style>{CSS}</style><body>{body}"
            f"<div class=bar style='width:{frac*100:.1f}%'></div>"
            f"<div class=foot>AIF Quick Review · Part {part['n']} of 10</div></body>")


def steps_for(part, lang="en"):
    """Yield (html_body, narration_or_None, silence_secs) for every frame of a part."""
    ur = UR[part["n"]] if lang == "ur" else None
    top = f"<div class=top>Part {part['n']} · {html.escape(part['domain'])}</div>"
    yield (f"<div class=center>{top}<div class=big>{md(part['title'])}</div>"
           f"<div class=h1ur>{md(part['ur'])}</div></div>", ur["intro"] if ur else part["intro"], 0)
    for si, sl in enumerate(part["slides"]):
        for k, (en, _, say) in enumerate(sl["items"]):
            if ur:
                say = ur["slides"][si][k]
            items = "".join(
                f"<div class='item{' now' if i == k else ''}'><div class=en>{md(e)}</div>"
                f"<div class=ur>{md(u)}</div></div>"
                for i, (e, u, _) in enumerate(sl["items"][: k + 1]))
            yield (f"{top}<h1>{md(sl['title'])}</h1><div class=h1ur>{md(sl['ur'])}</div>{items}", say, 0)
    yield (f"<div class=center>{top}<div class=big>✋ Check yourself</div>"
           f"<div class=h1ur>Apne aap ko check karo — pehle bol kar jawab do</div></div>",
           FIXED["check_intro"] if ur else
           "Now, check yourself. I will ask three questions. Pause, and say your answer out loud before I show it.", 0)
    for i, (q, qur, a, a_say) in enumerate(part["check"], 1):
        qhtml = f"{top}<h1>Question {i}</h1><div class=q>{md(q)}</div><div class=qur>{md(qur)}</div>"
        if ur:
            q_say = FIXED["question"].format(i=i) + " " + ur["check"][i - 1][0]
            a_say = ur["check"][i - 1][1]
        else:
            q_say = f"Question {i}. {re.sub(r'[*]', '', q)}"
        yield (qhtml, q_say, 0)
        yield (qhtml + "<div class=pause>⏸ Say your answer out loud…</div>", None, PAUSE_SECS)
        yield (qhtml + f"<div class=ans>✅ {md(a)}</div>",
               (FIXED["answer"] if ur else "The answer: ") + a_say, 0)
    if ur:
        nxt = FIXED["next"].format(n=part["n"] + 1) if part["n"] < 10 else FIXED["last"]
        bye = FIXED["outro"].format(n=part["n"]) + nxt
    else:
        nxt = f"Next, part {part['n'] + 1}." if part["n"] < 10 else "That was the last part. Now you are ready for the quizzes."
        bye = f"Well done. That is the end of part {part['n']}. Take a short break. {nxt}"
    yield (f"<div class=center>{top}<div class=big>Done — Part {part['n']} ✅</div>"
           f"<div class=h1ur>Shabash! Break lo, phir agla hissa.</div></div>",
           bye, 0)


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "json", str(path)], capture_output=True, text=True, check=True)
    return float(json.loads(out.stdout)["format"]["duration"])


def build_part(part, lang="en"):
    work = Path(tempfile.mkdtemp(prefix=f"aifvid{part['n']}{lang}-"))
    steps = list(steps_for(part, lang))
    segs = []
    for i, (body, say, silence) in enumerate(steps):
        htmlf, png, seg = work / f"{i:03}.html", work / f"{i:03}.png", work / f"{i:03}.mp4"
        htmlf.write_text(page(body, part, (i + 1) / len(steps)), encoding="utf-8")
        run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
             f"--user-data-dir={work}/chrome", f"--window-size={W},{H}", f"--screenshot={png}", htmlf.as_uri()])
        if say:
            if lang == "ur":
                clip = work / f"{i:03}.mp3"
                run([EDGE_TTS, "--voice", UR_VOICE, f"--rate={UR_RATE}", "--text", say, "--write-media", str(clip)])
            else:
                clip = work / f"{i:03}.aiff"
                run(["say", "-v", VOICE, "-r", RATE, "-o", str(clip), say])
            dur = duration(clip) + 0.8
            audio = ["-i", str(clip)]
        else:
            dur = float(silence)
            audio = ["-f", "lavfi", "-t", str(dur), "-i", "anullsrc=r=44100:cl=mono"]
        run(["ffmpeg", "-y", "-loop", "1", "-framerate", "24", "-i", str(png), *audio,
             "-af", "volume=6dB,alimiter=limit=0.89,apad" if lang == "ur" else "apad", "-t", f"{dur:.2f}", "-c:v", "libx264", "-preset", "veryfast",
             "-tune", "stillimage", "-pix_fmt", "yuv420p", "-r", "24",
             "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "1", str(seg)])
        segs.append(seg)
    lst = work / "list.txt"
    lst.write_text("".join(f"file '{s}'\n" for s in segs))
    out = OUT / f"part-{part['n']:02}{'-ur' if lang == 'ur' else ''}.mp4"
    run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy",
         "-movflags", "+faststart", str(out)])
    shutil.rmtree(work, ignore_errors=True)
    return part["n"], len(steps), duration(out)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    lang = "ur" if "--ur" in sys.argv else "en"
    want = {int(a) for a in sys.argv[1:] if a.isdigit()} or {p["n"] for p in PARTS}
    todo = [p for p in PARTS if p["n"] in want]
    if lang == "ur":  # every Urdu line must line up with an on-screen item
        for p in todo:
            u = UR[p["n"]]
            assert [len(s["items"]) for s in p["slides"]] == [len(x) for x in u["slides"]], f"part {p['n']} slide mismatch"
            assert len(u["check"]) == len(p["check"]), f"part {p['n']} check mismatch"
    with ThreadPoolExecutor(max_workers=4) as ex:
        for n, k, d in ex.map(lambda p: build_part(p, lang), todo):
            print(f"part-{n:02}{'-ur' if lang == 'ur' else ''}.mp4  {k} frames  {int(d // 60)}:{int(d % 60):02}", flush=True)
