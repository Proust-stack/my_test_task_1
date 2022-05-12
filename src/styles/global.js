import { createGlobalStyle } from 'styled-components';

import Raleway from "../assets/fonts/static/Raleway-Regular.ttf";
import RalewayLight from "../assets/fonts/static/Raleway-Light.ttf";
import RalewayMedium from "../assets/fonts/static/Raleway-Medium.ttf";
import CondensedLight from "../assets/fonts/condensed/RobotoCondensed-Light.ttf";
import CondensedRegular from "../assets/fonts/condensed/RobotoCondensed-Regular.ttf";
import CondensedBold from "../assets/fonts/condensed/RobotoCondensed-Bold.ttf";
import SourceSansProRegular from "../assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf";

export default createGlobalStyle`

@font-face {
    font-family: "Raleway";
    src: url(${Raleway}) format('truetype');
    font-style: normal;
    font-weight: 400;
}
@font-face {
    font-family: "Raleway";
    src: url(${RalewayLight}) format('truetype');
    font-style: normal;
    font-weight: 300;
}
@font-face {
    font-family: "Raleway";
    src: url(${RalewayMedium}) format('truetype');
    font-style: normal;
    font-weight: 600;
}

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${CondensedRegular}) format('truetype');
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${CondensedLight}) format('truetype');
  font-style: normal;
  font-weight: 300;
}

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${CondensedBold}) format('truetype');
  font-style: normal;
  font-weight: 700;
}
@font-face {
  font-family: 'Source Sans Pro';
  src: url(${SourceSansProRegular}) format('truetype');
  font-style: normal;
  font-weight: 400;
}


  html,
    body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
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
