import * as React from 'react';
import {Container, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStackOverflow, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';
import { ExternalLink } from '../SocialLink';
import { LinkPanel } from './LinkPanel';
import styles from './Header.module.scss';
import { Title } from './Title';
import { SearchComponent } from './SearchComponent';

export class TopRow extends React.PureComponent{
    render(){
        return <Container className={styles.TopRow}>
            <div className={styles.LeftSide}>
                <LinkPanel>
                    <ExternalLink url="https://www.linkedin.com/in/marcell-tóth-38a80815b/">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </ExternalLink>
                    <ExternalLink url="https://stackoverflow.com/users/10614791/marcell-tóth">
                        <FontAwesomeIcon icon={faStackOverflow} />
                    </ExternalLink>
                    <ExternalLink url="https://github.com/marcelltoth">
                        <FontAwesomeIcon icon={faGithub} />
                    </ExternalLink>
                </LinkPanel>
            </div>
            <div className={styles.center}>
                <Title />
            </div>
            <div className={styles.RightSide}>
                <LinkPanel>
                    <SearchComponent />
                </LinkPanel>
            </div>
        </Container>;
    }
}