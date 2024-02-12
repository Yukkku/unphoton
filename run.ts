const indexHtml = Deno.readFileSync("./dist/index.html");
const mainJs = Deno.readFileSync("./dist/main.js");

Deno.serve({ port: 8302 }, (req) => {
  const url = new URL(req.url);
  switch (url.pathname) {
    case "/main.js": {
      return new Response(mainJs, {
        headers: { "content-type": "text/javascript; charset=UTF-8" },
      });
    }
    case "/":
    case "/index.html": {
      return new Response(indexHtml, {
        headers: { "content-type": "text/html; charset=UTF-8" },
      });
    }
    default:
      return new Response(null, { status: 404 });
  }
});
