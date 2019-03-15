import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './header';
import { Sidebar, ContentRenderer } from '../common';
import { SharingPanel } from './sharing-panel';
import {testArticleContent} from './test-article';

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
                <Container>
                    <Row>
                        <Col md={8}>
                            <SharingPanel link={window.location.href} />
                            <article>
                                <ContentRenderer content={testArticleContent} />
                            </article>
                        </Col>
                        <Col md={4}>
                            <Sidebar />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}