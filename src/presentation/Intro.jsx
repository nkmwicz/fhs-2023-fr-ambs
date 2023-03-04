/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from "react";
import "./styling.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * --Intro creates a basic introductory page,
 * taking in a title, subTitle, and byLine for
 * metaData on the slideShow.
 * --bgImage inputs an image inline into the component as the background.
 * --bgColor inputs a background color onto the component with inline styling.
 * --backgroundClass can be used to create a customized css for the component.
 * --If using backgroundClass, bgImage is unneccessaary since
 * a background image can be added directly to the css. The same applies to bgColor.
 * --titleClass creates a custom class for the container holding
 * the titleBox, the title, and the byline.
 * --titleBoxClass can be added to customize css
 * on the titlebox (the container holding the title and byline)
 */
function Intro({
  title,
  subTitle,
  byLine,
  bgImage,
  bgColor,
  titleBoxClass,
  backgroundClass,
  titleClass,
  url,
}) {
  return (
    <>
      <div
        className={backgroundClass || "bg-intro "}
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage})`,
              }
            : bgColor
            ? {
                backgroundColor: bgColor,
              }
            : null
        }
      />
      <div className={titleClass || "title"}>
        <div className={titleBoxClass || "title-box"}>
          <h1 className="text-center">
            {title}
            <br />
            <br />
            {subTitle}
          </h1>
          <br />
          <h2 className="text-center">{byLine}</h2>
        </div>
      </div>

      {url && (
        <h2 className="follow-along">
          Follow Along:
          {url}
        </h2>
      )}
    </>
  );
}

export default Intro;
