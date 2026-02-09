import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ダークモード（デフォルト） */
  :root,
  :root[data-theme='dark'] {
    color-scheme: dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  }

  /* ライトモード */
  :root[data-theme='light'] {
    color-scheme: light;
    color: #213547;
    background-color: #ffffff;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  :root[data-theme='light'] a:hover {
    color: #747bff;
  }

  h1 {
    font-size: 2.5em;
    line-height: 1.1;
    font-weight: 600;
  }

  h2 {
    font-size: 2em;
    line-height: 1.2;
    font-weight: 600;
  }

  h3 {
    font-size: 1.5em;
    line-height: 1.3;
    font-weight: 600;
  }
`;
