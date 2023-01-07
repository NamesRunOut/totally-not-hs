import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  
  padding: 1rem;

  perspective: 500px;
  position: relative;
`

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-size: cover;
  background-blend-mode: soft-light;
  background-color: ${props => props.theme.colors.bg};
  background-attachment: fixed;
`

export const Play = styled.button`
  margin: 0.5rem;
  background-color: ${props => props.theme.colors.blu};
  border: 0 solid ${props => props.theme.colors.font_light};
  box-sizing: border-box;
  color: ${props => props.theme.colors.font_dark};
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  justify-content: center;
  padding: 0.75rem 1rem;
  position: relative;
  text-align: center;
  text-decoration: none ${props => props.theme.colors.font_dark} solid;
  text-decoration-thickness: auto;
  width: 6rem;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  :hover {
    background-color: ${props => props.theme.colors.blu_dark};
  }

  :after {
    content: '';
    position: absolute;
    border: 1px solid ${props => props.theme.colors.font_dark};
    bottom: 6px;
    left: 6px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }
`

export const PlayGlitch = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  
  :after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);

    content: 'Play';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #29a92b 5%, #0178ff 5%);
    text-shadow: -3px -3px 0px #e32384, 3px 3px 0px #00E6F6;
    clip-path: var(--slice-0);
  }

  :hover::after {
    animation: 1s glitch;
    animation-timing-function: steps(2, end);
  }

  @keyframes glitch {
    0% {
      clip-path: var(--slice-1);
      transform: translate(-20px, -10px);
    }
    10% {
      clip-path: var(--slice-3);
      transform: translate(10px, 10px);
    }
    20% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 10px);
    }
    30% {
      clip-path: var(--slice-3);
      transform: translate(0px, 5px);
    }
    40% {
      clip-path: var(--slice-2);
      transform: translate(-5px, 0px);
    }
    50% {
      clip-path: var(--slice-3);
      transform: translate(5px, 0px);
    }
    60% {
      clip-path: var(--slice-4);
      transform: translate(5px, 10px);
    }
    70% {
      clip-path: var(--slice-2);
      transform: translate(-10px, 10px);
    }
    80% {
      clip-path: var(--slice-5);
      transform: translate(20px, -10px);
    }
    90% {
      clip-path: var(--slice-1);
      transform: translate(-10px, 0px);
    }
    100% {
      clip-path: var(--slice-1);
      transform: translate(0);
    }
  }
`

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  border: none;
  min-width: 10rem;
`

export const Avatar = styled.img`
  width: 7.9rem;
  height: max-content;
  background: ${props => props.theme.colors.bg};
  border-radius: 2px;
  padding: 0.5rem;
`

export const PlayerProfile = styled.div`
  width: min-content;
  height: min-content;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
  border-radius: 2px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
  margin: 1rem;
  
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  
  :before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px ${props => props.theme.colors.red_pane};
    filter: blur(10px);
    margin: -20px;
  }
`

export const PlayerInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: 0.25rem;
  grid-column-gap: 0.5rem;
  height: 100%;
`

export const Param = styled.div`
  font-size: 1.1rem;
  padding-top: 0.25rem;
`