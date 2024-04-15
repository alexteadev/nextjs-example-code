'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/genres-filter.module.scss';
import TagsFilter from '@/app/components/switchers/main/tags-filter/TagsFilter';
import GenreFilter from '@/app/components/switchers/main/genre-filter/GenreFilter';
import { useEffect } from 'react';

export default function GenresFilter() {
    const t = useTranslations('MainPage.GenresFilter');
    return (
        <div className={styles.filter}>
            <GenreFilter />
            <TagsFilter />
        </div>
    );
}
