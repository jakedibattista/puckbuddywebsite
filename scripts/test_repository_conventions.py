"""Prove the navigation checker rejects missing explanations and preserves directives."""
import importlib.util
from pathlib import Path
import unittest

SPEC = importlib.util.spec_from_file_location('repository_check', Path(__file__).with_name('check-repository.py'))
CHECK = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CHECK)


class RepositoryConventionsTests(unittest.TestCase):
    def test_import_is_not_an_introduction(self):
        self.assertEqual(CHECK.introduction('import os\n# A later explanation does not count.'), '')

    def test_directives_and_blank_lines_are_preserved(self):
        for directive in ['#!/usr/bin/env python3', '"use client";', "'use server';"]:
            self.assertEqual(CHECK.introduction(directive + '\n\n// Explains the responsibility of this module.\nimport os'),
                             'Explains the responsibility of this module.')

    def test_docstrings_and_block_comments(self):
        for text in ['"""Explains the responsibility of this module."""', '/* Explains the responsibility of this module. */']:
            self.assertEqual(CHECK.introduction(text), 'Explains the responsibility of this module.')

    def test_index_escapes_table_content(self):
        self.assertIn('one \\| two', CHECK.render([('src/a.ts', 'one | two')]))
        self.assertNotEqual(CHECK.render([('a.py', 'first owner')]), CHECK.render([('a.py', 'changed owner')]))


if __name__ == '__main__':
    unittest.main()
