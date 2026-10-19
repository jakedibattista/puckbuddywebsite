#!/usr/bin/env python3
"""Check file introductions and the generated source navigation index.

Only source-controlled or new non-ignored files participate. Generated output,
assets and formats that cannot carry comments are described in the guide instead.
"""
from pathlib import Path
import argparse
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {'.ts', '.tsx', '.js', '.cjs', '.mjs', '.py', '.sh', '.yml', '.yaml', '.toml', '.rules', '.css', '.sql'}


def introduction(text):
    """Preserve executable directives while looking for the opening explanation."""
    lines = text.splitlines()
    while lines and (not lines[0].strip() or lines[0].startswith('#!')
                     or re.match(r'^\s*[\"\']use (client|server)[\"\'];?\s*$', lines[0])):
        lines.pop(0)
    if not lines:
        return ''
    first = lines[0].strip()
    if not first.startswith(('//', '/*', '#', '--', '"""', "'''")):
        return ''
    collected = []
    quote = first[:3] if first.startswith(('"""', "'''")) else None
    block = first.startswith('/*')
    for index, line in enumerate(lines):
        value = line.strip()
        if index and not quote and not block and not value.startswith(('//', '#', '--')):
            break
        cleaned = re.sub(r'^(?://|/\*+|\*|#|--|"""|\'\'\')\s?', '', value)
        cleaned = cleaned.removesuffix('*/').removesuffix('"""').removesuffix("'''").strip()
        if cleaned:
            collected.append(cleaned)
        if (block and '*/' in value) or (quote and (index > 0 or len(value) > 3) and value.endswith(quote)):
            break
        if len(' '.join(collected)) >= 180:
            break
    return ' '.join(collected)


def source_files(root):
    raw = subprocess.check_output(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=root)
    for name in sorted(set(raw.decode().split('\0')) - {''}):
        file = root / name
        if (file.is_file() and file.suffix in EXTENSIONS and not name.startswith('functions/lib/')
                and not name.endswith('.d.ts')):
            yield name, file


def render(rows):
    lines = ['# Source file index', '',
             'This generated index maps source, tests and tooling to their opening explanations.',
             'Read [the navigation guide](codebase-navigation.md) for ownership and naming rules.', '',
             'Regenerate with `python3 scripts/check-repository.py --write-index` after adding or renaming files.', '',
             '| File | Responsibility |', '| --- | --- |']
    for name, intro in rows:
        safe = intro.replace('|', '\\|').replace('`', '')
        if len(safe) > 250:
            safe = safe[:247] + '...'
        lines.append(f'| [{name}](<../{name}>) | {safe} |')
    return '\n'.join(lines) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-index', action='store_true')
    args = parser.parse_args()
    rows, failures = [], []
    for name, file in source_files(ROOT):
        intro = introduction(file.read_text())
        if len(re.findall(r'[A-Za-z]+', intro)) < 5:
            failures.append(f'{name}: add a short explanation of this file\'s job')
        rows.append((name, intro))
    index = ROOT / 'docs/source-index.md'
    expected = render(rows)
    if args.write_index and not failures:
        index.write_text(expected)
    if not index.exists() or index.read_text() != expected:
        failures.append('docs/source-index.md is stale; regenerate it after reviewing introductions')
    for failure in failures:
        print(failure)
    print(f'{len(rows)} files checked; {len(failures)} failures')
    return bool(failures)


if __name__ == '__main__':
    raise SystemExit(main())
