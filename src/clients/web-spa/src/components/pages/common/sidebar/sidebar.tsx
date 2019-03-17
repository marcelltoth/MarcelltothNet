import * as React from 'react';
import { SectionTitle } from '..';
import { GithubFlair, StackoverflowFlair, LinkedInFlair } from './flairs';
import { TagList, TagListItem } from '.';
import styles from './sidebar.module.scss';
import { ApplicationState } from '../../../../store/state';
import { connect } from 'react-redux';
import { selectTagsByArticleCountDesc } from '../../../../store/selectors';
import { take } from 'lodash';

interface OwnProps{
    showPopularTags?: boolean;
}

interface StateProps{
    tagsByArticleCount: {
        id: number;
        displayName: string;
        articleCount: number;
    }[];
}

type SidebarImplProps = OwnProps & StateProps;

const SidebarImpl : React.FC<SidebarImplProps> = ({tagsByArticleCount, showPopularTags = true}) => {

    const tagsToShow = take(tagsByArticleCount, 8);

    return (<>
        <section>
            <SectionTitle title="Platforms" />
            <div className={styles['flair-holder']}>
                <GithubFlair />
                <StackoverflowFlair />
                <LinkedInFlair />
            </div>
        </section>
        {showPopularTags && <section>
            <SectionTitle title="Tags" />
            <TagList>
                {tagsToShow.map(t => <TagListItem key={t.id} {...t} />)}
            </TagList>
        </section>}
    </>)
}

function mapStateToProps(state: ApplicationState) : StateProps{
    return {
        tagsByArticleCount: selectTagsByArticleCountDesc(state)
    };
}

export const Sidebar = connect(mapStateToProps)(SidebarImpl);