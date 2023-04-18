import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { IVehicle } from "../types/IVehicle";
import { INation } from "../types/INation";
import Vehicle from "../components/Vehicle";
import Nation from "../components/Nation";
import { ITypesVehicle } from "../types/ItypesVehicle";
import TypeVehicle from "../components/TypeVehicle";
import { IFilters } from "../types/IFilters";
import "../css/Homepage.css";

const API_URL = "https://vortex.worldofwarships.eu/api/encyclopedia/en";

interface Vehicles {
  vehicle: IVehicle;
  key: string;
}

function Homepage() {
  const [filters, setFilters] = useState<IFilters>({ nation: "", type: "" });
  const [loadingVehicles, setLoadingVehicles] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [nationActive, setNationActive] = useState<string>("");
  const [typeActive, setTypeActive] = useState<string>("");
  const [listVehicles, setListVehicles] = useState<Vehicles[]>([]);
  const [listNations, setListNations] = useState<INation[]>([]);
  const [typesVehicle, setTypesVehicle] = useState<ITypesVehicle[]>([]);
  const [iconsUrl, setIconsUrl] = useState<string>("");

  const listFilterVehicles = useMemo(() => {
    return listVehicles.filter((item) => {
      if (filters.type && filters.nation) {
        return (
          item.vehicle.nation === filters.nation &&
          item.vehicle.tags[0] === filters.type
        );
      } else if (filters.nation) {
        return item.vehicle.nation === filters.nation;
      } else if (filters.type) {
        return item.vehicle.tags[0] === filters.type;
      } else {
        return true;
      }
    });
  }, [listVehicles, filters]);

  useEffect(() => {
    axios
      .get(`https://vortex.worldofwarships.eu/api/encyclopedia/en/media_path/`)
      .then((response) => {
        setIconsUrl(response.data.data);
      })
      .catch((error) => {
        setError("Error loading icons!");
      });

    axios
      .get(`${API_URL}/vehicles/`)
      .then((response) => {
        const vehicles = Object.keys(response.data.data).map((item) => ({
          vehicle: response.data.data[item],
          key: item,
        }));
        setListVehicles(vehicles);
        setLoadingVehicles(false);
      })
      .catch((error) => {
        setError("Error loading vehicles!");
      });

    axios
      .get(`${API_URL}/nations/`)
      .then((response) => {
        const nations = response.data.data;
        setListNations(nations);
      })
      .catch((error) => {
        setError("Error loading nations!");
      });

    axios
      .get(`${API_URL}/vehicle_types_common/`)
      .then((response) => {
        const typesVehicle = Object.keys(response.data.data).map((item) => ({
          type: response.data.data[item],
          name: item,
        }));
        setTypesVehicle(typesVehicle);
      })
      .catch((error) => {
        setError("Error loading vehicle types!");
      });
  }, []);

  const nationHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    setFilters((prevstate) => ({ ...prevstate, nation: name }));
    setNationActive(name);
  };

  const typeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: string
  ) => {
    setFilters((prevstate) => ({ ...prevstate, type: type }));
    setTypeActive(type);
  };

  const handleClearTypes = () => {
    setFilters((prevstate) => ({ ...prevstate, type: "" }));
    setTypeActive("");
  };

  const handleClearNation = () => {
    setFilters((prevstate) => ({ ...prevstate, nation: "" }));
    setNationActive("");
  };

  const onTypeClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: string) =>
      typeHandler(e, type),
    []
  );

  const onNationClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) =>
      nationHandler(e, name),
    []
  );

  return (
    <div className="container">
      {error && <p className="message-error">{error}</p>}
      {loadingVehicles && <p className="message">Loading...</p>}
      {!loadingVehicles && listFilterVehicles.length === 0 && (
        <p className="message">Empty. Please select another filter.</p>
      )}
      {!loadingVehicles && (
        <div className="filters-container">
          <div className="filters-types">
            <button
              type="button"
              className="type-buttons button-all"
              onClick={handleClearTypes}
            >
              All
            </button>

            {typesVehicle.map((item) => (
              <TypeVehicle
                key={item.name}
                typesVehicle={item}
                typeActive={typeActive}
                iconsUrl={iconsUrl}
                clickHandler={onTypeClick}
              />
            ))}
          </div>
          <div className="filters-nations">
            <button
              type="button"
              className="type-buttons button-all"
              onClick={handleClearNation}
            >
              All
            </button>
            {listNations.map(
              (item) =>
                !item.tags.includes("hidden") && (
                  <Nation
                    key={item.id}
                    nation={item}
                    activeNation={nationActive}
                    iconsUrl={iconsUrl}
                    clickHandler={onNationClick}
                  />
                )
            )}
          </div>
        </div>
      )}
      <div className="cards-container">
        {listFilterVehicles.length > 0 &&
          listFilterVehicles.map((item) => (
            <Vehicle
              key={item.key}
              vehicle={item.vehicle}
              iconsUrl={iconsUrl}
            />
          ))}
      </div>
    </div>
  );
}

export default Homepage;
