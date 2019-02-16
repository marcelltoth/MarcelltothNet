import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ArticleData } from '../../store/common/article';
import { ApplicationState } from '../../store/reducers';
import { connect } from 'react-redux';
import { actionCreators as ArticleActions } from '../../store/actions/article';
import { ArticleEditor } from './article-editor';


interface MatchParams{
    id: string;
}

interface OwnProps extends RouteComponentProps<MatchParams>{
}

interface StateProps{
    isLoading: boolean;
    article?: ArticleData;
}

type DispatchProps = {loadArticles: typeof ArticleActions.loadArticles};

type ArticleEditPageImplProps = OwnProps & StateProps & DispatchProps;

class ArticleEditPageImpl extends React.Component<ArticleEditPageImplProps>{

    public componentDidMount(){
        const {article,loadArticles} = this.props;
        if(article === undefined){
            loadArticles();
        }
    }

    render(){
        const {article, isLoading} = this.props;
        if(isLoading){
            return "Loading";
        }
        if(article === undefined){
            return "Not found";
        }
        return <ArticleEditor article={article} />;
    }
}


const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) : StateProps => {
    return {
        isLoading: state.article.isRefreshing,
        article: state.article.articleList.find(a => a.id.toString() === ownProps.match.params.id)
    }
};


export const ArticleEditPage = connect<StateProps, DispatchProps, OwnProps, ApplicationState>(
    mapStateToProps,
    {loadArticles: ArticleActions.loadArticles}
)(ArticleEditPageImpl);