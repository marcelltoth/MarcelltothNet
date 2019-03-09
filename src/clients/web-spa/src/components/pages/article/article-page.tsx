import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container } from 'reactstrap';
import { Header } from './header';

interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

type ArticlePageProps = OwnProps;

export class ArticlePage extends React.PureComponent<ArticlePageProps>{

    render(){
        return (
            <>
                <Header 
                    thumbnailImage="https://via.placeholder.com/1200x800"
                    thumbnailAltText="Placeholder Image"
                    title="Some random article which is the first preview"
                    author="Marcell Toth"
                    publishDate={new Date()}
                    tags={[{title: "csharp", id: 3}]}
                />
            </>
        )
    }

}