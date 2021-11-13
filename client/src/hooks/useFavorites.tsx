import { Node } from '../interfaces/respositoriesResponse';
import { useRequest } from './useRequest';

export const useFavorites = () => {

    const { postRequest } = useRequest();

    const onFavorite = async (repository: Node, callback: () => void) => {

        const body = {
            name: repository.name,
            id: repository.id,
        }

        callback();
        // addFavorite(repository);
        const req = await postRequest({ url: '/favorites', title: 'Add Favorite', body });

    }


    return (
        {
            onFavorite
        }
    )
}
