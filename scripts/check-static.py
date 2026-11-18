from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class AssetLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in {"src", "href"} or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path:
                continue
            self.paths.add(unquote(url.path))


dist = Path(__file__).resolve().parents[1] / "dist"
links = AssetLinks()
links.feed((dist / "index.html").read_text(encoding="utf-8"))
broken = [path for path in sorted(links.paths)
          if path.startswith("/") or not (dist / path).resolve().is_relative_to(dist)
          or not (dist / path).is_file()]
if broken:
    raise SystemExit("Missing or invalid local asset paths:\n" + "\n".join(broken))
print(f"Checked {len(links.paths)} local assets.")
