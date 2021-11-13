import React, { useEffect, useState } from 'react'
import { useRequest } from '../../hooks/useRequest';
import { Node } from '../../interfaces/respositoriesResponse';
import { Loader } from '../Loader';

import { CardFavorite } from './CardFavorite'

interface Props {
    favorites: Node[];
    setFavorites: React.Dispatch<React.SetStateAction<Node[]>>;
    addFavorite: (respository: Node) => void;
}

export const Favorites = ({ favorites, setFavorites, addFavorite}: Props) => {


    const [loading, setLoading] = useState(true);
    const { getRequest } = useRequest();

    useEffect(() => {
        getFavorites();
    }, [])


    const getFavorites = async () => {
        const req = await getRequest<Node[]>({ url: '/favorites', title: 'My favotires' });

        if (req.data) {
            setFavorites(req.data);

        }
        setLoading(false);
    }

    return (
        <div className="mt-5">
            <h6 className="mb-3">My favorite repos</h6>

            {loading && (
                <Loader />
            )}

            {favorites.map((item) => (
                <CardFavorite repository={item} key={item.id} addFavorite={addFavorite}></CardFavorite>
            ))}
        </div>
    )
}
