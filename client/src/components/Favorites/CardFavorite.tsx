import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from 'react-bootstrap';
import { useFavorites } from '../../hooks/useFavorites';
import { Node } from '../../interfaces/respositoriesResponse'

interface Props {
  repository: Node,
  addFavorite: (respository: Node) => void;
}

export const CardFavorite = ({ repository, addFavorite }: Props) => {

  const { onFavorite } = useFavorites();

  return (
    <Card className="m-2 card-repo">
      <Card.Body >

        <FontAwesomeIcon icon={faStar} className={`star star-selected`} onClick={() => onFavorite(repository, () => { addFavorite(repository) })}></FontAwesomeIcon>
        <p>{repository.name}</p>

        </Card.Body>
      </Card>
  )
}
