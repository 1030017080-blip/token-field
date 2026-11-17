"""Local preview with a public-official-feed refresh every 15 minutes."""
import http.server, functools, pathlib, subprocess, sys, threading
ROOT = pathlib.Path(__file__).resolve().parents[1]
def collect():
    while True:
        try:
            subprocess.run([sys.executable, str(ROOT/'scripts/collect-official-resets.py')], timeout=90)
        except Exception as error:
            print('Official feed refresh failed:', error, flush=True)
        threading.Event().wait(900)
threading.Thread(target=collect, daemon=True).start()
print('Local preview: http://127.0.0.1:4188/#skills — official feeds refresh every 15 minutes', flush=True)
http.server.ThreadingHTTPServer(('127.0.0.1',4188), functools.partial(http.server.SimpleHTTPRequestHandler,directory=str(ROOT/'dist'))).serve_forever()
