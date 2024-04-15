'use client';
import { useTranslations } from 'next-intl';
import AdditionalFilter from './components/additional-filter/AdditionaFilter';
import GenresFilter from './components/genres-filter/GenresFilter';
import FilmList from './components/film-list/FilmList';
import styles from './styles/main.module.scss';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MainSection() {
    const t = useTranslations('MainPage');

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className={styles.main}>

            <div className={styles.filters}>
                <div className={styles.filters__container}>
                    <div className={styles.filters__bg}>
                        <GenresFilter />
                        <div className={styles.filters__line}></div>
                        <AdditionalFilter />
                    </div>
                </div>
            </div>

            <div className={styles.films}  data-aos="fade-up">
                <div className={styles.films__container}>
                    <FilmList />
                </div>
            </div>

        </div>
    );
}
