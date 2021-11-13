import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFavorites } from '../../hooks/useFavorites';
import { Node } from '../../interfaces/respositoriesResponse'

interface Props {
  repository: Node,
  addFavorite: (respository: Node) => void;
}

export const CardFavorite = ({ repository, addFavorite }: Props) => {

  const { onFavorite } = useFavorites();

  return (
    <div style={{ position: 'relative' }}>

      <FontAwesomeIcon icon={faStar} className={`star star-selected`} onClick={() => onFavorite(repository, () => { addFavorite(repository) })}></FontAwesomeIcon>
      <p>{repository.name}</p>
      <hr></hr>

    </div>
  )
}
