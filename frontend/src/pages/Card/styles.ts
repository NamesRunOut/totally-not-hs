import styled from "styled-components";
import {motion} from "framer-motion";

export const Img = styled.img`
  width: 512px;
  height: 512px;
  background: ${props => props.theme.colors.card_bg};
  border-radius: 0.1rem;
  z-index: 1;
`

export const Index = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  font-size: 1rem;
`

export const BaseInfo = styled.div`
  display: flex;
  width: 512px;
  justify-content: space-between;
  align-items: flex-start;
`

export const Name = styled.div`
  font-size: 2.15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 2;
  color: ${props => props.theme.colors.font_dark};
`

export const Stats = styled.div`
  font-size: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 2;
  color: ${props => props.theme.colors.font_dark};
`

export const Word = styled.div`
  background: ${props => props.theme.colors.card_bg};
`

export const Mana = styled.div`
  background: ${props => props.theme.colors.card_mana};
  padding: 0.25rem;
`

export const Hp = styled.div`
  background: ${props => props.theme.colors.card_hp};
  padding: 0.25rem;
`

export const Atk = styled.div`
  background: ${props => props.theme.colors.card_atk};
  padding: 0.25rem;
`

export const Description = styled.div`
  font-size: 1.25rem;
  margin: 1rem auto;
  width: 512px;
`

export const PriceR = styled(motion.div)`
  background: ${props => props.theme.colors.price_r};
  padding: 0.25rem;
  
  :hover{
    cursor: pointer;
  }
`

export const PriceB = styled(motion.div)`
  background: ${props => props.theme.colors.price_b};
  padding: 0.25rem;
  
  :hover{
    cursor: pointer;
  }
`

export const Owned = styled.div`
  background: ${props => props.theme.colors.price_r};
  padding: 0.25rem;
  color: ${props => props.theme.colors.font_dark};
  font-size: 1.75rem;
`