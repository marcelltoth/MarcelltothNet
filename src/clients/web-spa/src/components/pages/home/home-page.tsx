import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HighlightedArticlePanel, HighlightedArticleThumbnail } from './highlighted-articles';
import { SectionTitle } from '../../common';
import { ArticlePreviewPanel } from './article-preview';
import { GithubFlair, StackoverflowFlair, LinkedInFlair } from './flairs';
import styles from './home.module.scss';

export const HomePage : React.FC = () => {
    return (<>
        <section>
            <Container>
                <HighlightedArticlePanel>
                    <HighlightedArticleThumbnail 
                        articleId={1}
                        thumbnailImage="https://via.placeholder.com/1200x800"
                        thumbnailAltText="Placeholder Image"
                        title="Some random article which is the first preview"
                        author="Marcell Toth"
                        publishDate={new Date()}
                        tags={[{title: "csharp", id: 3}]}
                        />
                    <HighlightedArticleThumbnail 
                        articleId={2}
                        thumbnailImage="https://via.placeholder.com/1200x800"
                        thumbnailAltText="Placeholder Image"
                        title="Some random article which is the second preview"
                        author="Marcell Toth"
                        publishDate={new Date()}
                        tags={[{title: "csharp", id: 3}]}
                        />
                    <HighlightedArticleThumbnail 
                        articleId={3}
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
                    <Col lg={8}>
                        <SectionTitle title="Older posts" />
                        
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
                    <Col lg={4}>
                        <SectionTitle title="Platforms" />
                        <div className={styles['flair-holder']}>
                            <GithubFlair />
                            <StackoverflowFlair />
                            <LinkedInFlair />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>);
}