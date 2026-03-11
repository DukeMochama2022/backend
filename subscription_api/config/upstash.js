import { Client } from "@upstash/workflow";

export const client = new Client({
  baseUrl: "http://localhost:8080",
  token:
    "eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=",
});
