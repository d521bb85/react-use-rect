import React from 'react';
import styled, { css } from 'styled-components';

export function Toggle({ value, label, caption, withExtraMargin, onChange }) {
  const handleChange = ({ target }) => onChange(target.checked);

  return (
    <Container $withExtraMargin={withExtraMargin}>
      <Main>
        <Checkbox checked={value} onChange={handleChange} />
        <Label>{label}</Label>
      </Main>
      {caption && <Caption>{caption}</Caption>}
    </Container>
  );
}

const Container = styled.label`
  display: block;
  padding: 2px 0;

  ${(props) =>
    props.$withExtraMargin &&
    css`
      margin-top: 8px;
    `}
`;

const Main = styled.label`
  display: flex;
  align-items: center;
  padding: 2px 0;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: block;
`;

const Label = styled.div`
  display: block;
  margin-left: 8px;
`;

const Caption = styled.div`
  width: 100%;
  color: var(--color-minor);
`;
