import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Header } from './header';
import { Sidebar, ContentRenderer, generateArticleUrl } from '../common';
import { SharingPanel } from './sharing-panel';
import { ArticleDataDeep, selectArticle } from '../../../store/selectors';
import { ApplicationState } from '../../../store/state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchArticleDetails } from '../../../store/actions/articles';
import { CommentBox } from './comment-box';


const fallbackThumbnailLocation = "https://via.placeholder.com/1200x800";
const fallbackContent = "*Loading the article...*";


interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

interface StateProps {
    article: ArticleDataDeep | undefined;
}

interface DispatchProps{
    loadArticle: () => void;
}

type ArticlePageProps = OwnProps & StateProps & DispatchProps;

const ArticlePageImpl : React.FC<ArticlePageProps> = ({article, loadArticle}) => {

        React.useEffect(() => {
            if(article === undefined || article.content === undefined && !article.isLoading){
                loadArticle();
            }
        }, [article && article.id]);

        if(article === undefined){
            // article not found with this ID, redirect to the home page
            return <Redirect to="/" />
        }

        

        const {id, title, thumbnailAltText, thumbnailLocation, publishDate, tags, content} = article;
        
        // redirect to the canonical url if we are not there
        const canonicalUrl = generateArticleUrl(id, title);
        if(location.pathname !== canonicalUrl){
            return <Redirect to={canonicalUrl}/>;
        }


        return (
            <>
                <Header 
                    thumbnailImage={thumbnailLocation || fallbackThumbnailLocation}
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
                            <CommentBox />
                        </Col>
                        <Col md={4}>
                            <Sidebar />
                        </Col>
                    </Row>
                </Container>
            </>
        )
}

const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) : StateProps => {
    return {
        article: selectArticle(state, Number(ownProps.match.params.id))
    }
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) : DispatchProps => {
    const articleId = Number(ownProps.match.params.id);
    return {
        loadArticle: () => dispatch(fetchArticleDetails(articleId))
    };
}

export const ArticlePage = connect(mapStateToProps, mapDispatchToProps)(ArticlePageImpl);