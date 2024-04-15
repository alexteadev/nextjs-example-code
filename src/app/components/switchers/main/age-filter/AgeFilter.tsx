'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/age.module.scss';
import { useEffect } from 'react';
import clsx from 'clsx';
import { AgeRatingsType } from '@/app/models/TypesEnum';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAgeRating } from '@/redux/slices/filterSlice';

export default function AgeFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const age = useSelector((state: RootState) => state.filter.age_rating);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('age-filter');
        const savedValue = saved ? JSON.parse(saved) : [];
        dispatch(setAgeRating(savedValue as [number, number]));
    }, []);


    const handleAgeRating = (ratingValue: AgeRatingsType) => {
        let newAge;
        if (age.includes(ratingValue)) {
            newAge = age.filter(id => id !== ratingValue);
        } else {
            newAge = [...age, ratingValue];
        }
        dispatch(setAgeRating(newAge));
    };

    return (
        <div className={styles.age}>
            <div className={styles.age_title}>{t('age_rating.title')}</div>
            <div className={styles.age_list}>
                {Object.entries(AgeRatingsType).filter(
                    ([key, value]) => !Number.isInteger(value)
                ).map(([key, value]) => (
                    <div key={key} onClick={() => handleAgeRating(Number(key) as AgeRatingsType)} className={
                        clsx(
                            styles.age_item,
                            age.includes(Number(key) as AgeRatingsType) ? styles.active : ''
                        )}>
                        {t(`age_rating.short.${value}`)}
                    </div>
                ))}
            </div>
        </div>
    );
}
