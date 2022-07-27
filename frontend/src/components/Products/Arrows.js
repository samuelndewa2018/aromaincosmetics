import React from "react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows2">
      <span className="prev2" onClick={prevSlide}>
        &#10094;
      </span>
      <span className="next2" onClick={nextSlide}>
        &#10095;
      </span>
    </div>
  );
}

export default Arrows;
