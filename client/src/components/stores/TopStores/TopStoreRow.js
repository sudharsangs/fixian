import React from "react";
import { Link } from "react-router-dom";
import placeHolderImg from "./../../../assets/images/store.jpg";
import { AmazonS3Url } from "./../../../utility/helpers";

const TopStoreRow = ({ store, index }) => {
  return (
    <tr key={store.slug}>
      <td>
        <Link to={`/store/${store.slug}`}>
          <img
            src={store.photo ? `${AmazonS3Url}${store.photo}` : placeHolderImg}
            alt={store.name}
            style={{ width: "200px" }}
          />
        </Link>
      </td>
      <td>{index + 1}</td>
      <td>
        <Link to={`/store/${store.slug}`}>{store.name}</Link>
      </td>
      <td>{store.reviews.length}</td>
      <td>{`${store.averageRating && store.averageRating.toFixed(2)} / 5`}</td>
    </tr>
  );
};

export default TopStoreRow;
