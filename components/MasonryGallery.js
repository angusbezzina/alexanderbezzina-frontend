import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useMeasure from 'react-use-measure';
import { useTransition, a } from '@react-spring/web';
import shuffle from 'lodash.shuffle';

import Gallery from './Gallery';
import { Modal } from './Modal';

import useMedia from '../lib/useMedia';
import images from '../lib/galleryImages';

const GalleryOuterStyles = styled.div``;

const GalleryInnerStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 3rem;

  & > div {
    position: absolute;
    will-change: transform, width, height, opacity;
    padding: 5px;
  }

  & > div > button {
    position: static;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 10px;
    line-height: 10px;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
  }

  & > div > button > div {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    border: none;
  }

  @media screen and (min-width: 768px) {
    width: calc(100% + 30px);
    margin: 0 -15px;

    & > div {
      padding: 15px;
    }
  }
`;

export default function MasonryGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [5, 4, 3],
    2
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  // Hook3: Hold items
  const [items, set] = useState(images);
  // Hook4: shuffle data every 2 seconds
  useEffect(() => {
    const t = setInterval(() => set(shuffle), 5000);
    return () => clearInterval(t);
  }, []);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let gridItems = items.map((child, i) => {
      const column = heights.indexOf(Math.min(...heights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = (width / columns) * column; // x = container width / number of columns * column index,
      const y = (heights[column] += child.height / 2) - child.height / 2; // y = it's just the height of the current column
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: child.height / 2,
      };
    });
    return [heights, gridItems];
  }, [columns, items, width]);
  // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.css,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <GalleryOuterStyles>
      <GalleryInnerStyles ref={ref} style={{ height: Math.max(...heights) }}>
        {transitions((style, item) => (
          <a.div style={style}>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setActiveIndex(item.index);
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)`,
                }}
              />
            </button>
          </a.div>
        ))}
      </GalleryInnerStyles>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Gallery galleryImages={images} currentIndex={activeIndex} />
        </Modal>
      )}
    </GalleryOuterStyles>
  );
}
