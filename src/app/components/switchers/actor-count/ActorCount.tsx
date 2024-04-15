'use client';

import { useTranslations, useMessages } from 'next-intl';
import styles from './styles/filmcount.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { RootState } from '@/redux/setupStore';
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '@/redux/slices/actorsFilterSlice';

export default function ActorCount() {
    const t = useTranslations('Components.filmcount');
    const dispatch = useDispatch();

    const count = useSelector((state: RootState) => state.actorsFilter.count);

    const [countTemp, setCountTemp] = useState(count);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('count-a-filter');
        const savedValue = saved ? JSON.parse(saved) : [1, 35];
        setCountTemp(savedValue);
        dispatch(setCount(savedValue));
    }, []);

    const handleCountTemp = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setCountTemp(newValue);
        }
    };

    const handleCount = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            dispatch(setCount(newValue as [number, number]));
        }
    };
    
    return (
        <div className={styles.filmcount}>
            <span className={clsx(styles.filmcount_title)}>{t('title')}</span>
            <Slider
                range
                min={1}
                max={35}
                value={countTemp}
                onChange={handleCountTemp}
                onChangeComplete={handleCount}
                dots={true}
                marks={{
                    1: '1',
                    5: '5',
                    10: '10',
                    15: '15',
                    20: '20',
                    25: '25',
                    30: '30',
                    35: '35+'
                }}
                step={1}
            />
        </div>
    );
}
