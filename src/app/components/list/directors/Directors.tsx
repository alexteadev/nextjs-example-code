import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import styles from './styles/directors.module.scss';
import { IDirectors } from '@/app/models/IDirectors';

type Props = {
    directors: IDirectors[];
};

export default function DirectorsList({ directors }: Props) {
    const t = useTranslations('Components.directors');

    return (
        <div className={styles.main}>
            {directors.map((director) => (
                <div key={director.id} className={styles.item}>
                    <Link
                        href={{
                            pathname: '/directors/[idname]',
                            params: { idname: director.url }
                        }}
                    >
                        <div className={styles.item__info}>
                            <div className={styles.item__info_name}>{director.name}</div>
                            <div className={styles.item__info_details}>
                                <span>{t('films')}: {director.count}</span>
                                <span>{t('rating')}: {director.rating}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
