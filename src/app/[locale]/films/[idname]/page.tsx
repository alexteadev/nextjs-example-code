import { getMessages, getTranslations } from 'next-intl/server';
import styles from './styles/film-page.module.scss';
import { Link } from '@/navigation';
import { format, parseISO } from 'date-fns';
import { IFilm } from '@/app/models/IFilm';
import AddFavorite from '@/app/components/addfavorite/AddFavorite';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        locale: string;
        idname: string;
    };
};

export default async function FilmsPage({ params: { locale, idname } }: Props) {
    const t = await getTranslations('FilmPage');
    const g = await getTranslations('Components');
    const messages = await getMessages();

    // ...


    const formatDate = (dateString: string): string => {
        const date = parseISO(dateString);
        return format(date, 'yyyy / MM / dd');
    };

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.header__container}>
                    <div className={styles.header__info}>
                        <div className={styles.header__info_name}>{film.title}</div>
                        <div className={styles.header__info_director}>
                            <span>{t('director')}:</span>
                            <Link
                                href={{
                                    pathname: '/directors/[idname]',
                                    params: { idname: film.director.url }
                                }}
                            >
                                {film.director.name}
                            </Link>
                        </div>
                        <div className={styles.header__info_overview}>
                            <span>{t('overview')}:</span>
                            <div>{film.overview}</div>
                        </div>
                        <div className={styles.header__info_release}>
                            <span>{t('release')}:</span>
                            <div>{formatDate(film.release)}</div>
                        </div>
                        <div className={styles.header__info_rating}>
                            <span>{t('rating')}:</span>
                            <div>{film.rating}</div>
                        </div>
                        <div className={styles.header__info_genres}>
                            <div className={styles.header__info_genres_title}>{t('genres')}:</div>
                            <div className={styles.header__info_genres_list}>
                                {Object.entries(film.genres).map(([genreName, genreDetails]) => (
                                    <div key={genreDetails.id} className={styles.header__info_genres_item}>
                                        <div className={styles.header__info_genres_genre}>
                                            {g(`genres.${genreName}.title`)}
                                        </div>
                                        <div className={styles.header__info_genres_element}>
                                            {Object.entries(genreDetails.subgenres).map(([subgenreName, subgenreId]) => (
                                                <div className={styles.header__info_genres_subgenre} key={subgenreId}>
                                                    {g(`genres.${genreName}.subgenres.${subgenreName}`)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.header__info_tags}>
                            <div className={styles.header__info_tags_title}>{t('tags')}:</div>
                            <div className={styles.header__info_tags_list}>
                                {Object.entries(film.tags).map(([tagName, tagId]) => (
                                    <div key={tagId} className={styles.header__info_tags_tag}>
                                        {g(`tags.${tagName}`)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.header__info_mylist}>
                            <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                                <AddFavorite id={film.id} isfilm={true} />
                            </NextIntlClientProvider>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.body__container}>
                    <div className={styles.body__list}>
                        {film.actors.map((actor: any) => (
                            <div key={actor.id} className={styles.body__item}>
                                <div>
                                    <Link
                                        href={{
                                            pathname: '/actors/[idname]',
                                            params: { idname: actor.url }
                                        }}
                                    >
                                        {actor.name}
                                    </Link>
                                </div>
                                <div className={styles.body__item_details}>
                                    <span>{t('character')}</span>
                                    <div>{actor.character}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
