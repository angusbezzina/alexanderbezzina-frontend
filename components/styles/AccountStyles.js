import styled from 'styled-components';

export const AccountStyles = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AccountInnerStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: var(--headerOffset) 0 0;

  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &::before {
      width: 100%;
    }

    label {
      width: 100%;
    }

    button {
      display: inline-block;
    }
  }
`;
