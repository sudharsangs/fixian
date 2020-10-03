import React, { Component } from "react";
import { connect } from "react-redux";
import { heartStore } from "./../actions/userActions";
import { auth } from "./../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { AmazonS3Url } from "./../utility/helpers";
import placeHolderImg from "./../assets/images/store.jpg";

class StoreCard extends Component {
  onHeartClick = id => {
    heartStore(id)
      .then(() => this.props.auth())
      .catch(e => {});
  };
  render() {
    // Display placeholder img if invalid link
    const img = (
      <img
        src={
          this.props.storeData.photo
            ? `${AmazonS3Url}${this.props.storeData.photo}`
            : placeHolderImg
        }
        className="card-img-top"
        alt=""
      />
    );
    const { userData } = this.props.user;
    const { storeData } = this.props;
    return (
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className="card position-relative my-2">
          {img}
          <div className="card-body">
            <h4>
              <Link to={`/store/${storeData.slug}`}>{storeData.name}</Link>
            </h4>
            <p className="card-text">
              {storeData.description
                .split(" ")
                .slice(0, 25)
                .join(" ")}
            </p>
          </div>
          <div className="position-absolute d-flex justify-content-around w-100 text-white mt-2">
            {userData.isAuth ? (
              <React.Fragment>
                {storeData.author === userData.id ? (
                  <Link
                    to={`/stores/${storeData._id}/edit`}
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <i className="far fa-edit" /> Edit
                  </Link>
                ) : null}
                <i
                  className={classnames("fas fa-heart fa-lg", {
                    "text-danger": userData.hearts.includes(storeData._id)
                  })}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.onHeartClick(storeData._id)}
                />
              </React.Fragment>
            ) : null}
            <div>
              <i className="far fa-comment-alt fa-lg mx-1" />
              <span>{storeData.reviews.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { auth }
)(StoreCard);
