import * as React from 'react';
import { PageHeaderWide } from '../common/page-header-wide';
import { Container, Row, Col, FormGroup, Alert } from 'reactstrap';
import { Sidebar, SectionTitle } from '../common';
import styles from './contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

export class ContactPage extends React.Component{
    render(){
        return <>
            <PageHeaderWide title="Contact Me" />
            <Container>
                <Row>
                    <Col md={8}>
                        <section>
                            <SectionTitle title="Contact information" />
                            <p>
                            Thanks for wanting to contact me! 
                            Whether you have a question, you would like to hire me for a short or longer project or want me to speak at your event, 
                            I will try to respond as soon as possible.
                            </p>
                            <ul className={styles.contact}>
                                <li>
                                    <span className={styles.icon}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                    marcell@marcelltoth.net
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    </span>
                                    Budapest, Hungary
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </span>
                                    <a href="https://www.linkedin.com/in/marcell-t%C3%B3th-38a80815b/" target="_blank">Contact me on LinkedIn</a>
                                </li>
                                <li>
                                    <span className={styles.icon}>
                                        <FontAwesomeIcon icon={faStackOverflow} />
                                    </span>
                                    <a href="https://stackoverflow.com/users/10614791/marcell-t%C3%B3th" target="_blank">View my StackOverflow profile</a>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <SectionTitle title="Mail me" />
                            <FormGroup>
                                <input type="email" placeholder="Email" disabled className={styles.input} />
                            </FormGroup>
                            <FormGroup>
                                <input type="text" placeholder="Subject" disabled className={styles.input} />
                            </FormGroup>
                            <FormGroup>
                                <textarea placeholder="Message" disabled className={styles.input} />
                            </FormGroup>
                            <Alert color="warning">
                                The on-site mail form has been disabled. Please contact me via email.
                            </Alert>
                        </section>
                    </Col>
                    <Col md={4}>
                        <Sidebar showPopularTags={false} />
                    </Col>
                </Row>
            </Container>
        </>
    }
}