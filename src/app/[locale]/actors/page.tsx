import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './styles/actors-page.module.scss';
import RatingActor from '@/app/components/switchers/rating-actor/RatingActor';
import ActorsListComponent from './ActorsListComponent';
import ActorCount from '@/app/components/switchers/actor-count/ActorCount';

type Props = {
    params: { 
        locale: string;
    };
};

export default async function ActorsPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('ActorsPage');
    const messages = await getMessages();

    return (
        <div className={styles.main}>

            <div className={styles.main__header}>
                <div className={styles.main__container}>
                    <div className={styles.main__info}>
                        <div className={styles.main__info_note}>{t('note')}</div>
                    </div>
                    <div className={styles.main__filter}>
                        <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                            <div className={styles.main__filter_rating}>
                                <RatingActor />
                            </div>
                            <div className={styles.main__filter_filmcount}>
                                <ActorCount />
                            </div>
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>

            <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                <ActorsListComponent locale={locale} />
            </NextIntlClientProvider>
        </div>
    );
}
