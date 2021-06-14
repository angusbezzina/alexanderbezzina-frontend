import styled from "styled-components";

const TitleStyles = styled.h3`
  display: inline-block;
  padding: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: 0;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  background: ${(props) =>
    props.background ? `var(--${props.background});` : "var(--green)"};
  color: ${(props) =>
    props.color ? `var(--${props.color});` : "var(--white)"};
  font-size: ${(props) =>
    props.size === "large"
      ? "2.2rem"
      : props.size === "small"
      ? "1.2rem"
      : "1.8rem"};

  a {
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) =>
      props.color ? `var(--${props.color});` : "var(--white)"};
    font-size: 2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default TitleStyles;
