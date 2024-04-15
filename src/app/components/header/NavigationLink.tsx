'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ComponentProps } from 'react';
import { Link } from '@/navigation';
import { AppPathnames } from '@/config';
import styles from './styles/header.module.scss';

export default function NavigationLink<Pathname extends AppPathnames>({
    href,
    className,
    ...rest
}: ComponentProps<typeof Link<Pathname>>) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const isActive = pathname === href;
    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
                className,
                isActive ? styles.active : ''
            )}
            href={href}
            {...rest}
        />
    );
}
