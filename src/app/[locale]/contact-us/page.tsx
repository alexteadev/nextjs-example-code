import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import styles from './styles/contact.module.scss';
import Contact from '@/app/components/forms/contact/Contact';

type Props = {
    params: { locale: string };
};

export default async function ContactUsPage({
    params: { locale }
}: Props) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('ContactUsPage');
    const messages = await getMessages();

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.main__form}>
                    <div className={styles.main__info}>
                        <div className={styles.main__info_title}>{t('title')}</div>
                        <div className={styles.main__info_note}>{t('note')}</div>
                    </div>
                    <div>
                        <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                            <Contact />
                        </NextIntlClientProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}
