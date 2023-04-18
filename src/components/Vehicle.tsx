import { IVehicle } from "../types/IVehicle";
import "../css/Card.css";

interface VehicleComponentProps {
  vehicle: IVehicle;
  iconsUrl: string;
}

function Vehicle({ vehicle, iconsUrl }: VehicleComponentProps) {
  const contourAliveSrc = iconsUrl + vehicle.icons.contour_alive;
  const largeSrc = iconsUrl + vehicle.icons.large;
  const localSmallSrc = iconsUrl + vehicle.icons.contour;

  return (
    <div className="card">
      <h3 className="card-title">{vehicle.localization.shortmark.en}</h3>
      <h5 className="card-nation">{vehicle.nation}</h5>
      <img src={largeSrc} alt={vehicle.name} className="card-image"></img>
      <div className="card-hashtags">
        {vehicle.tags.map((item) => (
          <span key={item} className="hashtag">
            #{item}
          </span>
        ))}
      </div>
      <p className="card-description">{vehicle.localization.description.en}</p>
      <div className="card-schemas">
        <img src={localSmallSrc} alt={vehicle.name}></img>
        <img src={contourAliveSrc} alt={vehicle.name}></img>
      </div>
    </div>
  );
}

export default Vehicle;
