import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HighlightedArticlePanel, HighlightedArticleThumbnail } from './highlighted-articles';
import { SectionTitle, ArticlePreviewPanel, Sidebar } from '../common';
import { ApplicationState } from '../../../store/state';
import { selectArticlesOrderedByAgeDesc, ArticleDataDeep } from '../../../store/selectors';
import { take, slice } from 'lodash-es';
import { connect } from 'react-redux';
import { fetchThumbnails } from '../../../store/actions/basic-data';
import memoize, { MemoizeStateOptions } from 'memoize-state';

interface StateProps{
    articles: ReadonlyArray<ArticleDataDeep>;
}

interface DispatchProps {
    fetchThumbnails: (ids: number[], width: number) => void;
}

type HomePageImplProps = StateProps & DispatchProps;


const fallbackThumbnailLocation = "https://via.placeholder.com/1200x800";

const HomePageImpl : React.FC<HomePageImplProps> = ({articles, fetchThumbnails}) => {

    const highlightedArticles = take(articles, 3);
    const olderArticles = slice(articles, 3, 8);

    const highlightedIds = highlightedArticles.map(a => a.id);
    React.useEffect(() => {
        fetchThumbnails(highlightedIds, 600);
    }, [highlightedIds.join('-')])
    
    const olderIds = olderArticles.map(a => a.id);
    React.useEffect(() => {
        fetchThumbnails(olderIds, 300);
    }, [olderIds.join('-')])

    return (<>
        <section>
            <Container>
                <HighlightedArticlePanel>
                    {highlightedArticles.map(a => (
                        <HighlightedArticleThumbnail 
                            key={a.id}
                            articleId={a.id}
                            thumbnailImage={a.thumbnailLocation || fallbackThumbnailLocation}
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
                                thumbnailImage={a.thumbnailLocation || fallbackThumbnailLocation}
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

const mapStateToProps = memoize((state: ApplicationState) : StateProps => {
    return {
        articles: selectArticlesOrderedByAgeDesc(state)
    };
}, {safe: true} as MemoizeStateOptions);

const mapDispatchToProps = {
    fetchThumbnails
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageImpl);