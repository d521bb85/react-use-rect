import React from 'react';
import { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';

export const Subject = forwardRef(function Subject({ shifted }, forwardedRef) {
  const [enlarged, setEnlarged] = useState(false);

  return (
    <Container
      ref={forwardedRef}
      $shifted={shifted}
      $enlarged={enlarged}
      onClick={() => setEnlarged(!enlarged)}
    />
  );
});

const Container = styled.div`
  --size: ${(props) => (props.$enlarged ? 250 : 150)}px;

  position: relative;
  top: calc(50vh - var(--size) / 2);
  width: var(--size);
  height: var(--size);
  background-color: var(--color-dark);
  cursor: pointer;
  transition: transform 0.3s ease;

  ${(props) =>
    props.$shifted &&
    css`
      transform: translateX(var(--size));
    `}
`;
