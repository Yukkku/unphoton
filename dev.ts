import * as esbuild from "https://deno.land/x/esbuild@v0.20.0/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.9.0/mod.ts";

const ctx = await esbuild.context({
  plugins: [...denoPlugins()],
  entryPoints: ["src/main.ts"],
  outfile: "./dist/main.js",
  bundle: true,
  minify: true,
  format: "esm",
});

ctx.serve({
  port: 8302,
  servedir: "./dist",
});
