import React, { Component } from "react";
import { toast } from "react-toastify";
import TextAreaFieldGroup from "./../../common/TextAreaFieldGroup";
import { reviewStore } from "./../../../actions/storeActions";
import "./StoreReviewForm.css";

let ratingsArr = [5, 4, 3, 2, 1];

class StoreReviewForm extends Component {
  state = {
    text: "",
    rating: undefined
  };
  onSubmit = e => {
    e.preventDefault();
    reviewStore(this.props.store._id, this.state)
      .then(() => {
        toast.success("Review succesfully added.");
        setTimeout(() => {
          this.props.getStoreBySlug();
        }, 2000);
      })
      .catch(e => toast.error(e[0].detail));
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const stars = ratingsArr.map(num => {
      return (
        <React.Fragment key={num}>
          <input
            type="radio"
            id={`star${num}`}
            name="rating"
            value={num}
            onChange={this.onChange}
          />
          <label htmlFor={`star${num}`}>
            <i className="fas fa-star" />
          </label>
        </React.Fragment>
      );
    });
    return (
      <div className="card my-3">
        <form onSubmit={this.onSubmit}>
          <TextAreaFieldGroup
            name="text"
            onChange={this.onChange}
            value={this.state.text}
            placeholder="Did you try this place? Have something to say? Leave a review.."
            required
          />
          <div className="d-flex justify-content-around py-2">
            <div className="star-rating">{stars}</div>
            <input
              className="btn btn-warning"
              type="submit"
              value="Submit Review →"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default StoreReviewForm;
