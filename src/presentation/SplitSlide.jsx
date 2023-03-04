import React from "react";
import "./styling.css";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";;
/**
 * The SplitSlide component provides a split slide
 * with a quarter of the slide on the left providing space
 * for text, and the other three-quarters of the slide on the
 * right is available for an image that is automatically sized
 * and centered to the center of the image container.
 * It can take a title, subTitle, text, image, h1Class.
 * --title provides a title to the component as a string.
 * --subTitle provides a subtitle to the component as a string.
 * --h1Class accepts a class to provide specialized css to the h1.
 * --headerClass accepts a class name for specialized css on the header holding the h1.
 * --text accepts an array of objects [{text, color}] to decide the text and color of each text entry.
 * --leftBoxClass accepts a class name to customize css of the left box.
 * --image accepts an object including an image and a description:
 * {image: 'https', description: 'This is an example image'}. The description also is included in the alt-text as well as the figcaption.
 * --rightBoxClass accepts a class name to customize css of the right box container.
 */
function SplitSlide({
  title,
  subTitle,
  h1Class,
  headerClass,
  text,
  image,
  leftBoxClass,
  rightBoxClass,
  imgBoxClass,
}) {
  return (
    <div>
      <div className={`${headerClass} header`}>
        <h1 className={h1Class ? h1Class : ""}>
          {title}{" "}
          {subTitle ? (
            <>
              <br /> {subTitle}
            </>
          ) : (
            ""
          )}
        </h1>
      </div>
      <div className="split-container">
        <div className={leftBoxClass ? leftBoxClass : "left-box"}>
          {typeof text !== "object" ? 
          // eslint-disable-next-line no-console
            console.error(
                "text prop must be included, and it should have the following data format: [{text: 'string', color: 'string'}]"
              )
            : text.map((a) => (
                <div className="left-text-container" key={uuidv4()}>
                  <p style={{ color: a.color }}>{a.text}</p>
                </div>
              ))}
        </div>
        <div className={rightBoxClass ? rightBoxClass : "right-box"}>
          {typeof image !== "object" ? (
            // eslint-disable-next-line no-console
            console.error(
              "image must be present and in the following data format: {image: 'string', description: 'string'}"
            )
          ) : (
            <figure className={imgBoxClass ? imgBoxClass : "img-right-box"}>
              <img src={image.image} alt={image.description} />
              <figcaption className="text-center">
                {image.description}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}

SplitSlide.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  h1Class: PropTypes.string,
  headerClass: PropTypes.string,
  text: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  image: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  leftBoxClass: PropTypes.string,
  rightBoxClass: PropTypes.string,
  imgBoxClass: PropTypes.string,
};

export default SplitSlide;
