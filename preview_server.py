from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, webbrowser
os.chdir(Path(__file__).resolve().parent)
server=ThreadingHTTPServer(('127.0.0.1',0),SimpleHTTPRequestHandler)
address=f'http://127.0.0.1:{server.server_port}/'
print(f'Evolutionary Machines: {address}\nKeep this window open. Press Ctrl+C to stop.')
webbrowser.open(address)
try: server.serve_forever()
except KeyboardInterrupt: server.server_close()
