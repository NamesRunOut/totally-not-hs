import {createGlobalStyle} from 'styled-components'
import {theme} from './Theme'

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
    
    background-color: ${theme.colors.bg};
    color: ${theme.colors.font_light};
    width: 100%;
    height: 100%;
  }
  
  #root{
    width: 100%;
    height: 100%;
  }
`

export default GlobalStyle
