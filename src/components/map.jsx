import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const CentralMap = props => {
  return (
    <Map center={[0.0, 0.0]} zoom={2} className="map-styling">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'
      />
      {props.meteorites.map(meteorite => {
        return meteorite.geolocation.latitude !== "unknown" ? (
          <Marker
            className="marker"
            key={meteorite.id}
            position={[
              meteorite.geolocation.latitude,
              meteorite.geolocation.longitude
            ]}
            onClick={() => {
              props.showMeteoriteData(meteorite);
            }}
          ></Marker>
        ) : null;
      })}
      {props.activeMeteorite && (
        <Popup
          position={[
            props.activeMeteorite.geolocation.latitude,
            props.activeMeteorite.geolocation.longitude
          ]}
          onClose={() => {
            props.showMeteoriteData(null);
          }}
        >
          <div id="popup-info">
            <h3>{props.activeMeteorite.name}</h3>
            <p id="popup-info">
              Mass:{" "}
              {props.activeMeteorite.mass > 1000
                ? props.activeMeteorite.mass / 1000 + "kg"
                : props.activeMeteorite.mass + "grams"}
            </p>
            <p id="popup-info">
              Geolocation: {props.activeMeteorite.geolocation.latitude},{" "}
              {props.activeMeteorite.geolocation.longitude}
            </p>
            <p id="popup-info">Year: {props.activeMeteorite.year}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default CentralMap;
