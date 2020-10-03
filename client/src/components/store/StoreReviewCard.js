import React from "react";
import moment from "moment";

const StoreReviewCard = ({ review }) => {
  return (
    <div key={review._id} className="row my-4 border">
      <div className="col-md-2 col-3">
        <img
          src={review.author.avatar}
          className="img-fluid rounded-circle"
          alt=""
        />
        <span className="d-block text-center">{review.author.name}</span>
      </div>

      <div className="col-md-10 col-9 border-left">
        <div className="row justify-content-around py-2 border-bottom">
          <span>
            {`★`.repeat(review.rating)}
            {`☆`.repeat(5 - review.rating)}
          </span>
          <span>{moment(review.created).fromNow()}</span>
        </div>
        <p className="mt-3">{review.text}</p>
      </div>
    </div>
  );
};

export default StoreReviewCard;
