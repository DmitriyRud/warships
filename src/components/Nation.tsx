import React from "react";
import { INation } from "../types/INation";

interface NationComponentProps {
  nation: INation;
  activeNation: string;
  iconsUrl: string;
  clickHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void;
}

function Nation({
  nation,
  activeNation,
  iconsUrl,
  clickHandler,
}: NationComponentProps) {
  const tinySrc = iconsUrl + nation.icons.tiny;
  const defaultSrc = iconsUrl + nation.icons.large;

  return (
    <button
      type="button"
      data-name={nation.name}
      className={
        activeNation === nation.name
          ? "nation-buttons buttons-active"
          : "nation-buttons"
      }
      onClick={(e) => clickHandler(e, nation.name)}
    >
      <img className="nation-flag" src={tinySrc} alt={nation.name} />
      <span className="nation-name">{nation.localization.mark.en}</span>
      <div className="big-flag">
        <img src={defaultSrc} alt={nation.name} />
      </div>
    </button>
  );
}

export default Nation;
