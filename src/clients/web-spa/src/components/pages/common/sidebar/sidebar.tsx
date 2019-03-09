import * as React from 'react';
import { SectionTitle } from '..';
import { GithubFlair, StackoverflowFlair, LinkedInFlair } from './flairs';
import { TagList, TagListItem } from '.';
import styles from './sidebar.module.scss';

export const Sidebar : React.FC = () => {
    return (<>
        <section>
            <SectionTitle title="Platforms" />
            <div className={styles['flair-holder']}>
                <GithubFlair />
                <StackoverflowFlair />
                <LinkedInFlair />
            </div>
        </section>
        <section>
            <SectionTitle title="Tags" />
            <TagList>
                <TagListItem id={3} title="csharp" articleCount={12} />
                <TagListItem id={4} title="performance-optimization" articleCount={8} />
                <TagListItem id={5} title="frontend" articleCount={3} />
            </TagList>
        </section>
    </>)
}