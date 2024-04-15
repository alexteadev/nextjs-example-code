'use client'

import Link from 'next/link';

import styles from '@/styles/not-found-in.module.scss';

export default function Error({
    error,
    reset
}: { error: Error, reset: () => void }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.error__info}>
                    <div className={styles.error__code}>404</div>
                    <div className={styles.error__message}>This page could not be found.</div>
                </div>
                <div>
                    <Link href='/' className={styles.error__link}>Go to main page</Link>
                </div>
            </div>
        </div>
    );
}