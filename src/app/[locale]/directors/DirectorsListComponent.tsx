'use client';

import styles from './styles/directors-page.module.scss';
import PageNav from '@/app/components/list/pagenav/PageNav';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/setupStore';
import { useSelector } from 'react-redux';
import DirectorsList from '@/app/components/list/directors/Directors';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { useDispatch } from 'react-redux';
import { setPage } from '@/redux/slices/directorsFilterSlice';
import SortCountDirector from '@/app/components/list/sort-count-director/SortCountDirector';

type Props = {
    locale: string;
};

export default function DirectorsListComponent({ locale }: Props) {
    const messages = useMessages();
    const dispatch = useDispatch();

    const directorsFilter = useSelector((state: RootState) => state.directorsFilter);

    const setPageFn = (page: number) => dispatch(setPage(page));

    const [directorsList, setDirectorsList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const sendDataToServer = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/directors/getlist`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(directorsFilter),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setDirectorsList(data.directorsList);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        sendDataToServer();
    }, [directorsFilter]);

    return (
        <div className={styles.main__body}>
            <div className={styles.main__container}>
                <div className={styles.main__body_sort}>
                    <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                        <SortCountDirector />
                    </NextIntlClientProvider>
                </div>
                <DirectorsList directors={directorsList} />
                <PageNav selectedPage={directorsFilter.page} totalPages={totalPages} setPageFn={setPageFn} />
            </div>
        </div>
    );
}
