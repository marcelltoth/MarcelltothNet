import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import {elementMap} from './elements';

interface ContentRendererProps{
    content: string;
}


export const ContentRenderer : React.FC<ContentRendererProps> = React.memo(({content}) => {
    return <ReactMarkdown source={content} renderers={elementMap} />;
});