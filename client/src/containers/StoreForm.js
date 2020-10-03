import React, { Component } from "react";
import { AmazonS3Url } from "./../utility/helpers";
import TextFieldGroup from "./../components/common/TextFieldGroup";
import TextAreaFieldGroup from "./../components/common/TextAreaFieldGroup";
import FileFieldGroup from "./../components/common/FileFieldGroup";
import { choices } from "./../utility/tags";

class StoreForm extends Component {
  state = {
    name: this.props.store ? this.props.store.name : "",
    description: this.props.store ? this.props.store.description : "",
    photo: this.props.store ? this.props.store.photo : "",
    tags: this.props.store ? this.props.store.tags : [],
    slug: this.props.store ? this.props.store.slug : "",
    location: this.props.store
      ? this.props.store.location
      : { address: "", coordinates: ["", ""] },
    file: null
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onAddressChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };

    const google = window.google; //reactjs use a linting rule that forbids unknown global variables.
    let dropdown = new google.maps.places.Autocomplete(e.target);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      copyState.location.address = place.formatted_address;
      copyState.location.coordinates[1] = lat;
      copyState.location.coordinates[0] = lng;
      this.setState({ location: copyState.location });
    });

    copyState.location.address = e.target.value;
    this.setState({
      location: copyState.location
    });
  };
  onLngChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };
    copyState.location.coordinates[0] = e.target.value;
    this.setState({ location: copyState.location });
  };
  onLatChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };
    copyState.location.coordinates[1] = e.target.value;
    this.setState({ location: copyState.location });
  };
  onCheck = e => {
    let tags = [...this.state.tags];
    if (e.target.checked) {
      tags.push(e.target.value);
    } else {
      tags = tags.filter(tag => tag !== e.target.value);
    }
    this.setState({ tags });
  };
  onFileChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  render() {
    const tagChoices = choices.map(choice => {
      return (
        <div className="form-check form-check-inline" key={choice}>
          <input
            type="checkbox"
            className="form-check-input"
            id={choice}
            value={choice}
            checked={this.state.tags.includes(choice)}
            onChange={this.onCheck}
          />
          <label className="form-check-label">{choice}</label>
        </div>
      );
    });
    const storePhoto = this.props.store &&
      this.props.store.photo && (
        <img
          src={`${AmazonS3Url}${this.props.store.photo}`}
          alt={this.props.store.name}
          width="200"
        />
      );

    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="text"
          label="Name"
          name="name"
          onChange={this.onChange}
          value={this.state.name}
          required
        />
        <TextAreaFieldGroup
          label="Description"
          name="description"
          onChange={this.onChange}
          value={this.state.description}
        />
        {storePhoto}
        {/* img(src=`/uploads/${store.photo}`, alt=store.name width=200) */}
        <FileFieldGroup
          label="Photo"
          onChange={this.onFileChange}
          accept="image/*"
        />
        {/* address, lng and lat */}
        <TextFieldGroup
          type="text"
          id="address"
          label="Address"
          name="location[address]"
          onChange={this.onAddressChange}
          value={this.state.location.address}
          required
        />
        <TextFieldGroup
          type="text"
          id="lng"
          label="Address Lng"
          name="location[coordinates][0]"
          onChange={this.onLngChange}
          value={this.state.location.coordinates[0] || ""}
          required
        />
        <TextFieldGroup
          type="text"
          id="lat"
          label="Address Lat"
          name="location[coordinates][1]"
          onChange={this.onLatChange}
          value={this.state.location.coordinates[1] || ""}
          required
        />

        {tagChoices}
        <input
          type="submit"
          value="Save"
          className="btn btn-warning btn-block"
        />
      </form>
    );
  }
}

export default StoreForm;
