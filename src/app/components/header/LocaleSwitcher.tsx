'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/config';
import { useState, useTransition } from 'react';
import { usePathname, useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import styles from './styles/locale-switcher-select.module.scss';
import clsx from 'clsx';

type RouteParams = {
    idname: string;
};

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const currentLocale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams<RouteParams>();
    const [isOpen, setIsOpen] = useState(false);

    const changeLocale = (nextLocale: string) => {
        setIsOpen(false);
        if (window.innerWidth < 821) {
            document.body.style.overflow = '';
        }
        startTransition(() => {
            router.replace({ pathname, params }, { locale: nextLocale });
        });
    };

    const toggleMenu = (actionType: boolean) => {
        if (window.innerWidth < 821) {
            if (actionType === true) {
                const showMenu = !isOpen;
                if (showMenu) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
                setIsOpen(showMenu);
            }
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={clsx(styles.locale, isOpen ? styles.active : '')} onClick={() => toggleMenu(true)} onMouseEnter={() => toggleMenu(false)} onMouseLeave={() => toggleMenu(false)}>
            <button className={styles.locale__btn} >
                <img src={`/images/flags/${currentLocale}.png`} />
                <div className={clsx(styles.locale__btn_arrow, isOpen ? styles.locale__btn_arrow_active : '')}></div>
            </button>
            <div className={clsx(styles.locale__list, isOpen ? styles.active : '')}>
                <div className={styles.locale__list_elements}>
                    <div className={styles.locale__list_header}>
                        <span className={styles.locale__list_title}>{t('select-language')}</span>
                        <div className={styles.locale__list_close} onClick={() => toggleMenu(true)}></div>
                    </div>
                    <ul>
                        {locales.map((locale) => (
                            <li key={locale} onClick={() => changeLocale(locale)} className={clsx(currentLocale === locale ? styles.active : '')}>
                                <div className={styles.locale__list_element} >
                                    <img src={`/images/flags/${locale}.png`} width={20} height={20} />
                                    <span>{t('locale', { locale })}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
