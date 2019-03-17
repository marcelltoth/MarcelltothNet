import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HighlightedArticlePanel, HighlightedArticleThumbnail } from './highlighted-articles';
import { SectionTitle, ArticlePreviewPanel, Sidebar } from '../common';
import { ApplicationState } from '../../../store/state';
import { selectArticlesOrderedByAgeDesc, ArticleDataDeep } from '../../../store/selectors';
import { take, slice } from 'lodash-es';
import { connect } from 'react-redux';

interface StateProps{
    articles: ReadonlyArray<ArticleDataDeep>;
}

type HomePageImplProps = StateProps;

const fallbackThumbnailLocation = "https://via.placeholder.com/1200x800";
const HomePageImpl : React.FC<HomePageImplProps> = ({articles}) => {

    const highlightedArticles = take(articles, 3);
    const olderArticles = slice(articles, 3, 5);

    return (<>
        <section>
            <Container>
                <HighlightedArticlePanel>
                    {highlightedArticles.map(a => (
                        <HighlightedArticleThumbnail 
                            key={a.id}
                            articleId={a.id}
                            thumbnailImage={a.thumbnailLocaion || fallbackThumbnailLocation}
                            thumbnailAltText={a.thumbnailAltText}
                            title={a.title}
                            author="Marcell Toth"
                            publishDate={a.publishDate}
                            tags={a.tags}
                        />
                    ))}
                </HighlightedArticlePanel>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg={8}>
                        <SectionTitle title="Older posts" />
                        {olderArticles.map(a => (
                            <ArticlePreviewPanel 
                                key={a.id}
                                articleId={a.id}
                                thumbnailImage={a.thumbnailLocaion || fallbackThumbnailLocation}
                                thumbnailAltText={a.thumbnailAltText}
                                title={a.title}
                                author="Marcell Toth"
                                publishDate={a.publishDate}
                                tags={a.tags}
                            />
                        ))}
                    </Col>
                    <Col lg={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </section>
    </>);
}

const mapStateToProps = (state: ApplicationState) : StateProps => {
    return {
        articles: selectArticlesOrderedByAgeDesc(state)
    };
}

export const HomePage = connect(mapStateToProps)(HomePageImpl);