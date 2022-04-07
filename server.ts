import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { login, auth, guest } from "./router.ts";
import authMiddleware from "./authMiddleware.ts";

const router = new Router();

router
  .post("/login", login)
  .get("/guest", guest)
  .get("/auth", authMiddleware, auth);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Listening on port 3000...");
await app.listen({ port: 3000, hostname: "localhost" });
