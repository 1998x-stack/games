#!/usr/bin/env python3
"""Validate public-only game catalog and generate Pages data. Python 3.10+."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "games.json"
OUTPUT = ROOT / "site" / "data" / "catalog.json"
SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
NAME = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
ALLOWED = {"name", "description", "category", "url", "review"}

def build():
    data = json.loads(INPUT.read_text(encoding="utf-8"))
    assert data["schema_version"] == 1
    cats = data["categories"]
    projects = data["projects"]
    assert len(cats) == 7 and len(projects) == 35
    ids = [cat["id"] for cat in cats]
    assert len(set(ids)) == len(ids)
    assert all(SLUG.fullmatch(x) for x in ids)
    assert sum(cat["count"] for cat in cats) == len(projects)
    assert all(set(cat) == {"id", "name", "name_en", "count"} for cat in cats)
    seen = set()
    for p in projects:
        assert set(p) == ALLOWED, p.get("name")
        name = p["name"]
        assert NAME.fullmatch(name)
        assert name.casefold() not in seen, name
        seen.add(name.casefold())
        assert p["url"] == "https://github.com/1998x-stack/" + name
        assert p["category"] in ids
        assert p["review"] in ("verified", "pending")
        assert isinstance(p["description"], str) and p["description"].strip()
        assert (ROOT / "categories" / p["category"] / name / "README.md").is_file(), name
    for cat in cats:
        assert cat["count"] == sum(p["category"] == cat["id"] for p in projects)
        assert (ROOT / "categories" / cat["id"] / "README.md").is_file()
    # Strict allowlist before public release (do not copy source/internal payloads).
    clean = {"schema_version": 1, "source": {
        "repository": "1998x-stack/1998x-stack-catalog",
        "snapshot_date": "2026-11-03"
    }, "categories": cats, "projects": projects}
    return json.dumps(clean, ensure_ascii=False, indent=2) + "\n"

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="validate without writing")
    args = parser.parse_args()
    result = build()
    if args.check:
        assert OUTPUT.is_file(), "First run without --check to generate output"
        assert OUTPUT.read_text(encoding="utf-8") == result, "Site data is out of sync; regenerate"
        print("Catalog validated; published JSON is in sync (35 projects, 7 categories).")
    else:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(result, encoding="utf-8")
        print("Generated site/data/catalog.json (35 public projects).")
