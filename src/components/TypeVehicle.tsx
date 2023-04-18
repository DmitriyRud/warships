import React from "react";
import { ITypesVehicle } from "../types/ItypesVehicle";

interface TypeVehicleComponentProps {
  typesVehicle: ITypesVehicle;
  typeActive: string;
  iconsUrl: string;
  clickHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void;
}

function TypeVehicle({
  typesVehicle,
  typeActive,
  iconsUrl,
  clickHandler,
}: TypeVehicleComponentProps) {
  const defaultSrc = iconsUrl + typesVehicle.type.icons.default;

  return (
    <button
      type="button"
      className={
        typeActive === typesVehicle.name
          ? "type-buttons buttons-active"
          : "type-buttons"
      }
      onClick={(e) => clickHandler(e, typesVehicle.name)}
    >
      <img
        className="type-buttons-icon"
        src={defaultSrc}
        alt={typesVehicle.name}
      />
      <span>{typesVehicle.name}</span>
    </button>
  );
}

export default TypeVehicle;
