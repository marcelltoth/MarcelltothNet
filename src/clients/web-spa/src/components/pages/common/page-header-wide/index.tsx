import * as React from 'react';
import styles from './header.module.scss';
import { Container, Row, Col } from 'reactstrap';

interface HeaderProps{
    title: string;
    subtitle?: string;
    backgroundImage?: string;
}

export const PageHeaderWide : React.FC<HeaderProps> = ({title, subtitle, backgroundImage}) => {
    return <div className={styles['page-header-wide']}>
        <Container>
            <Row>
                <Col md={{size: 10, offset: 1}} className='text-center'>
                    <h1>{title}</h1>
                    {subtitle && <p className={styles.lead}>{subtitle}</p>}
                </Col>
            </Row>
        </Container>
    </div>
}