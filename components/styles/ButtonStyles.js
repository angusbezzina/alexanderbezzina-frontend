import styled from "styled-components";

const CloseButtonStyles = styled.button`
  cursor: pointer;
  background: none;
  color: var(--green);
  font-size: 3rem;
  padding: 0 2rem;
  border: 0;
  line-height: 1;
  position: absolute;
  z-index: 2;
  right: 0;
  transition: color 0.3s ease-in-out;

  span {
    display: inline-block;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
  }

  &:hover {
    color: var(--navy);
    transition: color 0.3s ease-in-out;

    span {
      transform: scale(1.3);
      transition: transform 0.3s ease-in-out;
    }
  }
`;

const IncognitoButtonStyles = styled.a`
  ${(props) => props.display && `display: ${props.display};`};
  margin: 1rem 0;
`;

const ScrollButtonStyles = styled.button`
  display: inline-block;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: ${(props) =>
    props.background ? `var(--${props.background});` : "var(--green)"};
  color: var(--offWhite);

  &:hover {
    background: var(--navy);
  }
`;

const SickButtonStyles = styled.button`
  background: var(--green);
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

const FeatureButtonStyles = styled.div`
  button {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    margin: 1rem 0;
    padding: 1rem 2rem;
    outline: none;
    text-align: center;
    font-size: 2rem;
    transform: skew(-5deg) rotate(-1deg);
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    background: ${(props) =>
      props.background ? `var(--${props.background});` : "var(--green)"};
    color: ${(props) =>
      props.color ? `var(--${props.color});` : "var(--white)"};
    border: none;

    &:hover {
      background: ${(props) =>
        props.background === "green" || !props.background
          ? "var(--aqua)"
          : "var(--navy)"};
    }

    @media (min-width: 768px) {
      margin: 2rem 0;
    }
  }
`;

export { CloseButtonStyles, IncognitoButtonStyles, ScrollButtonStyles, SickButtonStyles, FeatureButtonStyles };
