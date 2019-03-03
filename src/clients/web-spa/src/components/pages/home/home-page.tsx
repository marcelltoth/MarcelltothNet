import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HighlightedArticlePanel, HighlightedArticleThumbnail } from './highlighted-articles';
import { SectionTitle } from '../../common';

export const HomePage : React.FC = () => {
    return (<>
        <section>
            <Container>
                <HighlightedArticlePanel>
                    <HighlightedArticleThumbnail 
                        articleId={0}
                        thumbnailImage="https://via.placeholder.com/1200x800"
                        thumbnailAltText="Placeholder Image"
                        title="Some random article which is the first preview"
                        author="Marcell Toth"
                        publishDate={new Date()}
                        tags={[{title: "csharp", id: 3}]}
                        />
                    <HighlightedArticleThumbnail 
                        articleId={0}
                        thumbnailImage="https://via.placeholder.com/1200x800"
                        thumbnailAltText="Placeholder Image"
                        title="Some random article which is the second preview"
                        author="Marcell Toth"
                        publishDate={new Date()}
                        tags={[{title: "csharp", id: 3}]}
                        />
                    <HighlightedArticleThumbnail 
                        articleId={0}
                        thumbnailImage="https://via.placeholder.com/1200x800"
                        thumbnailAltText="Placeholder Image"
                        title="Some random article which is the third preview"
                        author="Marcell Toth"
                        publishDate={new Date()}
                        tags={[{title: "csharp", id: 3}]}
                        />
                </HighlightedArticlePanel>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col md={8}>
                        <SectionTitle title="Older posts" />
                    </Col>
                </Row>
            </Container>
        </section>
    </>);
}