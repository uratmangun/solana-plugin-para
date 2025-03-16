import { ParaWeb, Environment } from "@getpara/web-sdk";
const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY;
export const para = new ParaWeb(
  process.env.NEXT_PUBLIC_PARA_ENV as Environment,
  PARA_API_KEY,
);
