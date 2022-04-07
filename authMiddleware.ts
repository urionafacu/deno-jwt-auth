// deno-lint-ignore-file
import { Context } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";
import key from "./key.ts";

const authMiddleware = async ({ request, response }: Context, next: any) => {
  const authorization = request.headers.get("Authorization");

  if (!authorization) {
    response.status = 401;
    return;
  }

  const jwt = authorization.split(" ").pop();

  if (!jwt) {
    response.status = 401;
    return;
  }

  try {
    await verify(jwt, key);
    await next();
    return;
  } catch (error) {
    response.status = 401;
    response.body = { message: "Invalid token" };
    return;
  }
};

export default authMiddleware;
