import styled from 'styled-components';

const SubtitleStyles = styled.h5`
  position: relative;
  display: inline-block;
  margin: 1rem 0;
  text-align: center;
  font-size: 1.5rem;
  transform: skew(-5deg) rotate(-1deg);

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    background: var(--aqua);
    width: 100%;
    height: 3px;
    transform: skew(-5deg) rotate(-1deg);
  }
`;

export default SubtitleStyles;
