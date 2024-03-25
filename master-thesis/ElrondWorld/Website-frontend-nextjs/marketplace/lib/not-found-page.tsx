import { get } from "./api";
import { PageNotFound } from "./model";

export async function getPageNotFound(): Promise<PageNotFound> {
  return await get<PageNotFound>("page-not-found");
}
