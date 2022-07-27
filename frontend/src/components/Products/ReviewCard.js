import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "@material-ui/lab";
import Loading from "../more/Loader";
import "./Productdetails.css";

const ReviewCard = ({ review }) => {
  const { loading } = useSelector((state) => state.productDetails);
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    color: "#3BB77E",
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 15px",
                }}
              >
                <p className="ReviewsSection">{review.name}</p>
                <p style={{ paddingLeft: "8px", color: "#999999e0" }}>
                  {String(review.time).substr(0, 10)}
                </p>
              </div>
              <div style={{ padding: "0px 15px", paddingBottom: "1px" }}>
                <p className="ReviewsSectionP">{review.comment}</p>
                <p style={{ paddingBottom: "5px" }}>
                  <Rating {...options} />
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReviewCard;
