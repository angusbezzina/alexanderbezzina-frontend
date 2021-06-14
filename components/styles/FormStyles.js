import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const FormStyles = styled.form`
  width: 100%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin: 1rem 0 2rem;
  }
  input {
    margin-top: 0.5rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.6rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: var(--green);
    }
  }
  button,
  input[type="submit"] {
    cursor: pointer;
    width: auto;
    background: var(--green);
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;

    &:hover {
      background-color: var(--navy);
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        var(--green) 0%,
        var(--aqua) 50%,
        var(--green) 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default FormStyles;
