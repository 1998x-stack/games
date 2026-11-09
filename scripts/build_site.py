#!/usr/bin/env python3
"""Validate public-only game catalog and generate Pages data. Python 3.10+."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "data" / "games.json"
OUTPUT = ROOT / "site" / "data" / "catalog.json"
PHASE1_INPUT = ROOT / "data" / "phase1.json"
PHASE1_OUTPUT = ROOT / "site" / "data" / "phase1.json"
PHASE2_INPUT = ROOT / "data" / "phase2.json"
PHASE2_OUTPUT = ROOT / "site" / "data" / "phase2.json"
PHASE3_INPUT = ROOT / "data" / "phase3.json"
PHASE3_OUTPUT = ROOT / "site" / "data" / "phase3.json"
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

def build_phase1():
    public_names = {row['name'] for row in json.loads(INPUT.read_text(encoding='utf-8'))['projects']}
    phase = json.loads(PHASE1_INPUT.read_text(encoding='utf-8'))
    assert set(phase) == {'schema_version', 'observed_on', 'stage', 'projects'}
    assert phase['schema_version'] == 1 and phase['stage'] == 'in_progress'
    rows = phase['projects']
    expected = {'Snake', 'Snake_Web', 'flying_bird', 'jump_jump', 'space_ship',
                'pingpong', 'paint-maze-lab', '2048', 'Go', 'TicTacToe'}
    assert len(rows) == 10 and {p['name'] for p in rows} == expected
    assert len({p['name'] for p in rows}) == len(rows) and expected.issubset(public_names)
    for p in rows:
        assert set(p) == {'name','mode','validation','availability','note','evidence'}
        assert p['mode'] in ('desktop','local-web','browser-candidate')
        assert p['validation'] in ('not-verified','unit-ci','browser-ci','build-ci')
        assert p['availability'] in ('production-unverified','deployment-blocked')
        assert isinstance(p['note'], str) and p['note'].strip()
        assert isinstance(p['evidence'], list)
        assert all(isinstance(u,str) and u.startswith('https://github.com/1998x-stack/') for u in p['evidence'])
        assert p['evidence'] or p['validation'] == 'not-verified'
        entry = next(item for item in json.loads(INPUT.read_text(encoding='utf-8'))['projects']
                     if item['name'] == p['name'])
        page = ROOT / 'categories' / entry['category'] / p['name'] / 'README.md'
        assert page.is_file()
        text = page.read_text(encoding='utf-8')
        assert p['evidence'] and all(url in text for url in p['evidence']), (
            'P1 project page lacks verification link: ' + p['name'])
    return json.dumps(phase, ensure_ascii=False, indent=2) + '\n'

def build_phase2():
    """Public second-batch status and evidence allowlist."""
    source = json.loads(INPUT.read_text(encoding="utf-8"))
    mapped = {p["name"]: p for p in source["projects"]}
    data = json.loads(PHASE2_INPUT.read_text(encoding="utf-8"))
    assert set(data) == {"schema_version", "observed_on", "stage", "projects"}
    assert data["schema_version"] == 1 and data["stage"] == "in_progress"
    expected = {"math_game", "xiao_xiao_le_game", "MarioGame", "go_gym",
                "gomoku_zero", "gomoku-exact5-env", "happyLandlord", "ddz-rl-lab",
                "MCTS-SNAKE", "TetrominoDQN", "Deep-RL-Arcade-Game",
                "ball-marl", "Single-Player-MCTS"}
    rows = data["projects"]
    assert len(rows) == 13 and {p["name"] for p in rows} == expected
    assert len({p["name"] for p in rows}) == len(rows)
    for p in rows:
        assert set(p) == {"name", "mode", "validation", "availability", "note", "evidence"}
        assert p["mode"] in ("desktop", "environment", "game-ai")
        assert p["validation"] in ("unit-ci", "not-verified", "ci-failed")
        assert p["availability"] in ("production-unverified", "not-applicable")
        assert isinstance(p["note"], str) and p["note"].strip()
        assert isinstance(p["evidence"], list)
        assert all(isinstance(link, str) and link.startswith(
            "https://github.com/1998x-stack/") for link in p["evidence"])
        assert p["validation"] == "not-verified" or p["evidence"]
        assert p["name"] in mapped
        project = mapped[p["name"]]
        page = ROOT / "categories" / project["category"] / p["name"] / "README.md"
        assert page.is_file()
        text = page.read_text(encoding="utf-8")
        assert all(link in text for link in p["evidence"]), "P2 evidence link missing: " + p["name"]
    return json.dumps(data, ensure_ascii=False, indent=2) + chr(10)


def build_phase3():
    """Publish P3 with a strict three-batch 35-project partition."""
    public = json.loads(INPUT.read_text(encoding="utf-8"))
    mapped = {p["name"]: p for p in public["projects"]}
    phase = json.loads(PHASE3_INPUT.read_text(encoding="utf-8"))
    assert set(phase) == {"schema_version", "observed_on", "stage", "projects"}
    assert phase["schema_version"] == 1 and phase["stage"] == "in_progress"
    expected = {"RL-Adventure-2", "Arcade-Learning-Environment", "awesome-rl-envs",
                "gym-envs", "hok_env", "microrts", "universe", "gym", "ai-game",
                "AI-Game-Generator", "Deep-Reinforcement-Learning-Hands-On",
                "rainbow-is-all-you-need"}
    rows = phase["projects"]
    assert len(rows) == 12 and {p["name"] for p in rows} == expected
    for p in rows:
        assert set(p) == {"name", "mode", "validation", "availability", "note", "evidence"}
        assert p["mode"] in ("environment", "game-ai", "creation-tool", "resource")
        assert p["validation"] in ("not-verified", "environment-ci", "security-ci",
                                   "component-ci", "historical-ci", "index-ci", "match-ci",
                                   "experiment-ci", "packager-ci", "training-ci", "comparison-ci", "vector-a2c-ci")
        assert p["availability"] in ("legacy", "restricted", "needs-server", "not-applicable")
        assert isinstance(p["note"], str) and p["note"].strip()
        assert isinstance(p["evidence"], list)
        assert p["validation"] == "not-verified" or p["evidence"]
        assert all(isinstance(url, str) and url.startswith(
            "https://github.com/1998x-stack/" + p["name"] + "/actions/runs/")
            and url.rsplit("/", 1)[-1].isdigit() for url in p["evidence"])
        assert p["name"] in mapped
        page = ROOT / "categories" / mapped[p["name"]]["category"] / p["name"] / "README.md"
        assert page.is_file()
        text = page.read_text(encoding="utf-8")
        assert all(url in text for url in p["evidence"]), "P3 evidence missing from " + p["name"]
    batches = [
        {p["name"] for p in json.loads(path.read_text(encoding="utf-8"))["projects"]}
        for path in (PHASE1_INPUT, PHASE2_INPUT, PHASE3_INPUT)
    ]
    assert [len(group) for group in batches] == [10, 13, 12]
    assert not batches[0] & batches[1] and not batches[0] & batches[2]
    assert not batches[1] & batches[2], "P1/P2/P3 project overlap"
    assert set.union(*batches) == set(mapped), "Missing or extra projects across three batches"
    return json.dumps(phase, ensure_ascii=False, indent=2) + chr(10)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="validate without writing")
    args = parser.parse_args()
    result = build()
    phase_result = build_phase1()
    phase2_result = build_phase2()
    phase3_result = build_phase3()
    if args.check:
        assert OUTPUT.is_file(), "First run without --check to generate output"
        assert OUTPUT.read_text(encoding="utf-8") == result, "Site data is out of sync; regenerate"
        assert PHASE1_OUTPUT.is_file() and PHASE1_OUTPUT.read_text(encoding="utf-8") == phase_result, "Phase1 JSON mismatch"
        assert PHASE2_OUTPUT.is_file() and PHASE2_OUTPUT.read_text(encoding="utf-8") == phase2_result, "Phase2 JSON mismatch"
        assert PHASE3_OUTPUT.is_file() and PHASE3_OUTPUT.read_text(encoding="utf-8") == phase3_result, "Phase3 JSON mismatch"
        print("Catalog 35 / P1 10 / P2 13 / P3 12; complete partition and evidence in sync.")
    else:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(result, encoding="utf-8")
        PHASE1_OUTPUT.write_text(phase_result, encoding="utf-8")
        PHASE2_OUTPUT.write_text(phase2_result, encoding="utf-8")
        PHASE3_OUTPUT.write_text(phase3_result, encoding="utf-8")
        print("Generated site/data/catalog.json (35 public projects).")
