import { notFound } from 'next/navigation';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/config';
import MainSection from './main/_page';

type Props = {
    params: { locale: string };
};

export default async function IndexPage({ params: { locale } }: Props) {
    const isValidLocale = locales.some((cur) => cur === locale);
    if (!isValidLocale) notFound();

    unstable_setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <div>
            <NextIntlClientProvider messages={messages} locale={locale}>
                <MainSection/>
            </NextIntlClientProvider>
        </div>
    );
}
