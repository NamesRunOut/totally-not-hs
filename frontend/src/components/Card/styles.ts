import styled from "styled-components";
import {motion} from "framer-motion";

export const Img = styled.img`
  width: 9rem;
  height: 9rem;
  background: ${props => props.theme.colors.card_bg};
  border-radius: 0.1rem;
  z-index: 1;
`

export const Index = styled(motion.div)`
  background: ${props => props.theme.colors.card_bg};
  color: ${props => props.theme.colors.font_dark};
  width: min-content;
  height: 14rem;
  
  border-radius: 1rem 1rem 0.1rem 0.1rem;
  padding: 0;

  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  font-size: 1rem;
  
  :hover{
    cursor: pointer;
  }
`

export const NotOwnedOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 4;
`

export const Name = styled.div`
  font-size: 1.1rem;
  width: 6rem;
  position: absolute;
  top: 5.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 2;
`

export const Word = styled.div`
  background: ${props => props.theme.colors.card_bg};
`

export const Mana = styled.div`
  position: absolute;
  top: -0.5rem;
  right: 0.5rem;
  background: ${props => props.theme.colors.card_mana};
  padding: 0.25rem;
  z-index: 2;
`

export const Hp = styled.div`
  background: ${props => props.theme.colors.card_hp};
  padding: 0.25rem;
  position: absolute;
  bottom: -0.5rem;
  right: 0.5rem;
  z-index: 2;
`

export const Atk = styled.div`
  background: ${props => props.theme.colors.card_atk};
  padding: 0.25rem;
  position: absolute;
  bottom: -0.5rem;
  left: 0.5rem;
  z-index: 2;
`

export const Description = styled.div`
  font-size: 0.8rem;
  margin: auto;
  width: 80%;
  z-index: 1;
`