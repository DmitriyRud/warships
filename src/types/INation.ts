import { Icons, Mark } from "./ICommon";

export interface INation {
  name: string;
  icons: Icons;
  color: number;
  tags: string[];
  localization: Localization;
  id: number;
}

export interface Localization {
  mark: Mark;
}
