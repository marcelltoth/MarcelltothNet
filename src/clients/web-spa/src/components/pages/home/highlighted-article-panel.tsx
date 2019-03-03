import * as React from 'react';
import { Col, Row } from 'reactstrap';

export const HighlightedArticlePanel : React.FC = ({children}) => {
    const childrenComponents = React.Children.toArray(children);

    if(childrenComponents.length < 1)
        return null;

    if(childrenComponents.length < 3)
        return childrenComponents[0] as React.ReactElement;

    return (
        <Row>
            <Col md={8}>
                <div>
                    {childrenComponents[0]}
                </div>
            </Col>
            <Col md={4}>
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