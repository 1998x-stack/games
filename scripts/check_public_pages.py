#!/usr/bin/env python3
"""Verify CDN-served Pages files exactly match the just-deployed Git revision."""
from __future__ import annotations

import argparse
import hashlib
from pathlib import Path
import time
from urllib.parse import urljoin, quote
from urllib.request import Request, urlopen

SITE = Path(__file__).resolve().parents[1] / "site"
FILES = ("index.html", "assets/app.js", "data/catalog.json",
         "data/phase1.json", "data/phase2.json", "data/phase3.json")


def fetch_public(url):
    request = Request(url, headers={"User-Agent": "Games-Atlas-Pages-Smoke",
                                    "Cache-Control": "no-cache"})
    with urlopen(request, timeout=15) as response:
        if response.status != 200:
            raise ValueError(f"HTTP {response.status}")
        return response.read()


def check_once(base, sha, attempt, fetch=fetch_public):
    if not base.startswith("https://"):
        raise ValueError("Public deployment must be HTTPS")
    problems = []
    for rel in FILES:
        url = urljoin(base.rstrip("/") + "/", rel)
        url += "?revision=" + quote(sha, safe="") + f"&attempt={attempt}"
        try:
            actual = fetch(url)
            expected = (SITE / rel).read_bytes()
            if actual != expected:
                digest = lambda b: hashlib.sha256(b).hexdigest()[:12]
                problems.append(f"{rel}: remote={digest(actual)} local={digest(expected)}")
        except Exception as exc:
            problems.append(f"{rel}: {type(exc).__name__}: {str(exc)[:150]}")
    return problems


def verify(base, sha, *, attempts=12, delay=8, fetch=fetch_public):
    if attempts < 1 or delay < 0:
        raise ValueError("invalid retry bounds")
    for attempt in range(1, attempts + 1):
        issues = check_once(base, sha, attempt, fetch=fetch)
        if not issues:
            print(f"PUBLIC_PAGES_VERIFIED sha={sha[:12]} files={len(FILES)} "
                  f"url={base} attempt={attempt}")
            return
        print(f"Public Pages attempt {attempt}/{attempts}: " + "; ".join(issues), flush=True)
        if attempt < attempts:
            time.sleep(delay)
    raise RuntimeError("Public Pages bytes did not match deployed Git revision")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--base-url", required=True)
    p.add_argument("--revision", required=True)
    a = p.parse_args()
    verify(a.base_url, a.revision)
