import { Icons, Mark } from "./ICommon";

export interface ITypesVehicle {
  type: Type;
  name: string;
}

export interface Type {
  icons: Icons;
  sort_order: number;
  localization: Localization;
  name: string;
}

export interface Localization {
  shortmark: Shortmark;
  mark: Mark;
}

export interface Shortmark {}
