import { createGlobalStyle } from 'styled-components';

import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import RalewayItalic from "../assets/fonts/Raleway-Italic-VariableFont_wght.ttf";

export default createGlobalStyle`

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${Raleway}) format('ttf'),
       url(${RalewayItalic}) format('ttf');
}

  html,
    body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', 'RalewayItalic', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;
