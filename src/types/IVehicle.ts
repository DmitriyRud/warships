import { Icons, Mark } from "./ICommon";

export interface IVehicle {
  level: number;
  name: string;
  icons: Icons;
  tags: string[];
  localization: Localization;
  nation: string;
}
export interface Localization {
  shortmark: Shortmark;
  description: Description;
  mark: Mark;
}

export interface Shortmark {
  [key: string]: string;
}

export interface Description {
  [key: string]: string;
}
