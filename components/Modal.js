import React, { useRef, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

const Context = React.createContext();

const fadeIn = keyframes`from { opacity: 0; }`;

const Container = styled.div`
  position: relative;
  z-index: 100;
`;

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--black);
  z-index: 101;
`;

const Dialog = styled.div`
  position: relative;
  width: 90%;
  height: auto;
  padding-top: 4rem;
  margin: 0 auto;
  border-radius: 5px;

  .closeButton {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    border: none;
    background: none;
    line-height: 1;
    font-size: 3rem;
    color: var(--white);
    z-index: 1;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--aqua);
      transition: color 0.3s ease-in-out;
    }
  }

  @media (min-width: 768px) {
    width: 80%;
    padding-top: 5rem;

    .closeButton {
      font-size: 4rem;
    }
  }
`;

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <Container>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </Container>
  );
}

export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(Context);

  return modalNode
    ? ReactDOM.createPortal(
        <Overlay>
          <Dialog {...props}>
            <button type="button" className="closeButton" onClick={onClose}>
              &times;
            </button>
            {children}
          </Dialog>
        </Overlay>,
        modalNode
      )
    : null;
}
