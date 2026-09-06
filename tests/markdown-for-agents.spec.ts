import {
  createServer,
  request,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";
import type { AddressInfo } from "node:net";
import type { ViteDevServer } from "vite-plus";
import { afterAll, beforeAll, expect, it } from "vite-plus/test";
import { markdownForAgentsPlugin } from "../docs/.vitepress/plugins/markdownForAgents";

let server: Server;
let port: number;

beforeAll(async () => {
  const plugin = markdownForAgentsPlugin();
  const configure = plugin.configureServer;
  if (typeof configure !== "function") throw new Error("Missing development middleware");
  await configure.call(
    {} as ThisParameterType<typeof configure>,
    {
      middlewares: {
        use(handler: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) {
          server = createServer((req, res) => {
            handler(req, res, () => {
              res.statusCode = 404;
              res.end();
            });
          });
        },
      },
    } as unknown as ViteDevServer,
  );
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  port = (server.address() as AddressInfo).port;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  );
});

function getMarkdown(path: string) {
  return new Promise<{ status: number; type: string | undefined; body: string }>(
    (resolve, reject) => {
      const req = request(
        { hostname: "127.0.0.1", port, path, headers: { Accept: "text/markdown" } },
        (res) => {
          let body = "";
          res.setEncoding("utf8");
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () =>
            resolve({ status: res.statusCode!, type: res.headers["content-type"], body }),
          );
        },
      );
      req.on("error", reject);
      req.end();
    },
  );
}

it("does not serve Markdown outside the documentation root", async () => {
  const response = await getMarkdown("/../CONTRIBUTING.html");
  expect(response.status).toBe(404);
  expect(response.body).toBe("");
});

it("serves documented pages and directory indexes as Markdown", async () => {
  for (const path of [
    "/",
    "/content/components/animated-beam.html",
    "/content/guide/getting-started/",
  ]) {
    const response = await getMarkdown(path);
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/markdown; charset=utf-8");
    expect(response.body).not.toMatch(/^---\n/);
  }
});
