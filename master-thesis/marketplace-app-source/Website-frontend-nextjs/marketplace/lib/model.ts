export type DataType = "page-not-found" | "section-hero";

export interface ResponseBase {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PageNotFound extends ResponseBase {
  headline: string;
  description: string;
  buttonText: string;
}

export interface SectionHero extends ResponseBase {
  headline: string;
  description: string;
}
