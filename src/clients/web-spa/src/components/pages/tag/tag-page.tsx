import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { PageHeaderWide } from '../common/page-header-wide';
import { Container, Row, Col } from 'reactstrap';
import { SectionTitle, ArticlePreviewPanel, Sidebar } from '../common';
import { ArticleDataDeep, selectArticlesByTag, selectTagById } from '../../../store/selectors';
import { ApplicationState } from '../../../store/state';
import { connect } from 'react-redux';

const fallbackThumbnailLocation = "https://via.placeholder.com/1200x800";

interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

type StateProps = {
    notFound?: false;
    displayName: string;
    articles: ReadonlyArray<ArticleDataDeep>;
} | { notFound: true; }

type TagPageProps = OwnProps & StateProps;

class TagPageImpl extends React.Component<TagPageProps>{

    render(){
        if(this.props.notFound){
            return <Redirect to="/" />
        }

        const {displayName, articles} = this.props;

        return <>
            <PageHeaderWide title={displayName}  />
            <Container>
                <Row>
                    <Col md={8}>
                        <SectionTitle title="Recent posts" />
                        {articles.map(a => <ArticlePreviewPanel 
                                key={a.id}
                                articleId={a.id}
                                thumbnailImage={a.thumbnailLocation || fallbackThumbnailLocation}
                                thumbnailAltText={a.thumbnailAltText}
                                title={a.title}
                                author="Marcell Toth"
                                publishDate={a.publishDate}
                                tags={a.tags}
                            />)}
                    </Col>
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </>
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) : StateProps => {
    const tags = selectTagById(state);
    const tagInfo = tags[Number(ownProps.match.params.id)];
    if(tagInfo === undefined){
        return {
            notFound: true,
        };
    }
    return {
        displayName: tagInfo.displayName,
        articles: selectArticlesByTag(state)[Number(ownProps.match.params.id)]
    };
}

export const TagPage = connect<StateProps, {}, OwnProps, ApplicationState>(mapStateToProps)(TagPageImpl as any);