import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ArticleData } from '../../store/common/article';
import { ApplicationState } from '../../store/reducers';
import { connect } from 'react-redux';
import { actionCreators as ArticleActions } from '../../store/actions/article';
import { ArticleEditor } from './article-editor';
import { VoidFunctionOf } from '../../store/common';


interface MatchParams{
    id: string;
}

interface OwnProps extends RouteComponentProps<MatchParams>{
}

interface StateProps{
    isLoading: boolean;
    article?: ArticleData;
}

type DispatchProps = {
    loadArticle: VoidFunctionOf<typeof ArticleActions.loadSingleArticle>,
    changeTitle: typeof ArticleActions.changeTitle,
    changePublishDate: typeof ArticleActions.changePublishDate,
    changeThumbnail: typeof ArticleActions.changeThumbnail,
    changeContent: typeof ArticleActions.changeContent,
};

type ArticleEditPageImplProps = OwnProps & StateProps & DispatchProps;

class ArticleEditPageImpl extends React.Component<ArticleEditPageImplProps>{
    componentDidMount(){
        const {loadArticle,match: {params: {id}}} = this.props;
        
        loadArticle(Number(id));
    }

    private handleChangePublishDate = (newDate: Date) => {

    }

    private handleChangeTitle = (newValue: string) => {

    }

    private handleChangeThumbnail = (newUri: string, newAltText: string) => {

    }

    private handleChangeContent = (newValue: string) => {

    }

    render(){
        const {article, isLoading} = this.props;
        if(isLoading){
            return "Loading";
        }
        if(article === undefined){
            return "Not found";
        }
        return <ArticleEditor article={article} 
                    onChangeTitle={this.handleChangeTitle}
                    onChangePublishDate={this.handleChangePublishDate}
                    onChangeThumbnail={this.handleChangeThumbnail}
                    onChangeContent={this.handleChangeContent} />;
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
    {
        loadArticle: ArticleActions.loadSingleArticle,
        changeTitle: ArticleActions.changeTitle, 
        changePublishDate: ArticleActions.changePublishDate,
        changeThumbnail: ArticleActions.changeThumbnail,
        changeContent: ArticleActions.changeContent,
    }
)(ArticleEditPageImpl);