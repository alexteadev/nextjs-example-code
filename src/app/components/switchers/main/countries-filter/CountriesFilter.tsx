'use client';

import { useTranslations } from 'next-intl';
import styles from './styles/countries.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RootState } from '@/redux/setupStore';
import { countriesData } from '@/app/models/data/DataCountriesExample';
import 'rc-slider/assets/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '@/redux/slices/filterSlice';

export default function CountriesFilter() {
    const t = useTranslations('Components');
    const dispatch = useDispatch();

    const [isOpenCountry, setOpenCountry] = useState(false);

    const countries = useSelector((state: RootState) => state.filter.country);

    useEffect(() => {
        if (!window) {
            return;
        }
        const saved = localStorage.getItem('countries-filter');
        const savedValue = saved ? JSON.parse(saved) : [101];
        dispatch(setCountries(savedValue as [number, number]));
    }, []);

    const handleCountry = (countryId: number) => {
        let newCountries;
        if (countries.includes(countryId)) {
            newCountries = countries.filter(id => id !== countryId);
        } else {
            newCountries = [...countries, countryId];
        }
        dispatch(setCountries(newCountries));
    };

    const renderSelectedCountries = () => {
        const selectedCountriesElements = countries.map(countryId => {
            for (const [continentName, continentData] of Object.entries(countriesData)) {
                for (const [regionName, regionData] of Object.entries(continentData.regions)) {
                    if (regionData.countries && Object.keys(regionData.countries).some(countryName => regionData.countries[countryName] === countryId)) {
                        const countryName = Object.keys(regionData.countries).find(countryName => regionData.countries[countryName] === countryId);
                        if (countryName) {
                            return (
                                // ...
                            );
                        }
                    }
                }
            }
            return null;
        });

        return selectedCountriesElements.filter(Boolean);
    };

    return (
        <div className={styles.countries}>
            <div className={styles.countries_header}>
                <div className={clsx(styles.countries_header_title)}>
                    {t('countries.title')}
                </div>
                {renderSelectedCountries()}
                <span onClick={() => setOpenCountry(!isOpenCountry)} className={clsx('material-symbols-outlined', styles.add_circle)}>
                    add_circle
                </span>
            </div>
            <div className={clsx(styles.countries_box, isOpenCountry ? styles.active : '')}>
                <div className={styles.countries_list}>
                    {Object.entries(countriesData).map(([continentName, continentData], index) => (
                        <div key={continentData.id} className={styles.countries_continent}>
                            <div className={styles.countries_continent_title}>
                                {t(`countries.${continentName}.title`)}
                                {index === 0 && (
                                    <span onClick={() => setOpenCountry(!isOpenCountry)} className={clsx('material-symbols-outlined', styles.cancel)}>
                                        cancel
                                    </span>
                                )}
                            </div>
                            {Object.entries(continentData.regions).map(([regionName, regionData]) => (
                                <div key={regionData.id} className={styles.countries_region}>
                                    <div className={styles.countries_region_title}>
                                        {t(`countries.${continentName}.regions.${regionName}.title`)}:
                                    </div>
                                    {regionData.countries && Object.entries(regionData.countries).map(([countryName, countryId]) => (
                                        <div
                                            key={countryId}
                                            className={clsx(
                                                styles.countries_country,
                                                countries.includes(countryId) ? styles.active : ''
                                            )}
                                            onClick={() => handleCountry(countryId)}
                                        >
                                            {t(`countries.${continentName}.regions.${regionName}.countries.${countryName}`)}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
