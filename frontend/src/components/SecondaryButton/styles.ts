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

  :hover{
    background: ${props => props.theme.colors.blu_dark};
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