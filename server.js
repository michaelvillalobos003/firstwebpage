const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((request, response) => {
  let requestPath;

  try {
    requestPath = decodeURIComponent((request.url || "/").split("?")[0]);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  if (requestPath === "/favicon.ico") {
    response.writeHead(204);
    response.end();
    return;
  }

  const relativePath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.resolve(root, `.${relativePath}`);

  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream",
    });
    response.end(file);
  });
});

server.listen(5000, "0.0.0.0", () => {
  console.log("Serving the project on port 5000");
});