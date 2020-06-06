import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  createContext,
} from "react";
import styled from "styled-components";
import gsap from "gsap";
import uuid from "uuid";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
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

const TriangleContext = createContext({ onComplete: () => () => {} });

const Triangle = ({ uuid, start, end, radius, colorIndex }) => {
  const missingProps = !start || !end || !radius;
  const ref = useRef(null);
  const gsapRef = useRef(null);
  const { onComplete } = useContext(TriangleContext);
  const color = triangleColors[colorIndex];
  const [triangleSetup] = useState({
    start,
    end,
    radius,
    colorIndex,
    sizeRandom: Math.random(),
    rotateRandom: Math.random(),
    rotateEndRandom: Math.random(),
    durationRandom: Math.random(),
    radiusRandom: Math.random(),
  });

  const { sideLength, halfSide, height } = useMemo(() => {
    const sideLength = pickRandom(triangleSizes, triangleSetup.sizeRandom);
    const halfSide = sideLength / 2;

    return {
      sideLength,
      halfSide,
      height: Math.floor(Math.sqrt(sideLength ** 2 - halfSide ** 2)),
    };
  }, [triangleSetup]);

  useEffect(() => {
    if (!ref.current || missingProps) return;

    const [startX, startY] = triangleSetup.start;
    const [endX, endY] = triangleSetup.end;
    const xOffset =
      -halfSide +
      randomWithinRange(
        -triangleSetup.radius,
        triangleSetup.radius,
        triangleSetup.radiusRandom
      );

    if (!gsapRef.current) {
      const rotationAngle = randomWithinRange(
        30,
        60,
        triangleSetup.rotateRandom
      );
      const negativeAngle = triangleSetup.rotateEndRandom > 0.5;
      const duration = randomWithinRange(30, 40, triangleSetup.durationRandom);

      setTimeout(onComplete(uuid), duration * 1_000);

      gsapRef.current = gsap.fromTo(
        ref.current,
        {
          x: startX + xOffset,
          y: startY,
          opacity: 1,
          rotate: (-1) ** negativeAngle * rotationAngle,
        },
        {
          x: endX + xOffset,
          y: endY,
          opacity: 0,
          rotate: -1 * (-1) ** negativeAngle * rotationAngle,
          duration,
        }
      );
    }
  }, [ref, halfSide, missingProps, triangleSetup, uuid, onComplete]);

  return (
    !missingProps && (
      <svg
        ref={ref}
        width={sideLength}
        height={height}
        viewBox={`0 0 ${sideLength} ${height}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient
            id={`gradient_${uuid}`}
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
          fill={color ? `url(#gradient_${uuid})` : "none"}
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
  const [triangles, setTriangles] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
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

  const addTriangle = () => {
    setTriangles((triangles) => [...triangles, { uuid: uuid(), colorIndex }]);
    setColorIndex((colorIndex) => (colorIndex + 1) % triangleColors.length);
  };

  useEffect(() => {
    const intervalId = setInterval(addTriangle, 3_000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <TriangleContext.Provider
      value={{
        onComplete: (uuid) => (_) => {
          setTriangles((triangles) => {
            const newTriangles = triangles.filter(
              (triangle) => triangle.uuid !== uuid
            );

            return newTriangles;
          });
        },
      }}
    >
      <Container ref={ref}>
        {triangles.map(({ uuid, colorIndex }) => (
          <Triangle
            key={uuid}
            uuid={uuid}
            start={startNorm}
            end={endNorm}
            radius={radiusNorm}
            colorIndex={colorIndex}
          />
        ))}
      </Container>
    </TriangleContext.Provider>
  );
};

export { Motif };
