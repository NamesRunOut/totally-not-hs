//@ts-nocheck
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import styled from "styled-components"
import SortableItem from "./SortableItem";
import Item from './Item'

const Wrapper = styled.div`
  padding: 0.5rem;
  border: 1px solid white;
  display: flex;
  flex-direction: row;
  width: 20vw;
  min-width: 10rem;
  min-height: 15rem;
  overflow: hidden;
  gap: 0.5rem;
`

const Droppable = ({ id, items, isMe }) => {
  const { setNodeRef } = useDroppable({ id });
  let notHand = id !== 'hand'

  let style = {
    pointerEvents: notHand ? 'none' : 'auto',
    maxWidth: notHand ? '20vw' : '90vw',
    display: !isMe && !notHand ? 'none' : 'flex',
    width: notHand ? "20vw" : "100%"
  }

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div>
        {notHand ? id : isMe ? id : ""}
        <Wrapper ref={setNodeRef} style={style}>
          {items.map((item) => (
            <SortableItem key={item} id={item} />
          ))}
        </Wrapper>
      </div>
    </SortableContext>
  );
};

export default Droppable