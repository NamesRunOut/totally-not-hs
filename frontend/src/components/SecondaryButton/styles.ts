import styled from "styled-components";

export const ButtonOutline = styled.div`
  border: 1px solid ${props => props.theme.colors.font_dark};
  position: absolute;
  z-index: 2;
  top: -0.75rem;
  left: 0.5rem;
  width: 6rem;
  height: 2.5rem;
  background-color: transparent;
`

export const ButtonBg = styled.button`
  background: ${props => props.theme.colors.blu};
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  width: max-content;
  height: 2rem;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  border-radius: 0.1rem;
  transform: rotate(-2deg);

  :hover {
    background: ${props => props.theme.colors.blu_dark};
  }

  :after {
    --slice-0: inset(50% 50% 50% 50%);
    --slice-1: inset(80% -6px 0 0);
    --slice-2: inset(50% -6px 30% 0);
    --slice-3: inset(10% -6px 85% 0);
    --slice-4: inset(40% -6px 43% 0);
    --slice-5: inset(80% -6px 5% 0);

    content: 'Press me';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 3%, #f60008 3%, #a95e29 5%, #01f7ff 5%);
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

export const ButtonName = styled.div`
  position: relative;
  width: max-content;
  font-size: 1rem;
  top: 0;
  left: 0;
  color: ${props => props.theme.colors.font_dark};
  z-index: 2;
`