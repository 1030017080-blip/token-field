"""Read public official Atom feeds; no X credentials or AIHOT data required."""
import json, pathlib, urllib.request, xml.etree.ElementTree as ET, datetime, re

OUT = pathlib.Path(__file__).resolve().parents[1] / 'dist/reset-feed.json'
SOURCES = {'codex': 'https://status.openai.com/history.atom', 'claude': 'https://status.claude.com/history.atom', 'grok': 'https://status.x.ai/history.atom'}
NS = {'a': 'http://www.w3.org/2005/Atom'}
try:
    prior = json.loads(OUT.read_text(encoding='utf-8'))
except (OSError, ValueError):
    prior = {'products': {}}
products = {}
for product, url in SOURCES.items():
    now = datetime.datetime.now(datetime.timezone.utc).isoformat()
    old = prior.get('products', {}).get(product, {})
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'TokenField-OfficialMonitor/1.0'})
        with urllib.request.urlopen(req, timeout=20) as r:
            root = ET.fromstring(r.read())
        posts = []
        for entry in root.findall('a:entry', NS):
            title = entry.findtext('a:title', '', NS)
            content = entry.findtext('a:content', '', NS) or entry.findtext('a:summary', '', NS)
            text = re.sub(r'<[^>]*>', ' ', content)
            # A limit-related incident is a candidate, never a confirmed grant/reset.
            if not re.search(r'reset|usage limit|rate.limit|quota|allowance|banked', title+' '+text, re.I):
                continue
            if product == 'codex' and not re.search(r'codex|work', title+' '+text, re.I):
                continue
            link = entry.find('a:link', NS)
            href = link.get('href', '') if link is not None else ''
            if not href.startswith(url.split('/history')[0]+'/'):
                continue
            posts.append({'id': entry.findtext('a:id', href, NS), 'text': title, 'url': href, 'createdAt': entry.findtext('a:published', '', NS) or entry.findtext('a:updated', '', NS), 'status': '官方状态公告 · 待核验', 'source': url})
        merged = {p['id']: p for p in old.get('posts', []) if p.get('source') == url}
        merged.update({p['id']: p for p in posts})
        products[product] = {'state': 'ok', 'checkedAt': now, 'lastSuccessAt': now, 'sourceUrl': url, 'posts': sorted(merged.values(), key=lambda p:p['createdAt'], reverse=True)[:100]}
    except Exception as error:
        products[product] = {**old, 'state': 'error', 'checkedAt': now, 'sourceUrl': url, 'error': str(error)[:160], 'posts': old.get('posts', [])}
    print(product, products[product]['state'], len(products[product]['posts']))
temp = OUT.with_suffix('.tmp')
temp.write_text(json.dumps({'schema': 2, 'products': products}, ensure_ascii=False, indent=2), encoding='utf-8')
temp.replace(OUT)
