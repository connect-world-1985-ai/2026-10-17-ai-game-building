"""Regenerate the per-page source list in site/sources.html from the pages' external links.

Run from the AI-game-building folder:  python tools/build_sources.py
"""
import html
import re
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent / "site"
START, END = "<!--SOURCES-->", "<!--/SOURCES-->"


def page_order():
    js = (SITE / "assets/js/site.js").read_text(encoding="utf-8")
    return re.findall(r'file: "([^"]+)", num: "([^"]+)", title: "([^"]+)"', js)


def links(path):
    text = path.read_text(encoding="utf-8")
    seen = {}
    for url, label in re.findall(r'<a href="(https?://[^"]+)"[^>]*>(.*?)</a>', text, re.S):
        label = html.unescape(re.sub(r"<[^>]+>", "", label)).strip()
        seen.setdefault(url, label)
    return seen


def main():
    parts = [START]
    for file, num, title in page_order():
        if file == "sources.html":
            continue
        found = links(SITE / file)
        if not found:
            continue
        parts.append(f'<details><summary>{html.escape(num)} · {html.escape(title)} ({len(found)})</summary><div class="body"><ul class="small">')
        for url, label in found.items():
            host = re.sub(r"^www\.", "", url.split("/")[2])
            shown = label if label and label != url else host
            parts.append(f'<li><a href="{html.escape(url)}">{html.escape(shown)}</a> <span class="muted">{html.escape(host)}</span></li>')
        parts.append("</ul></div></details>")
    parts.append(END)
    block = "\n".join(parts)

    target = SITE / "sources.html"
    page = target.read_text(encoding="utf-8")
    if START in page and END in page:
        page = re.sub(re.escape(START) + ".*?" + re.escape(END), lambda m: block, page, flags=re.S)
    else:
        page = page.replace(START, block)
    target.write_text(page, encoding="utf-8")
    print("sources.html updated")


if __name__ == "__main__":
    main()
