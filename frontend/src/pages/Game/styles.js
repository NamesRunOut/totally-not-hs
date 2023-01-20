import styled from "styled-components";
import {motion} from "framer-motion";

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
  grid-template-columns: 10% 1fr;
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
  width: 100%;
`

export const Board1 = styled(Board)`

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
  border-radius: 2px;
  background: rgba(61, 39, 55, 0.2);
  
  box-shadow: inset 5px 5px 6px rgba(24, 16, 22, 0.8),
    inset -4px -4px 5px #59364f;//,
  //9px 9px 13px rgba(98, 62, 88, 0.2),
  //  -7px -7px 9px rgba(98, 62, 88, 0.5);

  //border: 1px solid #61dafb;

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
  border: 1px solid white;
  background: transparent;
  color: white;
  padding: 0.5rem;
  font-size: 1.25rem;
  margin: auto;
  cursor: pointer;

  :hover{
    background: white;
    color: black;
  }
  
  :disabled{
    opacity: 0.1;
  }
`

export const Config = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 1001;
`

export const WaitMessage = styled.h1`
  margin: 5rem auto;
  text-align: center;
  width: 100%;
`

export const RewardPic = styled(motion.img)`
  position: relative;
  border-radius: 0.5rem;
  height: 90vh;
  max-width: 90vw;
  width: max-content;
  z-index: 100;
`

export const RewardBG = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`