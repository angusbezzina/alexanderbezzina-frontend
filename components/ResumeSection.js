import styled from 'styled-components';

const ResumeSectionStyles = styled.div`
  position: relative;
  padding: 5rem 0;
  text-align: left;
  background-color: ${(props) =>
    props.background ? `var(--${props.background})` : 'var(--black)'};
  color: ${(props) =>
    props.color ? `var(--${props.color})` : 'var(--offWhite)'};

  a {
    position: relative;
    color: ${(props) =>
      props.color ? `var(--${props.color})` : 'var(--offWhite)'};

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      display: inline-block;
      width: 100%;
      height: 3px;
      background-color: var(--aqua);
      transform: skew(-5deg) rotate(-1deg);
      opacity: 0;
    }

    &:hover {
      text-decoration: none;

      &::after {
        opacity: 1;
      }
    }
  }

  .resume-section-marker {
    position: absolute;
    top: -70px;
    left: 0;
    width: 100%;
    visibility: hidden;
  }

  .resume-section-inner {
    width: 100%;
    max-width: var(--maxWidth);
    padding: 0 2rem;
    margin: 0 auto;
  }
`;

export default function ResumeSection({ background, color, children, id }) {
  return (
    <ResumeSectionStyles background={background} color={color}>
      <div className="resume-section-marker" id={id} />
      <div className="resume-section-inner">{children}</div>
    </ResumeSectionStyles>
  );
}
