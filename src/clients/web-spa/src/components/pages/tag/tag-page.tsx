import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { PageHeaderWide } from '../common/page-header-wide';

interface RouteParams{
    id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

type ArticlePageProps = OwnProps;

export class TagPage extends React.Component<ArticlePageProps>{

    render(){
        return <>
            <PageHeaderWide title="Tag title"  />
            <div style={{height: 500}} />
        </>
    }

}