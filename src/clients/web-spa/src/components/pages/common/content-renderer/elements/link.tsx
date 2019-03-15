import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';

interface LinkProps{
    href: string;
}

export const Link : React.FC<LinkProps> = ({href, children}) => {
    if(!href)
        return <>{children}</>;

    return /^https?:\/\//.test(href)
        ? <a href={href}>{children}</a>
        : <RouterLink to={href}>{children}</RouterLink>;
}