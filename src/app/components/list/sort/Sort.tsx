'use client';
import { useTranslations } from 'next-intl';
import styles from './styles/sort.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RootState } from '@/redux/setupStore';
import { useDispatch, useSelector } from 'react-redux';
import { setDirection, setSortBy } from '@/redux/slices/filterSlice';

export default function Sort() {
    const t = useTranslations('Components.sort');
    const dispatch = useDispatch();

    const sortby = useSelector((state: RootState) => state.filter.sortBy);
    const direction = useSelector((state: RootState) => state.filter.direction);

    useEffect(() => {
        if (!window) {
            return;
        }
        const savedSort = localStorage.getItem('sortby-a-filter');
        const savedDirection = localStorage.getItem('direction-a-filter');

        const savedSortValue = savedSort ? savedSort : 'rating';
        const savedDirectionValue = savedDirection ? savedDirection : 'asc';

        dispatch(setSortBy(savedSortValue as 'rating' | 'year'));

        dispatch(setDirection(savedDirectionValue as 'asc' | 'desc'));
    }, []);

    const handleToggleSort = (criteria: 'rating' | 'year') => {
        dispatch(setSortBy(criteria));
        dispatch(setDirection(direction === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className={styles.sort}>
            <div
                className={clsx(styles.sort__button, { [styles.active]: sortby === 'rating' })}
                onClick={() => handleToggleSort('rating')}
            >
                <span>{t('rating')}</span>
                <span className="material-symbols-outlined">
                    {sortby === 'rating' ? (direction === 'desc' ? 'keyboard_arrow_down' : 'keyboard_arrow_up') : 'keyboard_arrow_down'}
                </span>
            </div>
            <div
                className={clsx(styles.sort__button, { [styles.active]: sortby === 'year' })}
                onClick={() => handleToggleSort('year')}
            >
                <span>{t('year')}</span>
                <span className="material-symbols-outlined">
                    {sortby === 'year' ? (direction === 'desc' ? 'keyboard_arrow_down' : 'keyboard_arrow_up') : 'keyboard_arrow_down'}
                </span>
            </div>
        </div>
    );
}