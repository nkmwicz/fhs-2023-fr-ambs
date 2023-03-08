import React from "react";
import PropTypes from "prop-types";

export function SlideNumber({ slideNumber }) {
  return (
    <div className="slideNumber">
      <p>Slide {slideNumber}</p>
    </div>
  );
}

SlideNumber.propTypes = {
  slideNumber: PropTypes.number,
};
