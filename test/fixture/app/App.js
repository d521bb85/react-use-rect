import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { useRect } from '../../..';
import { Controls } from './Controls';
import { Subject } from './Subject';
import { Aim } from './Aim';

export function App() {
  const [options, setOptions] = useState({
    scroll: true,
    transitionEnd: true,
    shifted: false
  });

  const [rectElementRef, rect] = useRect({
    scroll: options.scroll,
    transitionEnd: options.transitionEnd
  });

  return (
    <Container>
      <RootStyle />

      <Controls rect={rect} value={options} onChange={setOptions} />

      <Subject ref={rectElementRef} shifted={options.shifted} />
      <Aim
        top={rect.top}
        left={rect.left}
        width={rect.width}
        height={rect.height}
      />
    </Container>
  );
}

const RootStyle = createGlobalStyle`
  ${normalize}

  :root {
    --color-light: #f5f5f5;
    --color-dark: #212121;
    --color-accent: #009688;
    --color-minor: #757575;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font: 400 normal 14px/1.3 -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    color: var(--color-dar);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200vh;
  background-color: var(--color-light);
`;
