import unittest
from scripts import check_public_pages as pages


class PublicPagesChecks(unittest.TestCase):
    def test_exact_content_and_expected_file_count(self):
        self.assertEqual(len(pages.FILES), 6)
        def from_repo(url):
            rel = url.split("/games/")[1].split("?")[0]
            return (pages.SITE / rel).read_bytes()
        pages.verify("https://example.org/games/", "abc123",
                     attempts=1, delay=0, fetch=from_repo)

    def test_stale_and_missing_assets_are_errors(self):
        with self.assertRaisesRegex(RuntimeError, "did not match"):
            pages.verify("https://example.org/games/", "abc123",
                         attempts=1, delay=0, fetch=lambda _: b"stale")
        missing = pages.check_once("https://example.org/games/", "x", 1,
                                   fetch=lambda _: (_ for _ in ()).throw(
                                       OSError("gone")))
        self.assertEqual(len(missing), len(pages.FILES))

    def test_http_rejected(self):
        with self.assertRaises(ValueError):
            pages.check_once("http://example.org/", "x", 1)
