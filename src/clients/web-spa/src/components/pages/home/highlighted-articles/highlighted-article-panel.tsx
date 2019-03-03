import * as React from 'react';
import { Col, Row } from 'reactstrap';
import style from './highlighted-article-panel.module.scss';

export const HighlightedArticlePanel : React.FC = ({children}) => {
    const childrenComponents = React.Children.toArray(children);

    if(childrenComponents.length < 1)
        return null;

    if(childrenComponents.length < 3)
        return childrenComponents[0] as React.ReactElement;

    return (
        <Row className={style['highlighted-article-panel']}>
            <Col md={8} className={style.left}>
                <div>
                    {childrenComponents[0]}
                </div>
            </Col>
            <Col md={4} className={style.right}>
                <div>
                    {childrenComponents[1]}
                </div>
                <div>
                    {childrenComponents[2]}
                </div>
            </Col>
        </Row>
    )
}