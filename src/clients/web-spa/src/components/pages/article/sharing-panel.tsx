import * as React from 'react';
import { Linkedin, Facebook, Twitter, Mail } from 'react-social-sharing';

interface SharingPanelProps{
    link: string;
}

export const SharingPanel : React.FC<SharingPanelProps> = ({link}) => {
    const buttonProps = {
        solidcircle: true,
        medium: true,
        link: link,
        style: {
            padding: "0.3em 0.4em",
            fontSize: "14px",
        }
    };
    return (<div style={{fontSize: 14, marginBottom: 20}}>
        <Linkedin {...buttonProps} />
        <Facebook {...buttonProps} />
        <Twitter {...buttonProps} />
        <Mail {...buttonProps} />
    </div>)
}