import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import styles from './styles/actors.module.scss';
import { IActors } from '@/app/models/IActors';

type Props = {
    actors: IActors[];
};

export default function ActorsList({ actors }: Props) {
    const t = useTranslations('Components.directors');

    return (
        <div className={styles.main}>
            {actors.map((actor) => (
                <div key={actor.id} className={styles.item}>
                    <Link
                        href={{
                            pathname: '/actors/[idname]',
                            params: { idname: actor.url }
                        }}
                    >
                        <div className={styles.item__photo}>
                            
                        </div>
                        <div className={styles.item__info}>
                            <div className={styles.item__info_name}>{actor.name}</div>
                            <div className={styles.item__info_details}>
                                <span>{t('films')}: {actor.count}</span>
                                <span>{t('rating')}: {actor.rating}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
