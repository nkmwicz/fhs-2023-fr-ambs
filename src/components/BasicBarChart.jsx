import React, { useEffect, useRef, useState } from "react";
import {
  scaleBand,
  scaleLinear,
  max,
  group,
  axisLeft,
  axisBottom,
  mean,
  deviation,
} from "d3";
import { styleCircles, changeTickText } from "../map/components/mapStyling";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export const BasicBarChart = ({ data }) => {
  const divRef = useRef(null);
  const svgRef = useRef(null);
  const [divWidth, setdivWidth] = useState("400");

  const dataValues = groupedData.map((d) => d.info.length);

  function handleWidth() {
    if (typeof window !== "undefined") {
      setdivWidth(parseInt(divRef.current.offsetWidth, 10));
    }
  }

  useEffect(() => {
    handleWidth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    window.addEventListener("load", handleWidth);

    return (_) => {
      window.removeEventListener("resize", handleWidth);
      window.removeEventListener("load", handleWidth);
    };
  });

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const height = "400";
  const width = divWidth;

  const sortedXValue = groupedData.sort(
    (a, b) => b.value.length - a.value.length
  );
  const xValue = (d) => d.name;
  const yValue = (d) => d.info.length;
  const margin = { top: 15, right: 30, bottom: 50, left: 30 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand()
    .domain(sortedXValue.map(xValue))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, max(groupedData, yValue)])
    .range([innerHeight, 0])
    .nice();

  const yAxis = axisLeft(yScale).tickSize(-innerWidth);
  const xAxis = axisBottom(xScale);

  const dataMean = mean(dataValues);
  const dataMean2 = dataMean !== undefined ? dataMean.toFixed(2) : dataMean;
  const dataDeviation = deviation(dataValues);
  const dataDeviation2 =
    dataDeviation !== undefined ? dataDeviation.toFixed(2) : dataDeviation;

  return (
    <div className="d3-div" ref={divRef}>
      <svg
        className="d3-svg"
        height={height}
        ref={svgRef}
        alt="bar chart"
        aria-label="Bar chart"
        tabIndex={0}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {yScale.ticks().map((tickValue) => {
            return (
              <g
                key={uuidv4()}
                transform={`translate(0, ${yScale(tickValue)})`}
              >
                <line x2={innerWidth} className="bar-chart-y-line" />
                <text x={-15} className="bar-chart-y-text" dy=".2em">
                  {tickValue}
                </text>
              </g>
            );
          })}
          <g>
            {yScale(dataMean + dataDeviation + dataDeviation) < 0 ? null : (
              <>
                <line
                  strokeDasharray="5,5"
                  className="bar-chart-y-line"
                  y1={yScale(dataMean + dataDeviation + dataDeviation)}
                  y2={yScale(dataMean + dataDeviation + dataDeviation)}
                  x2={innerWidth + 5}
                  stroke={"black"}
                ></line>
                <OverlayTrigger
                  key={uuidv4()}
                  trigger={["hover", "focus"]}
                  placement="right"
                  overlay={(props) => (
                    <Popover id="two-deviations-above-the-means" {...props}>
                      <Popover.Body>
                        {(
                          Number(dataMean2) +
                          Number(dataDeviation2) +
                          Number(dataDeviation2)
                        ).toFixed(2)}
                      </Popover.Body>
                    </Popover>
                  )}
                >
                  <text
                    className="bar-chart-y-stats"
                    y={yScale(dataMean + dataDeviation + dataDeviation) + 3}
                    x={innerWidth + 10}
                  >
                    2&sigma;
                  </text>
                </OverlayTrigger>
              </>
            )}
            <line
              strokeDasharray="5,5"
              className="bar-chart-y-line"
              y1={yScale(dataMean + dataDeviation)}
              y2={yScale(dataMean + dataDeviation)}
              x2={innerWidth + 5}
              strok={"black"}
            ></line>
            <OverlayTrigger
              key={uuidv4()}
              trigger={["hover", "focus"]}
              placement="right"
              overlay={(props) => (
                <Popover id="one-deviation-over-the-mean" {...props}>
                  <Popover.Body>
                    {(Number(dataMean2) + Number(dataDeviation2)).toFixed(2)}
                  </Popover.Body>
                </Popover>
              )}
            >
              <text
                className="bar-chart-y-stats"
                y={yScale(dataMean + dataDeviation) + 3}
                x={innerWidth + 10}
              >
                1&sigma;
              </text>
            </OverlayTrigger>
            <line
              strokeDasharray="5,5"
              className="bar-chart-y-line"
              y1={yScale(dataMean)}
              y2={yScale(dataMean)}
              x2={innerWidth + 5}
              strok={"black"}
            ></line>
            <OverlayTrigger
              key={uuidv4()}
              trigger={["hover", "focus"]}
              placement="right"
              overlay={(props) => (
                <Popover id="popover-basic" {...props}>
                  <Popover.Body>{Number(dataMean2).toFixed(2)}</Popover.Body>
                </Popover>
              )}
            >
              <text
                className="bar-chart-y-stats"
                y={yScale(dataMean2) + 3}
                x={innerWidth + 10}
              >
                &mu;
              </text>
            </OverlayTrigger>
            {yScale(dataMean - dataDeviation) < yScale(0) ? (
              <>
                <line
                  strokeDasharray="5,5"
                  className="bar-chart-y-line"
                  y1={yScale(dataMean - dataDeviation)}
                  y2={yScale(dataMean - dataDeviation)}
                  x2={innerWidth + 5}
                  strok={"black"}
                ></line>
                <OverlayTrigger
                  key={uuidv4()}
                  trigger={["hover", "focus"]}
                  placement="right"
                  overlay={(props) => (
                    <Popover id="popover-basic" {...props}>
                      <Popover.Body>
                        {(Number(dataMean2) - Number(dataDeviation2)).toFixed(
                          2
                        )}
                      </Popover.Body>
                    </Popover>
                  )}
                >
                  <text
                    className="bar-chart-y-stats"
                    y={yScale(dataMean - dataDeviation) + 3}
                    x={innerWidth + 10}
                  >
                    -1&sigma;
                  </text>
                </OverlayTrigger>
              </>
            ) : null}
          </g>
          {xScale.domain().map((textValue) => {
            return (
              <g
                key={uuidv4()}
                transform={`translate(${
                  xScale(textValue) + xScale.bandwidth() / 2 + 3
                }, ${innerHeight + 7})`}
              >
                <text className="bar-chart-x-text" x={-15}>
                  {changeTickText(textValue)}
                </text>
              </g>
            );
          })}
          {groupedData.map((d, index) => {
            const arrayValues = [];
            for (let values of d.info) {
              arrayValues.push(values);
            }
            const groupedDataName = Array.from(
              group(arrayValues, (d) => d.properties.name),
              ([name, info]) => ({ name, info })
            );

            for (let nameValues of groupedDataName) {
              const arrayYearValues = [];
              for (const yearValues of nameValues.value) {
                arrayYearValues.push(yearValues.properties.year);
              }
            }

            const renderPopover = (props) => (
              <Popover id="popover-basic" {...props}>
                <Popover.Header>
                  <p className="text-center">
                    <strong>
                      {d.name}: {d.info.length}
                    </strong>
                  </p>
                </Popover.Header>
                <Popover.Body className="">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Ambassador</strong>
                        </td>
                        <td className="text-center">
                          <strong>Year(s) present</strong>
                        </td>
                      </tr>
                      {groupedDataName.map((d, index) => {
                        return (
                          <tr key={`person${index}`}>
                            <td>{d.name}</td>
                            <td className="text-center align-middle">
                              {d.info.length} year(s)
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Popover.Body>
              </Popover>
            );
            return (
              <OverlayTrigger
                key={`o${index}`}
                trigger={["hover", "focus"]}
                placement="right"
                overlay={renderPopover}
              >
                <rect
                  key={index}
                  x={xScale(xValue(d))}
                  y={yScale(yValue(d))}
                  width={xScale.bandwidth()}
                  height={innerHeight - yScale(yValue(d))}
                  fill={styleCircles(d.name).fillCircle}
                  aria-label={`graph bar representing ${d.name} with a value of ${d.info.length}`}
                  tabIndex={0}
                  stroke="black"
                />
              </OverlayTrigger>
            );
          })}
        </g>
      </svg>
      <p className="text-center">
        mean (&mu;): {dataMean2}
        <br />
        stand. dev. (&sigma;): {dataDeviation2}
      </p>
    </div>
  );
};
