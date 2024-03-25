import { DataType } from "./model";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function get<T>(type: DataType): Promise<T> {
  const res = await fetch(`${base_url}/${type}`);
  if (!res.ok) {
    throw new Error(`Unable to get data from ${base_url}/${type}.`);
  }

  return await res.json();
}
