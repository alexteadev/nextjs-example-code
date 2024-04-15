import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import styles from './styles/actor-page.module.scss';
import FilmsActorList from '@/app/components/list/films-actor/FilmsActor';
import SortDirector from '@/app/components/list/sort-director/SortDirector';
import { notFound } from 'next/navigation';

type Props = {
    params: {
        locale: string;
        idname: string;
    };
    searchParams: {
        sort: string;
        direction: string;
    };
};


export default async function ActorPage({ params: { locale, idname }, ...props }: Props) {
    const t = await getTranslations('ActorPage');
    const messages = await getMessages();

    const id = idname.split('-')[0];
    const { sort = 'rating', direction = 'desc' } = props.searchParams || {};

    // ...

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.header__container}>
                    <div className={styles.header__info}>
                        <div className={styles.header__info_name}>{actor.name}</div>
                        <div className={styles.header__info_bday}>
                            <span>{t('birthday')}:</span> {actor.birthday}
                            {actor.deathday ? `- ${actor.deathday}` : ''}
                        </div>
                        <div className={styles.header__info_bplace}>
                            <span>{t('bplace')}:</span> {actor.place_of_birth}
                        </div>
                        <div className={styles.header__info_biography}>
                            <span>{t('biography')}:</span> {actor.biography}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.body__container}>
                    <div className={styles.body__sort}>
                        <div className={styles.main__body_sort}>
                            <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                                <SortDirector />
                            </NextIntlClientProvider>
                        </div>
                    </div>
                    <div className={styles.body__list}>
                        <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                            <FilmsActorList filmsData={actor.films} isfilm={true} />
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}