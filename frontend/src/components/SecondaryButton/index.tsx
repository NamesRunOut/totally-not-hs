import React from 'react';
import {ButtonOutline, ButtonBg, ButtonName} from "./styles";

const SecondaryButton: React.FC <{onClick: any, text: any}> = ({onClick, text}) => {
    return (<ButtonBg onClick={onClick}><ButtonOutline /><ButtonName>{text}</ButtonName></ButtonBg>);
}

export default SecondaryButton;
