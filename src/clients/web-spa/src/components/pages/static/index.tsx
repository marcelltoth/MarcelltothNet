import * as React from 'react';
import { ContentRenderer, Sidebar } from '../common';
import { PageHeaderWide } from '../common/page-header-wide';
import { Container, Row, Col } from 'reactstrap';

import raw from "raw.macro";


export const portfolioPages = {
    'neptun-lite': createStaticPage(raw('./portfolio/neptun-lite.md'), <PageHeaderWide title="Neptun Lite" subtitle="A .NET Standard / Xamarin.Android based mobile application for students." />)
}



function createStaticPage(content: string, header: React.ReactNode) : React.ComponentType<{}>{
    const pageComponent : React.FC = () => {
        return <>
            {header}
            <Container>
                <Row>
                    <Col md={8}>
                    <article>
                        <ContentRenderer content={content} />
                    </article>
                    </Col>
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </>;
    }
    return pageComponent;
}