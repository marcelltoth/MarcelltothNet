import * as React from 'react';
import { ArticleData } from '../../store/common/article';

interface ArticleEditorProps{
    article: ArticleData;
}

export class ArticleEditor extends React.Component<ArticleEditorProps>{
    render(){
        return this.props.article.title;
    }
}