import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './header';
import { Sidebar, ContentRenderer } from '../common';
import { SharingPanel } from './sharing-panel';
import { ArticleDataDeep, selectArticlesDeep } from '../../../store/selectors';
import { ApplicationState } from '../../../store/state';
import { connect } from 'react-redux';


const fallbackThumbnailLocation = "https://via.placeholder.com/1200x800";
const fallbackContent = "*Loading the article...*";


interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

interface StateProps {
    article: ArticleDataDeep | undefined;
}

type ArticlePageProps = OwnProps & StateProps;

class ArticlePageImpl extends React.PureComponent<ArticlePageProps>{

    render(){
        if(this.props.article === undefined){
            // article not found with this ID, redirect to the home page
            return <Redirect to="/" />
        }

        const {article: {title, thumbnailAltText, thumbnailLocaion, publishDate, tags, content}} = this.props;
        return (
            <>
                <Header 
                    thumbnailImage={thumbnailLocaion || fallbackThumbnailLocation}
                    thumbnailAltText={thumbnailAltText}
                    title={title}
                    author="Marcell Toth"
                    publishDate={publishDate}
                    tags={tags}
                />
                <Container>
                    <Row>
                        <Col md={8}>
                            <SharingPanel link={window.location.href} />
                            <article>
                                <ContentRenderer content={content || fallbackContent} />
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

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) : StateProps => {
    return {
        article: selectArticlesDeep(state).find(a => a.id === Number(ownProps.match.params.id))
    }
};

export const ArticlePage = connect(mapStateToProps)(ArticlePageImpl);