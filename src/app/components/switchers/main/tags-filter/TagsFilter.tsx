'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/tags.module.scss';
import { useEffect } from 'react';
import clsx from 'clsx';
import { AwardsType } from '@/app/models/TypesEnum';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTags } from '@/redux/slices/filterSlice';
import { tagsData } from '@/app/models/data/DataTagsExample';

export default function TagsFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const tags = useSelector((state: RootState) => state.filter.tags);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('tags-filter');
        const savedValue = saved ? JSON.parse(saved) : [];
        dispatch(setTags(savedValue as [number, number]));
    }, []);


    const handleTags = (value: AwardsType) => {
        let newAwards;
        if (tags.includes(value)) {
            newAwards = tags.filter(id => id !== value);
        } else {
            newAwards = [...tags, value];
        }
        dispatch(setTags(newAwards));
    };

    return (
        <div className={styles.tags}>
            <div className={styles.tags_title}>{t('tags.title')}</div>
            <div className={styles.tags_list}>
                {Object.entries(tagsData).map(([tagName, tagId]) => (
                    <span key={tagId} onClick={() => handleTags(tagId)} className={clsx(styles.tags_tag, tags.includes(tagId) ? styles.tags_active : '')}>
                        {t(`tags.${tagName}`)}
                    </span>
                ))}
            </div>
        </div>
    );
}
