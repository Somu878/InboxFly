import { Redis } from "@upstash/redis";

export const revalidate = 0;

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
