'use client';
import { NextIntlClientProvider, useLocale, useMessages, useTranslations } from 'next-intl';
import styles from './styles/header.module.scss';
import clsx from 'clsx';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';
import Image from 'next/image';
import { useState } from 'react';
import { userAPI } from '@/services/api/UserServices';

export default function Header() {
    const t = useTranslations('HeaderNavigation');
    const locale = useLocale();
    const messages = useMessages();

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const { data: userData } = userAPI.useMeQuery();

    const [logout] = userAPI.useLogoutMutation();

    const handleLogout = async () => {
       
    };

    const toggleMenu = () => {

        const showMenu = !isMenuVisible;
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        setIsMenuVisible(showMenu);
    };

    const removeMenu = () => {
        setIsMenuVisible(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.header__container}>
                    <div className={styles.header__logo}>
                        <NavigationLink href="/">
                            <Image
                                src="/logo.png"
                                alt="FilmAdvise Logo"
                                width={24}
                                height={24}
                                priority
                            />
                        </NavigationLink>
                    </div>
                    <nav className={styles.header__nav}>
                        <ul className={clsx(styles.header__menu, isMenuVisible ? styles.header__menu__active : '')}>
                            <li><NavigationLink onClick={removeMenu} href="/">{t('home')}</NavigationLink></li>
                            <li><NavigationLink onClick={removeMenu} href="/actors">{t('actors')}</NavigationLink></li>
                            <li><NavigationLink onClick={removeMenu} href="/directors">{t('directors')}</NavigationLink></li>
                            <li><NavigationLink onClick={removeMenu} href="/my-lists">{t('my-lists')}</NavigationLink></li>
                            <li><NavigationLink onClick={removeMenu} href="/about-us">{t('about-us')}</NavigationLink></li>
                        </ul>
                        <div className={styles.header__authorization}>
                            <NextIntlClientProvider messages={messages} locale={locale} timeZone='Europe/Kiev'>
                                <LocaleSwitcher />
                            </NextIntlClientProvider>
                            {userData ? (
                                <>
                                    <NavigationLink className={styles.username} href="/my-profile">
                                        {t('my-profile')}
                                    </NavigationLink>
                                    <div className={styles.auth_btn} onClick={handleLogout}>
                                        {t('logout')}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <NavigationLink className={styles.auth_btn} href="/login">
                                        {t('login')}
                                    </NavigationLink>
                                    <NavigationLink className={styles.auth_btn} href="/registration">
                                        {t('registration')}
                                    </NavigationLink>
                                </>
                            )}

                        </div>
                        <div className={clsx(styles.header__icons, isMenuVisible ? styles.header__icons__active : '')} onClick={toggleMenu}>
                            <span></span><span></span><span></span>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
