import * as React from 'react';
import styles from './footer.module.scss';
import { Container, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export const Footer : React.FC = () => {
    return <footer className={styles.footer}>
        <Container>

            <Row className={styles['bottom-row']}>
                <Col md={6}>
                    <div className={styles.copyright}>
                        Copyright © {new Date().getFullYear()}  rights reserved
                        <br />
                        This website is built based on a template by <a href="https://colorlib.com" target="_blank">Colorlib</a>.
                    </div>
                </Col>
                <Col md={6}>
                    <ul className={styles.nav}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/privacy-policy'>Privacy policy</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </footer>
}