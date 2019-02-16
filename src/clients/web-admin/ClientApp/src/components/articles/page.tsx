import * as React from 'react';
import { ArticleData } from '../../store/common/article';
import { actionCreators as ArticleActions } from '../../store/actions/article';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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
        const {isLoading, articles} = this.props;
        if(isLoading){
            return "Loading...";
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    {articles.map(a => (<tr>
                        <td>{a.id}</td>
                        <td>{a.title}</td>
                        <td>{a.publishDate}</td>
                        <td>{a.isPublished ? "+" : "-"}</td>
                        <td>
                            <Link to={`/articles/${a.id}`}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Link></td>
                    </tr>))}
                </thead>
            </Table>
        );
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