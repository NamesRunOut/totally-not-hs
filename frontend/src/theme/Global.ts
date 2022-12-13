import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'bahnschrift', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 100vw;
    
    background-color: #282c34;
    color: white;
  }
  
  a {
    //color: #61dafb;
  }
`

export default GlobalStyle
