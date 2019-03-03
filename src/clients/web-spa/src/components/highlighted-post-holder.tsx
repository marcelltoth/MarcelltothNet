import * as React from 'react';
import { Col, Row } from 'reactstrap';

export class HighlightedPostHolder extends React.PureComponent{
    render(){
        return (
            <Row>
                <Col md={8}>
                    <img src="https://via.placeholder.com/760x506" />
                </Col>
                <Col md={4}>
                    <img src="https://via.placeholder.com/760x506" />
                    <img src="https://via.placeholder.com/760x506" />
                </Col>
            </Row>
        )
    }
}