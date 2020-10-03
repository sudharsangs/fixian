import React, { Component } from "react";
import { MapWithGeocode } from "./../map/GoogleMap";

class RentalMap extends Component {
  render() {
    const location = this.props.location; //string with city,street
    return (
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqWKG6hjcDPOGI9OAABK8Cv849hPS189M&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

export default RentalMap;
