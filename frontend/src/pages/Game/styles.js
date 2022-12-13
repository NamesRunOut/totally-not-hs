import styled from "styled-components";

export const TWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 1rem;
  min-width: 100%;
`

export const Wrapper = styled.div`
  height: 100%;
  padding: 2rem;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  
`

export const Player = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
`

export const Player1 = styled(Player)`

`

export const Player2 = styled(Player)`

`

export const Reset = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 1001;
  
  opacity: 0.8;
  border: none;
  color: red;
  background: transparent;
  border-radius: 0.5rem;
  
  :hover{
    color: green;
  }
`

export const Line = styled.div`
  background: #1d1e1f;
  height: 2px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  
  padding-right: 1rem;
  max-height: 44vh;
`

export const Avatar = styled.img`
  width: 6.9rem;
  height: 6.9rem;
`

export const Desc = styled.div`
  height: max-content;
  width: 100%;
`

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const Board1 = styled(Board)`
  flex-direction: column-reverse;
`

export const Board2 = styled(Board)`

`

export const Playarea = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`

export const Slot = styled.div`
  width: 20%;
  max-width: 10rem;
  height: 100%;

  padding: 0.5rem;
  border-radius: 1rem;
  background: #282c34;
  box-shadow: inset 20px 20px 60px #22252c,
    inset -20px -20px 60px #2e333c;
  border: 1px solid #61dafb;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Mana = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const Crystal = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 2px;
  border-radius: 100%;

  background: #61dafb;
`

export const Endturn = styled.button`
  border: none;
  background: #61dafb;
  padding: 0.5rem;
  font-size: 1.25rem;
  border-radius: 1rem;
  margin: auto;
  
  :disabled{
    background: #61dafb;
    color: black;
    opacity: 0.1;
  }
`

export const Config = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 1001;
`