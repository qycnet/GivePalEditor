import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

Handler = CustomHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        # 打开默认浏览器
        webbrowser.open(f'http://localhost:{PORT}/')
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped by user")
except Exception as e:
    print(f"Error: {e}")
    input("Press Enter to exit...")