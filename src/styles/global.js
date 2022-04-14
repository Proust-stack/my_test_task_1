import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  html,
    body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
`;
