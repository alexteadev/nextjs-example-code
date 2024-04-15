'use client';

import styles from './styles/film-list.module.scss';
import FilmsList from '@/app/components/list/films/Films';
import Sort from '@/app/components/list/sort/Sort';
import PageNav from '@/app/components/list/pagenav/PageNav';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/setupStore';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPage } from '@/redux/slices/filterSlice';

export default function FilmList() {
    const filter = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch();
    const [filmList, setFilmList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const setPageFn = (page: number) => dispatch(setPage(page));

    useEffect(() => {
        const sendDataToServer = async () => {
            try {
                if (filter.type !== 'init') {
                    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/films/getfilms`;

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(filter),
                    });

                    const data = await response.json();
                    setFilmList(data.filmList);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                // ...
            }
        };
        sendDataToServer();
    }, [filter]);

    return (
        <div className={styles.film_list}>
            <Sort />
            <FilmsList filmsData={filmList} isfilm={filter.type == 'series' ? false : true} />
            <PageNav selectedPage={filter.page} totalPages={totalPages} setPageFn={setPageFn} />
        </div>
    );
}
