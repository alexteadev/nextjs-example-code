'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/awards.module.scss';
import { useEffect } from 'react';
import clsx from 'clsx';
import { AwardsType } from '@/app/models/TypesEnum';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAwards } from '@/redux/slices/filterSlice';

export default function AwardsFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const awards = useSelector((state: RootState) => state.filter.awards);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('awards-filter');
        const savedValue = saved ? JSON.parse(saved) : [];
        dispatch(setAwards(savedValue as [number, number]));
    }, []);


    const handleAwards = (value: AwardsType) => {
        let newAwards;
        if (awards.includes(value)) {
            newAwards = awards.filter(id => id !== value);
        } else {
            newAwards = [...awards, value];
        }
        dispatch(setAwards(newAwards));
    };

    return (
        <div className={styles.awards}>
            <div className={styles.awards_title}>{t('awards.title')}:</div>
            <div className={styles.awards_list}>
                {Object.entries(AwardsType).filter(
                    ([key, value]) => !Number.isInteger(value)
                ).map(([key, value]) => (
                    <div key={key} onClick={() => handleAwards(Number(key) as AwardsType)} className={
                        clsx(
                            styles.awards_item,
                            awards.includes(Number(key) as AwardsType) ? styles.active : ''
                        )}>
                        {t(`awards.${value}`)}
                    </div>
                ))}
            </div>
        </div>
    );
}
