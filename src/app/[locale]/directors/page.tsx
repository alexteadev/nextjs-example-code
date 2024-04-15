import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './styles/directors-page.module.scss';
import RatingDirector from '@/app/components/switchers/rating-director/RatingDirector';
import DirectorsListComponent from './DirectorsListComponent';
import DirectorCount from '@/app/components/switchers/director-count/DirectorCount';

type Props = {
    params: {
        locale: string;
    };
};

export default async function DirectorsPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('DirectorsPage');
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
                                <RatingDirector />
                            </div>
                            <div className={styles.main__filter_filmcount}>
                                <DirectorCount />
                            </div>
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>

            <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                <DirectorsListComponent locale={locale} />
            </NextIntlClientProvider>
        </div>
    );
}
