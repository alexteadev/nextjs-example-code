import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './styles/profile-page.module.scss';
import ProfileForm from './components/profile-form';

type Props = {
    params: { 
        locale: string;
    };
};

export default async function MyProfilePage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('MyProfilePage');
    const messages = await getMessages();

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.main__form}>
                    <div className={styles.main__info}>
                        <div className={styles.main__info_title}>{t('title')}</div>
                    </div>
                    <div>
                        <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                            <ProfileForm />
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
