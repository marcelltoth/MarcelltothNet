import * as React from 'react';
import style from './common.module.scss';

interface SectionTitleProps{
    title: string;
}

export const SectionTitle : React.FC<SectionTitleProps> = ({title}) => 
    <div className={style['section-title']}><h2>{title}</h2></div>;