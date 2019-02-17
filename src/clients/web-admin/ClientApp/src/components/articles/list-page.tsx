import * as React from 'react';
import { ArticleData } from '../../store/common/article';
import { actionCreators as ArticleActions } from '../../store/actions/article';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/reducers';
import { Table, Button } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faGlobe, faArchive } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { AsyncAction, MakeDispatchProps } from '../../store/common';


interface StateProps{
    articles: ArticleData[];
    isLoading: boolean;
}

type DispatchProps = MakeDispatchProps<typeof ArticleActions>;

type ArticleListPageImplProps = StateProps & DispatchProps;

class ArticleListPageImpl extends React.Component<ArticleListPageImplProps>{

    componentDidMount(){
        this.props.loadArticles();
    }

    private handleInsertClick = () => {
        this.props.createEmptyArticle();
    }

    render(){
        const {isLoading, articles} = this.props;
        if(isLoading){
            return "Loading...";
        }

        const orderedArticles = [...articles].sort((a, b) => (new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()));

        return <div className="mt-3">
            <div className="d-flex justify-content-end mb-2">
                <Button outline color="primary" onClick={this.handleInsertClick}>New Article</Button>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th style={{textAlign: "center"}}>Active</th>
                        <th style={{textAlign: "center"}}>Actions</th>
                    </tr>
                    {orderedArticles.map(a => (<tr>
                        <td>{a.id}</td>
                        <td>{a.title}</td>
                        <td>
                            {new Date(a.publishDate)
                                .toLocaleDateString(
                                    'en-US', 
                                    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
                            )}
                        </td>
                        <td style={{textAlign: "center"}}>{a.isPublished ? <FontAwesomeIcon icon={faGlobe} /> : <FontAwesomeIcon icon={faArchive} />}</td>
                        <td style={{textAlign: "center"}}>
                            <Link to={`/articles/${a.id}`}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Link></td>
                    </tr>))}
                </thead>
            </Table>
        </div>;
    }
}

const mapStateToProps = (state: ApplicationState) : StateProps => {
    const {article: {isRefreshing, articleList}} = state;
    return {
        articles: articleList,
        isLoading: isRefreshing
    };
}

export const ArticleListPage = connect<StateProps, DispatchProps, {}, ApplicationState>(
    mapStateToProps,
    {...ArticleActions}
)(ArticleListPageImpl);