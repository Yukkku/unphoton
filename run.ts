const indexHtml = Deno.readFileSync("./dist/index.html");
const mainJs = Deno.readFileSync("./dist/main.js");
const mainCss = Deno.readFileSync("./dist/main.css");
const faviconSvg = Deno.readFileSync("./dist/favicon.svg");

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
    case "/main.css": {
      return new Response(mainCss, {
        headers: { "content-type": "text/css; charset=utf-8" },
      });
    }
    case "/favicon.svg": {
      return new Response(faviconSvg, {
        headers: { "content-type": "image/svg+xml; charset=utf-8" },
      });
    }
    default:
      return new Response(null, { status: 404 });
  }
});
