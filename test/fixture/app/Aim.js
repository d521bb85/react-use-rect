import React from 'react';
import styled from 'styled-components';

export function Aim({ top, left, width, height }) {
  return (
    <Container style={{ top, left, width, height }}>
      <Frame />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  pointer-events: none;
`;

const Frame = styled.div`
  --offset: -15px;

  position: absolute;
  top: var(--offset);
  right: var(--offset);
  bottom: var(--offset);
  left: var(--offset);
  border: 2px dashed var(--color-accent);
`;
