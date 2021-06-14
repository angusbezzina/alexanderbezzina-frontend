import React, { useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

const GalleryStyles = styled.div`
  position: relative !important;
  background: none;
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  user-select: none;
  background: var(--black);

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    will-change: transform, opacity;

    img {
      height: auto;
      width: 100%;
      object-fit: cover;
    }
  }

  .front,
  .back {
    background-size: cover;
    background-color: var(--white);
    color: var(--offBlack);
    border-radius: 0.5rem;
  }

  .navigation {
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .prev-button,
  .next-button {
    cursor: pointer;
    position: relative;
    color: var(--white);
    background: none;
    border: none;
    padding: 0 0 0.5rem;
    z-index: 0;

    &::after,
    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: "";
      width: 100%;
      height: 3px;
    }

    &::after {
      background-color: var(--aqua);
      z-index: 1;
    }

    &::before {
      background-color: var(--white);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s ease-in-out;
      z-index: 2;
    }

    &:hover {
      color: var(--aqua);
      transition: color 0.3s ease-in-out;

      &::before {
        transform: scaleX(1);
        transform-origin: bottom left;
        transition: transform 0.3s ease-in-out;
      }
    }
  }

  @media (min-width: 1200px) {
    padding-top: 0;
    height: 70vh;

    .navigation {
      position: absolute;
      bottom: -4rem;
      left: 0;
    }
  }
`;

export default function Gallery({ galleryImages, currentIndex = 0 }) {
  const [gallery, setGallery] = useState({
    flipped: false,
    order: currentIndex,
    next: currentIndex + 1,
  });

  const { transform, opacity } = useSpring({
    opacity: gallery.flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${gallery.flipped ? 180 : 360}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function incrementGalleryState() {
    setGallery({
      flipped: !gallery.flipped,
      order: gallery.order < galleryImages.length - 1 ? gallery.order + 1 : 0,
      next: gallery.next < galleryImages.length - 1 ? gallery.next + 1 : 0,
    });
  }

  function decrementGalleryState() {
    setGallery({
      flipped: !gallery.flipped,
      order: gallery.order > 0 ? gallery.order - 1 : galleryImages.length - 1,
      next: gallery.next > 0 ? gallery.next - 1 : galleryImages.length - 1,
    });
  }

  return (
    <GalleryStyles>
      <animated.div
        className="card back"
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <Image
          src={
            galleryImages[
              `${gallery.order % 2 === 0 ? gallery.next : gallery.order}`
            ].css
          }
          alt={`GalleryPhoto${gallery.next}`}
          layout="fill"
        />
      </animated.div>
      <animated.div
        className="card front"
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
        }}
      >
        <Image
          src={
            galleryImages[
              `${gallery.order % 2 !== 0 ? gallery.next : gallery.order}`
            ].css
          }
          alt={`GalleryPhoto${gallery.order}`}
          layout="fill"
        />
      </animated.div>
      <div className="navigation">
        <button
          type="button"
          onClick={decrementGalleryState}
          className="prev-button"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={incrementGalleryState}
          className="next-button"
        >
          Next
        </button>
      </div>
    </GalleryStyles>
  );
}
