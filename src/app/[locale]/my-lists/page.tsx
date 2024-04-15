import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './styles/mylist.module.scss';
import MyFilmList from './MyFilmList';

type Props = {
    params: {
        locale: string;
    };
};

export default async function MyListPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('MyListPage');
    const messages = await getMessages();

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.header}>
                    {t('title')}
                </div>
                <div className={styles.films}>
                    <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                        <MyFilmList locale={locale}/>
                    </NextIntlClientProvider>
                </div>
            </div>
        </div>
    );
}
