import React, {useEffect} from 'react';
import styled from "styled-components";
// @ts-ignore
import {AnimatePresence, motion} from 'framer-motion';

const ClassShow = styled.div`
  width: 20rem;

  background-color: white;
  color: #282c34;

  border-radius: 0 0 1rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.25rem;
`

const ClassPicker = styled.div`
  width: 20rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 1rem;
  background-color: white;
  color: #282c34;
  border-radius: 1rem 1rem 0 0;
`

const Class = styled.div`
  background: ${props =>
          //@ts-ignore
          props.selected ? '#61dafb' : '#646473'};
  border-radius: 1rem;
  padding: 0.5rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  margin: 2rem;
`

const Classes: React.FC<{ tabs: any, setTabs: any, selectedTab: any, setSelectedTab: any }> = ({
                                                                                                   tabs,
                                                                                                   selectedTab,
                                                                                                   setTabs,
                                                                                                   setSelectedTab
                                                                                               }) => {

    // useEffect(() => {
    //     socket.emit('getClasses')
    //     socket.on('classesList', (classes: any) => setTabs(classes));
    //
    //     return () => {
    //         socket.off('classesList')
    //     };
    // }, [socket]);

    return (
        <Wrapper>
            <ClassPicker>
                {tabs.map((item: any) => (
                    <Class
                        //@ts-ignore
                        selected={selectedTab.id === item.id}
                        key={item.label}
                        onClick={() => setSelectedTab(item)}>
                        {`${item.label}`}
                    </Class>))}
            </ClassPicker>
            <ClassShow>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        animate={{opacity: 1, y: 0}}
                        initial={{opacity: 0, y: 20}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.15}}
                    >
                        {selectedTab ? selectedTab.desc : "😋"}
                    </motion.div>
                </AnimatePresence>
            </ClassShow>
        </Wrapper>
    );
}

export default Classes;
