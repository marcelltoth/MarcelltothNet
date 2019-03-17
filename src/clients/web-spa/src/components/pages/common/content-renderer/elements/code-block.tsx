import * as React from 'react';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';


interface CodeBlockProps{
    value: string;
    language: string | null;
}

export class CodeBlock extends React.PureComponent<CodeBlockProps>{

    render() {
        const {value, language} = this.props;
        const actualLanguage = (language && Prism.languages[language] !== undefined) ? language : "markup";

        const highlighted = Prism.highlight(value, Prism.languages[actualLanguage]);
        const className = `language-${actualLanguage}`;
        
        return <pre className={className}>
            <code className={className}
                dangerouslySetInnerHTML={{__html: highlighted}}>
            </code>
        </pre>;
    }

}