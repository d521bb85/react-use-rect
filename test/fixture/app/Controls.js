import React from 'react';
import styled from 'styled-components';
import { Toggle } from './Toggle';

export function Controls({ rect, value, onChange }) {
  const bindOption = (propertyKey) => {
    return {
      value: value[propertyKey],
      onChange: (nextPropertyValue) => {
        onChange({ ...value, [propertyKey]: nextPropertyValue });
      }
    };
  };

  return (
    <Container>
      <Heading>Options</Heading>

      <Options>
        <Toggle {...bindOption('scroll')} label="Update on Scroll" />

        <Toggle
          {...bindOption('transitionEnd')}
          label="Update on Transition End"
        />

        <Toggle
          {...bindOption('shifted')}
          label="Shifted"
          caption="It's not a hook option. Just a control to test updates on Transition End."
          withExtraMargin
        />
      </Options>

      <Heading>Rect Output</Heading>
      <RectOutput>{JSON.stringify(rect, undefined, 2)}</RectOutput>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 20px;
  left: 30px;
  max-width: 240px;
`;

const Heading = styled.div`
  font-weight: 700;
  margin-bottom: 8px;
`;

const Options = styled.div`
  margin-bottom: 20px;
`;

const RectOutput = styled.pre``;
