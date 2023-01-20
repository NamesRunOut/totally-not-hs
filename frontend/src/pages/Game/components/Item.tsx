//@ts-nocheck
import React, {useContext} from "react";
import styled from "styled-components"
import { CardRegistryContext } from "../../../patterns/CardRegistry";
import Card from "../../../components/Card";

const Wrapper = styled.div`
  padding: 0.5rem;
  border: 1px solid white;
`

const Item = ({ id, dragOverlay }) => {
  const [, getCard, registry] = useContext(CardRegistryContext)
  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <Card card={getCard(id)} />
  );
};

export default Item;
