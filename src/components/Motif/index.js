import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import gsap from "gsap";
import uuid from "uuid";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// Triangle sizes and colors.
const triangleColors = ["#FFA1A1", "#A6DCE8", null];
const triangleSizes = [30, 100, 300];

// Returns a random integer within a range, inclusive.
function randomWithinRange(start, end, randomValue) {
  return Math.floor((end - start + 1) * randomValue + start);
}

// Pickss a random element within an array.
function pickRandom(array, randomValue) {
  return array[randomWithinRange(0, array.length - 1, randomValue)];
}

const Triangle = ({ start, end, radius }) => {
  const missingProps = !start || !end || !radius;
  const ref = useRef(null);
  const [triangleSetup] = useState({
    uuid: uuid(),
    colorRandom: Math.random(),
    sizeRandom: Math.random(),
    rotateRandom: Math.random(),
    durationRandom: Math.random(),
    radiusRandom: Math.random(),
  });

  const { sideLength, color, halfSide, height } = useMemo(() => {
    const sideLength = pickRandom(triangleSizes, triangleSetup.sizeRandom);
    const halfSide = sideLength / 2;

    return {
      sideLength,
      color: pickRandom(triangleColors, triangleSetup.colorRandom),
      halfSide,
      height: Math.floor(Math.sqrt(sideLength ** 2 - halfSide ** 2)),
    };
  }, [triangleSetup]);

  useEffect(() => {
    if (!ref.current || missingProps) return;

    const [startX, startY] = start;
    const [endX, endY] = end;
    const xOffset =
      -halfSide +
      randomWithinRange(-radius, radius, triangleSetup.radiusRandom);

    gsap.fromTo(
      ref.current,
      {
        x: startX + xOffset,
        y: startY,
        opacity: 1,
        rotate: 0,
      },
      {
        x: endX + xOffset,
        y: endY,
        opacity: 0,
        rotate: randomWithinRange(100, 140, triangleSetup.rotateRandom),
        duration: randomWithinRange(1, 5, triangleSetup.durationRandom),
        onComplete: () => {},
      }
    );
  }, [ref, start, end, halfSide, missingProps, triangleSetup]);

  return (
    !missingProps && (
      <svg
        ref={ref}
        width={sideLength}
        height={height}
        viewBox={`0 0 ${sideLength} ${height}`}
        style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
      >
        <defs>
          <linearGradient
            id={`gradient_${triangleSetup.uuid}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: color, stopOpacity: "1" }} />
            <stop offset="90%" style={{ stopColor: color, stopOpacity: "0" }} />
          </linearGradient>
        </defs>

        <polygon
          points={[
            `${halfSide}, 0`,
            `0, ${sideLength}`,
            `${sideLength}, ${sideLength}`,
          ].join(" ")}
          fill={color ? `url(#gradient_${triangleSetup.uuid})` : "none"}
          strokeWidth={color ? "0px" : "2px"}
          strokeDasharray={"10 10"}
          stroke={color ? "rgba(0, 0, 0, 0)" : "white"}
        />
      </svg>
    )
  );
};

const Motif = ({ start = [0.5, 0], end = [0.5, 1], radius = 0.5 }) => {
  const ref = useRef(null);
  const [containerSize, setContainerSize] = useState(null);
  const { startNorm, endNorm, radiusNorm } = useMemo(
    () =>
      containerSize
        ? {
            startNorm: [
              start[0] * containerSize.width,
              containerSize.height - start[1] * containerSize.height,
            ],
            endNorm: [
              end[0] * containerSize.width,
              containerSize.height - end[1] * containerSize.height,
            ],
            radiusNorm: radius * containerSize.width,
          }
        : {},
    [start, end, radius, containerSize]
  );

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  }, []);

  return (
    <Container ref={ref}>
      {Array.from({ length: 10 }).map(() => (
        <Triangle start={startNorm} end={endNorm} radius={radiusNorm} />
      ))}
    </Container>
  );
};

export { Motif };
