export type Screen =
  | "splash"
  | "home"
  | "camera"
  | "analyzing"
  | "result"
  | "history"
  | "profile";

export interface ScanRecord {
  id: string;
  crop: string;
  diagnosis: string;
  scientificName: string;
  date: string;
  severity: "Sano" | "Moderado" | "Severo";
  color: string;
  bg: string;
  img: string;
  recommendations: string[];
}
