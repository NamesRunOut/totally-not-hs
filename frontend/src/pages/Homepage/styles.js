import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  
  padding: 1rem;
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
  border: 0 solid  ${props => props.theme.colors.font_light};
  box-sizing: border-box;
  color:  ${props => props.theme.colors.font_dark};
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  justify-content: center;
  padding: 0.75rem 1rem;
  position: relative;
  text-align: center;
  text-decoration: none  ${props => props.theme.colors.font_dark} solid;
  text-decoration-thickness: auto;
  width: 6rem;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  
  :hover{
    background-color:  ${props => props.theme.colors.blu_dark};
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

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  border: none;
  min-width: 10rem;
`

export const Avatar = styled.img`
  width: 6.9rem;
  height: 100%;
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
  height: 100%;
`

export const Param = styled.div`
  font-size: 1.1rem;
  padding-top: 0.25rem;
`