import { useTranslations } from 'next-intl';
import styles from './styles/footer.module.scss';
import { Link } from '@/navigation';
import NavigationLink from '../header/NavigationLink';
import Image from 'next/image';

export default function Footer() {
    const t = useTranslations('FooterNavigation');

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.logo}>
                    <NavigationLink href="/">
                        <Image
                            src="/logo.png"
                            alt="FilmAdvise Logo"
                            width={24}
                            height={24}
                            priority
                        />
                    </NavigationLink>
                    <div className={styles.slogan}>
                        <span className={styles.title}>FilmAdvise</span>
                        <span className={styles.hyphen}>—</span>
                        <span className={styles.text}>{t('slogan')}</span>
                    </div>                    
                </div>
                <div className={styles.links}>
                    <Link href={'/about-us'}>{t('about-us')}</Link>
                    <Link href={'/terms-of-use'}>{t('terms-of-use')}</Link>
                    <Link href={'/privacy-policy'}>{t('privacy-policy')}</Link>
                    <Link href={'/cookies-policy'}>{t('cookies-policy')}</Link>
                    <Link href={'/contact-us'}>{t('contact-us')}</Link>
                </div>
            </div>
        </footer>
    );
}
