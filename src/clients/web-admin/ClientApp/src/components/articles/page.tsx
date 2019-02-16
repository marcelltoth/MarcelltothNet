import * as React from 'react';
import { ArticleData } from '../../store/common/article';
import { actionCreators as ArticleActions } from '../../store/actions/article';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';

interface StateProps{
    articles: ArticleData[];
    isLoading: boolean;
}

type DispatchProps = typeof ArticleActions;

type ArticlesPageImplProps = StateProps & DispatchProps;

class ArticlesPageImpl extends React.Component<ArticlesPageImplProps>{

    componentDidMount(){
        this.props.loadArticles();
    }

    render(){
        return "Hi articles";
    }
}

const mapStateToProps = (state: ApplicationState) : StateProps => {
    const {article: {isRefreshing, articleList}} = state;
    return {
        articles: articleList,
        isLoading: isRefreshing
    };
}

export const ArticlesPage = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    {...ArticleActions}
)(ArticlesPageImpl);