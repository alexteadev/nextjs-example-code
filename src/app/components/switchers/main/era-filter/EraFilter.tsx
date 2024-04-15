'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/era.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Slider from 'rc-slider';
import { RootState } from '@/redux/setupStore';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { epochsData } from '@/app/models/data/DataEpochsExample';
import { setEventEra } from '@/redux/slices/filterSlice';

export default function EraFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const era = useSelector((state: RootState) => state.filter.event_era);
    const [eraTemp, setEraTemp] = useState(era);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('era-filter');
        const savedValue = saved ? JSON.parse(saved) : [15, 20];
        setEraTemp(savedValue);
        dispatch(setEventEra(savedValue));
    }, []);

    const handleEraTemp = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setEraTemp(newValue);
        }
    };

    const handleEra = (newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            dispatch(setEventEra(newValue));
        }
    };

    const marks: Record<number, string> = Object.entries(epochsData).reduce((acc: Record<number, string>, [key, value]) => {
        acc[value] = t(`event_era.${key}`);
        return acc;
    }, {});

    const getCodeByNumber = (number: number): string | undefined => {
        const key = Object.keys(epochsData).find(key => epochsData[key] === number);
        return t(`event_era.${key}`);
    }

    return (
        <div className={styles.era}>
            <div className={styles.era_header}>
                <span className={clsx(styles.era_title)}>{t('event_era.title')}</span>
                <div className={styles.era_box}>
                    <span className={styles.era_from}>{getCodeByNumber(eraTemp[0])}</span>
                    <span className={styles.era_to}>{getCodeByNumber(eraTemp[1])}</span>
                </div>
            </div>
            <div className={styles.era_slider}>
                <Slider
                    range
                    min={1}
                    max={Object.keys(epochsData).length}
                    value={eraTemp}
                    onChange={handleEraTemp}
                    onChangeComplete={handleEra}
                    marks={{
                        1: ' ',
                        2: 'D.C.',
                        3: ' ',
                        4: 'X',
                        5: ' ',
                        6: 'XV',
                        7: ' ',
                        8: 'XVIII',
                        9: ' ',
                        10: 'XIX',
                        11: ' ',
                        12: 'XX',
                        13: ' ',
                        14: '1950',
                        15: ' ',
                        16: '1970',
                        17: ' ',
                        18: '2000',
                        19: ' ',
                        20: t('event_era.titlePresent')
                    }}
                    step={1}
                />
            </div>
        </div>
    );
}
