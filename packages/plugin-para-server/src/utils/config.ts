import { Para as ParaServer, Environment } from "@getpara/server-sdk";
const PARA_API_KEY = process.env.PARA_API_KEY;
export const para = new ParaServer(
  process.env.PARA_ENV as Environment,
  PARA_API_KEY,
);
