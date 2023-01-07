import React from 'react';
import {ButtonBg, ButtonName} from "./styles";

const NavButton: React.FC <{onClick: any, text: any}> = ({onClick, text}) => {
    return (<ButtonBg onClick={onClick}><ButtonName>{text}</ButtonName></ButtonBg>);
}

export default NavButton;
