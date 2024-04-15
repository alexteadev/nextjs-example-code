'use client';
import { useTranslations } from 'next-intl';
import styles from './styles/additional-filter.module.scss';
import 'rc-slider/assets/index.css';
import TypeFilter from '@/app/components/switchers/main/type-filter/TypeFilter';
import RatingFilter from '@/app/components/switchers/main/rating-filter/RatingFilter';
import YearFilter from '@/app/components/switchers/main/year-filter/YearFilter';
import EraFilter from '@/app/components/switchers/main/era-filter/EraFilter';
import CountriesFilter from '@/app/components/switchers/main/countries-filter/CountriesFilter';
import AgeFilter from '@/app/components/switchers/main/age-filter/AgeFilter';
import AwardsFilter from '@/app/components/switchers/main/awards-filter/AwardsFilter';

export default function AdditionalFilter() {
    const t = useTranslations('MainPage.AdditionalFilter');

    return (
        <div className={styles.additional}>
            <TypeFilter color='dark' />
            <RatingFilter />
            <YearFilter />     
            <EraFilter />
            <CountriesFilter />
            <AgeFilter />
            <AwardsFilter />
        </div>
    );
}
