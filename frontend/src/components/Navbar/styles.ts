import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  background: transparent;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem 0;
  margin-bottom: 0.5rem;
`

export const TestButton = styled.button`
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.blu_dark};
  
  :hover{
    cursor: pointer;
  }
`
