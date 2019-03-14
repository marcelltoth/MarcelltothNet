import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PageHeaderWide } from '../common/page-header-wide';
import { Container, Row, Col } from 'reactstrap';
import { SectionTitle, ArticlePreviewPanel, Sidebar } from '../common';

interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

type ArticlePageProps = OwnProps;

export class TagPage extends React.Component<ArticlePageProps>{

    render(){
        return <>
            <PageHeaderWide title="Tag title"  />
            <Container>
                <Row>
                    <Col md={8}>
                        <SectionTitle title="Recent posts" />
                        <ArticlePreviewPanel 
                            articleId={4}
                            thumbnailImage="https://via.placeholder.com/1200x800"
                            thumbnailAltText="Placeholder Image"
                            title="Some random article which has a really really long title that even wraps to the third line"
                            author="Marcell Toth"
                            publishDate={new Date()}
                            tags={[{title: "csharp", id: 3}, {title: "performance-optimization", id: 4}]}
                            />
                        
                        <ArticlePreviewPanel 
                            articleId={5}
                            thumbnailImage="https://via.placeholder.com/1200x800"
                            thumbnailAltText="Placeholder Image"
                            title="Some random article which is the third preview"
                            author="Marcell Toth"
                            publishDate={new Date()}
                            tags={[{title: "csharp", id: 3}]}
                            />
                        
                        <ArticlePreviewPanel 
                            articleId={6}
                            thumbnailImage="https://via.placeholder.com/1200x800"
                            thumbnailAltText="Placeholder Image"
                            title="Some random article which is the third preview"
                            author="Marcell Toth"
                            publishDate={new Date()}
                            tags={[{title: "csharp", id: 3}]}
                            />
                    </Col>
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </>
    }

}