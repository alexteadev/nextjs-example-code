'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/rating.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from 'rc-slider';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { setRating } from '@/redux/slices/directorsFilterSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function RatingDirector() {
    const t = useTranslations('Components.rating');
    const dispatch = useDispatch();

    const rating = useSelector((state: RootState) => state.directorsFilter.rating);

    const [ratingTemp, setRatingTemp] = useState(rating);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('rating-d-filter');
        const savedValue = saved ? JSON.parse(saved) : [7, 8.5];
        setRatingTemp(savedValue);
        dispatch(setRating(savedValue));
    }, []);

    // ...

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
                    10: '10.0',
                }}
                step={0.5}
            />
        </div>
    );
}
