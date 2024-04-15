'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/rating.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from 'rc-slider';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRating } from '@/redux/slices/filterSlice';

export default function RatingFilter() {
    const t = useTranslations('Components.rating');
    const dispatch = useDispatch();

    const rating = useSelector((state: RootState) => state.filter.rating);
    const [ratingTemp, setRatingTemp] = useState(rating);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('rating-filter');
        const savedValue = saved ? JSON.parse(saved) : [6, 8];
        setRatingTemp(savedValue);
        dispatch(setRating(savedValue));
    }, []);

    const handleRatingTemp = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setRatingTemp(newValue);
        }
    };

    const handleRating = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            dispatch(setRating(newValue));
        }
    };

    return (
        <div className={styles.rating}>
            <span className={clsx(styles.rating_title)}>{t('title')}</span>
            <Slider
                range
                min={5}
                max={10}
                value={ratingTemp}
                onChange={handleRatingTemp}
                onChangeComplete={handleRating}
                dots={true}
                marks={{
                    5: '5.0',
                    6: '6.0',
                    7: '7.0',
                    8: '8.0',
                    9: '9.0',
                    10: '10.0'
                }}
                step={0.5}
            />
        </div>
    );
}
