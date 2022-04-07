import { Context } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import {
  Payload,
  create,
  getNumericDate,
  Header,
} from "https://deno.land/x/djwt@v2.4/mod.ts";
import users from "./users.ts";
import key from "./key.ts";

const header: Header = {
  alg: "HS256",
  type: "JWT",
};

export const login = async ({ request, response }: Context) => {
  const { username, password } = await request.body().value;

  for (const user of users) {
    if (user.username === username && user.password === password) {
      const payload: Payload = {
        iss: user.username,
        id: user.id,
        exp: getNumericDate(30), // 30 seconds,
      };

      // Create JWT and send it to user
      const jwt = await create(header, payload, key as CryptoKey);

      if (jwt) {
        response.status = 200;
        response.body = {
          id: user.id,
          username: user.username,
          token: jwt,
        };
      } else {
        response.status = 500;
        response.body = {
          message: "Internal server error",
        };
      }
      return;
    }
  }

  response.status = 401;
  response.body = {
    message: "Invalid username or password",
  };
};

export const guest = ({ response }: Context) => {
  response.body = "Guest success";
};

export const auth = ({ response }: Context) => {
  response.body = "Auth success";
};
