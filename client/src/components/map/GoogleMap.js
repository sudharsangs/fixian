import React from "react";

import {
  // withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  // Circle,
  InfoWindow // Display error if invalid address
} from "react-google-maps";

const MapComponent = ({ coordinates, isError, isLocationLoaded }) => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: isError ? true : false }}
    >
      {!isError && <Marker position={coordinates} />}
      {isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            There was a problem finding the location on the map. Contact host
            for additional information if you are still interested in booking
            this place. We are sorry for incovienence.
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

function withGeocode(WrappedComponent) {
  return class extends React.Component {
    state = {
      coordinates: {
        lat: 0,
        lng: 0
      },
      isError: false
    };
    componentDidMount() {
      this.getGeocodedLocation();
    }
    updateCoordinates(coordinatesArr) {
      const coordinates = {
        lng: coordinatesArr[0],
        lat: coordinatesArr[1]
      };
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }
    getGeocodedLocation() {
      const {
        location: { coordinates }
      } = this.props;
      this.updateCoordinates(coordinates);
    }
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithGeocode = withGoogleMap(withGeocode(MapComponent));
//Look up doc for HOC "withScriptJS"
