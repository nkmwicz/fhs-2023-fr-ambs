import React from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import "./styling.css";

/**
 * --headerClass is a class added for customizing css of the header.
 * --recommended data model for images: {image: 'string', opacity: Number, description: 'String' }. image is the image url.
 * opacity is the opacity number for the image. Default value is 1. Change to 2 if you want that image to be twice the width of the other images. Description is the figcaption value and alt-text.
 * --If you prefer a series of columns of text, use textArray, which takes an array of objects: [{text: string, color: string, children: [{text: string, color: string}]}].
 * The convoluted array of arrays for text permits subitems to be incorporated into the
 * --headerClass
 * --contentBoxClass
 * --
 */
function CenteredSlide({
  headerClass,
  title,
  subTitle,
  images,
  text,
  contentBoxClass,
  contentTextClass,
  imageArrayBoxClass,
}) {
  return (
    <div className="cover">
      <div className={`${headerClass} header`}>
        <h1>
          {title}{" "}
          {subTitle ? (
            <>
              <br /> {subTitle}
            </>
          ) : null}
        </h1>
      </div>
      <div className={`${contentBoxClass} content-box`}>
        {images?.length > 0 ? (
          <div className="content-images">
            {images.map((a) => (
              <figure
                key={uuidv4()}
                className={`${imageArrayBoxClass} imgArray-box`}
                style={a.opacity ? { opacity: a.opacity } : { opacity: 1 }}
              >
                <img src={a.image ? a.image : null} alt={a.description} />
                <figcaption className="text-center">{a.description}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className={`${contentTextClass} content-text`}>
            {text.map((a) => (
              <div key={uuidv4()} className="text">
                <div className="text-item" key={uuidv4()}>
                  <p key={uuidv4()} style={{ color: a.color }}>
                    {a.text}
                  </p>
                  {a.children && (
                    <ul key={uuidv4()}>
                      {a.children.map((b) => (
                        <li key={uuidv4()} style={{ color: b.color }}>
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

CenteredSlide.propTypes = {
  headerClass: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  images: PropTypes.array,
  text: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          color: PropTypes.string,
        })
      ),
    })
  ),
  contentBoxClass: PropTypes.string,
  contentTextClass: PropTypes.string,
  imageArrayBoxClass: PropTypes.string,
};

export default CenteredSlide;
