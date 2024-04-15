'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles/films.module.scss';
import clsx from 'clsx';
import { IFilms } from '@/app/models/IFilms';
import { Link } from '@/navigation';
import { RootState } from '@/redux/setupStore';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

type Props = {
    filmsData: IFilms;
    isfilm: boolean;
};

export default function FilmsDirectorList({ filmsData, isfilm }: Props) {
    const t = useTranslations('Components.genres');

    const url = isfilm ? '/films/[idname]' : '/series/[idname]';

    const sort = useSelector((state: RootState) => state.filmDirectorSort.sortBy);
    const direction = useSelector((state: RootState) => state.filmDirectorSort.direction);

    const [sortedFilms, setSortedFilms] = useState(Object.entries(filmsData));

    useEffect(() => {
        const sorted = [...Object.entries(filmsData)].sort(([idA, filmA], [idB, filmB]) => {
            const isAscending = direction === 'asc';
            switch (sort) {
                case 'rating':
                    return isAscending ? filmA.rating - filmB.rating : filmB.rating - filmA.rating;
                case 'year':
                    return isAscending ? filmA.year - filmB.year : filmB.year - filmA.year;
                default:
                    return 0;
            }
        });

        setSortedFilms(sorted);
    }, [filmsData, sort, direction]);

    return (
        <div className={styles.films_grid}>
            {sortedFilms.map(([id, film]) => (
                <Link
                    className={styles.film}
                    key={id}
                    href={{
                        pathname: url,
                        params: { idname: film.url }
                    }}
                >
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