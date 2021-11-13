import { Badge, Card, Col } from 'react-bootstrap';
import { Node } from '../interfaces/respositoriesResponse';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../hooks/useFavorites';
interface Props {
  repository: Node;
  isFavorite: (id: string) => boolean;
  addFavorite: (respository: Node) => void;
}

export const CardRepository = ({ repository, isFavorite, addFavorite }: Props) => {

  const { onFavorite } = useFavorites();


  return (
    <Col sm={6}>
      <Card className="m-2 card-repo">
        <Card.Body>
          <h5>{repository.name}</h5>
          <FontAwesomeIcon icon={faStar} className={`star ${isFavorite(repository.id) ? 'star-selected' : ''}`} onClick={() => onFavorite(repository, () => { addFavorite(repository) })}></FontAwesomeIcon>
          <Badge className="float-right">{repository.isPrivate ? 'Private' : 'Public'}</Badge>
          <p><span style={{ fontWeight: 'bold' }}>Owner:</span> {repository.owner.login}</p>
          <p className="text-muted">{moment(repository.updatedAt).fromNow()}</p>
        </Card.Body>
      </Card>
    </Col>
  )
}
