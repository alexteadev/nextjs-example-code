'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/year.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from 'rc-slider';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setYear } from '@/redux/slices/filterSlice';

export default function YearFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const year = useSelector((state: RootState) => state.filter.year);
    const [yearTemp, setYearTemp] = useState(year);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('year-filter');
        const savedValue = saved ? JSON.parse(saved) : [2000, 2024];
        setYearTemp(savedValue);
        dispatch(setYear(savedValue));
    }, []);

    const handleYearTemp = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setYearTemp(newValue);
        }
    };

    const handleYear = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            dispatch(setYear(newValue));
        }
    };

    return (
        <div className={styles.year}>
            <span className={clsx(styles.year_title)}>{t('release_year.title')}</span>
            <Slider
                range
                min={1935}
                max={2024}
                value={yearTemp}
                marks={{
                    1935: ' ',
                    1940: '1940',
                    1950: ' ',
                    1960: '1960',
                    1970: ' ',
                    1980: '1980',
                    1990: ' ',
                    2000: '2000',
                    2010: ' ',
                    2020: '2020',
                    2024: ' ',
                }}
                onChange={handleYearTemp}
                onChangeComplete={handleYear}
                step={1}
            />
        </div>
    );
}
