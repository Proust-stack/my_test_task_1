import { createGlobalStyle } from 'styled-components';

import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import RalewayItalic from "../assets/fonts/Raleway-Italic-VariableFont_wght.ttf";
import CondensedLight from "../assets/fonts/condensed/RobotoCondensed-Light.ttf";
import CondensedRegular from "../assets/fonts/condensed/RobotoCondensed-Regular.ttf";
import CondensedBold from "../assets/fonts/condensed/RobotoCondensed-Bold.ttf";

export default createGlobalStyle`

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${Raleway}) format('ttf'),
       url(${RalewayItalic}) format('ttf'),
       url(${CondensedLight}) format('ttf'),
       url(${CondensedRegular}) format('ttf'),
       url(${CondensedBold}) format('ttf');
}

  html,
    body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', 'Roboto Condensed', sans-serif;
  color: #1D1F22;
  ::-webkit-scrollbar {
  width: 0;
}
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;
