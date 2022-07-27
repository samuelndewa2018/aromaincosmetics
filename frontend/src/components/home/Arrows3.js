import React from "react";

function Arrows({ prevSlide, nextSlide }) {
  return (
    <div className="arrows3">
      <span className="prev3" onClick={prevSlide}>
        &#10094;
      </span>
      <span className="next3" onClick={nextSlide}>
        &#10095;
      </span>
    </div>
  );
}

export default Arrows;
