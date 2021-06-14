import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';

const BackdropStyles = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 3rem;

  .card {
    position: relative;
    padding: 3rem 4rem;
    background: var(--grey);
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s, opacity 0.5s;
    will-change: transform;
    overflow: hidden;

    &:hover {
      box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
    }

    & > div {
      will-change: transform;
      height: 100%;
      margin: 0vw 0;
    }

    & > div > * {
      height: 100%;
      background-size: cover;
      background-position: center center;
      margin: 0vw 0;
    }
  }

  .cardInner {
    div:nth-of-type(2) {
      margin-top: 5rem;
    }

    @media screen and (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      div:nth-of-type(2) {
        margin-top: 0;
      }
    }
  }
`;

const calcX = (y, ly) => -(y - ly - window.innerHeight / 2) / 100;
const calcY = (x, lx) => (x - lx - window.innerWidth / 2) / 100;

export default function Backdrop({ children }) {
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const domTarget = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  );

  useGesture(
    {
      onMove: ({ xy: [px, py], dragging }) =>
        !dragging &&
        api.start({
          rotateX: calcX(py, y.get()),
          rotateY: calcY(px, x.get()),
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api.start({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } }
  );

  return (
    <BackdropStyles>
      <animated.div
        ref={domTarget}
        className="card"
        style={{
          transform: 'perspective(600px)',
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <div className="cardInner">{children}</div>
      </animated.div>
    </BackdropStyles>
  );
}
