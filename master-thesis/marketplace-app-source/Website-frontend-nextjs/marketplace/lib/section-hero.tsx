import { get } from "./api";
import { SectionHero } from "./model";

export async function getSectionHero(): Promise<SectionHero> {
  return await get<SectionHero>("section-hero");
}
