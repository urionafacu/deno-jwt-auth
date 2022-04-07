const key = await crypto.subtle.generateKey(
  {
    name: "HMAC",
    hash: "SHA-256",
    length: 512,
  },
  true,
  ["sign", "verify"]
);

export default key;
