import * as React from 'react';
import {Container} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStackOverflow, faLinkedin, faGithub} from '@fortawesome/free-brands-svg-icons';
import { ExternalLink } from '../social-link';
import { LinkPanel } from './link-panel';
import styles from './header.module.scss';
import { Title } from './title';
import { SearchComponent } from './search-component';

export class TopRow extends React.PureComponent{
    render(){
        return <Container className={styles.TopRow}>
            <div className={styles.left}>
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
            <div className={styles.right}>
                <LinkPanel>
                    <SearchComponent />
                </LinkPanel>
            </div>
        </Container>;
    }
}