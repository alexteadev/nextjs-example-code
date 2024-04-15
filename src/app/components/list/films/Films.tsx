'use client';
import React from 'react';
import styles from './styles/films.module.scss';
import clsx from 'clsx';
import { IFilms } from '@/app/models/IFilms';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

type Props = {
    filmsData: IFilms;
    isfilm: boolean;
};

export default function FilmsList({ filmsData, isfilm }: Props) {
    const t = useTranslations('Components.genres');
    const url = isfilm ? '/films/[idname]' : '/series/[idname]';
    return (
        <div className={styles.films_grid}>
            {Object.entries(filmsData).map(([id, film]) => (
                <Link
                    className={styles.film}
                    key={id}
                    href={{
                        pathname: url,
                        params: { idname: film.url }
                    }}
                >
                    <div className={styles.film_image}>
                        <div className={
                            clsx(
                                styles.film_image_rating,
                                film.rating > 7.5 ? styles.high : film.rating >= 6.0 ? styles.middle : styles.low
                            )
                        }>
                            {film.rating.toFixed(1)}
                        </div>
                    </div>
                    <div className={styles.film_description}>
                        <div className={styles.film_title}>
                            {film.title}, <span className={styles.film_year}>{`${film.year}`}</span>
                        </div>
                        <div className={styles.film_genre}>
                            {film.genre ?
                                Object.keys(film.genre).map(genre => (
                                    <div key={genre}>
                                        {t(`${genre}.title`)}
                                    </div>
                                ))
                                : ''}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}