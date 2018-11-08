import * as React from 'react';

interface SocialLinkProps{
    url: string;
}

/**
 * Renders a link pointing to an external site.
 * 
 * Right now this is a naive implementation, but it is planned to implement event logging in the future.
 */
export class ExternalLink extends React.PureComponent<SocialLinkProps>{
    render(){
        const {url, children} = this.props;
        return <a href={url} target="_blank">
            {children}
        </a>;
    }
}