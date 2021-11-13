import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import queryString from 'querystring';
import { useGetUserInformation } from '../../hooks/useGetUserInformation';
import { Loader } from '../../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GET_REPOSITORIES } from '../../GraphqlQueries';
import { useQuery } from '@apollo/client';
import { Node, RepositoriesResponse } from '../../interfaces/respositoriesResponse';
import { CardRepository } from '../../components/CardRepository';
import { Button, Col, Container, Row, InputGroup } from 'react-bootstrap';
import { Favorites } from '../../components/Favorites/index';
import { Profile } from '../../components/Profile';
import { Error } from '../../components/Error';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Repositories = () => {

  const { loading: load, error, data, fetchMore } = useQuery<RepositoriesResponse>(GET_REPOSITORIES, {
    variables: { after: null },
  });
  const [repositories, setRepositories] = useState<Node[]>([])
  const [originalRepositories, setOriginalRepositories] = useState<Node[]>([])
  const [favorites, setFavorites] = useState<Node[]>([])
  const [find, setFind] = useState<string>("")
  const location = useLocation();
  const {
    loading,
    setLoading,
    getAccessGit,
    profileStatus,
    setProfileStatus
  } = useGetUserInformation();

  const user = useSelector((store: RootState) => {
    return store.auth;
  });


  useEffect(() => {
    const data = queryString.parse(location.search.substr(1));

    if (!user["user"]["access_token_git"]) {
      getAccessGit(data.code?.toString());
    } else {
      setLoading(false);
      setProfileStatus(true);
    }
  }, [])

  useEffect(() => {
    if (data) {
      setRepositories(data.viewer.repositories.nodes);
      setOriginalRepositories(data.viewer.repositories.nodes);
    }
  }, [data])

  const nextPage = () => {
    fetchMore({
      variables: { after: data?.viewer.repositories.pageInfo.endCursor },
      updateQuery: (prevResult: RepositoriesResponse, { fetchMoreResult }: any) => {
        fetchMoreResult.viewer.repositories.nodes = [
          ...prevResult.viewer.repositories.nodes,
          ...fetchMoreResult.viewer.repositories.nodes,
        ];
        return fetchMoreResult;
      },
    });
  }



  if (loading) {
    return <Loader></Loader>;
  }




  const findRepo = () => {

    let reposTemp = Object.assign(originalRepositories, {});

    reposTemp = reposTemp.filter(item => item.name.toUpperCase().includes(find.toUpperCase()))
    setRepositories(reposTemp);
  }

  const isFavorite = (id: string) => {

    const item = favorites.find(x => x.id === id);
    return !!item;
  }

  const addFavorite = (repo: Node) => {

    let favoritesTemp = Object.assign(favorites, {});
    if (isFavorite(repo.id)) {
      favoritesTemp = favoritesTemp.filter(item => item.id !== repo.id);
    } else {
      favoritesTemp = [...favoritesTemp, repo];
    }
    setFavorites(favoritesTemp);
  }


  if (!profileStatus) {
    return (
      <Error message={"Error in GITHUB authentication"} />
    )
  }



  if (load) return <Loader />


  if (error) return <Error />;


  return (
    <Container className="mt-4">
      <Row>

        <Col md="3">
          <Profile username={data?.viewer.login || ''} avatarUrl={data?.viewer.avatarUrl || ''} />
          <Favorites favorites={favorites} setFavorites={setFavorites} addFavorite={addFavorite} />
        </Col>
        <Col md="9">
          <Row>
            <InputGroup className="mb-3">
              <input
                className="form-control"
                placeholder="Search a repository"
                aria-describedby="basic-addon2"
                onChange={(e) => setFind(e.target.value)}
                onKeyPress={findRepo}
              />

              <Button onClick={findRepo}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </Button>

            </InputGroup>
          </Row>
          <Row>
            {
              repositories.map((item, idx) => (
                <CardRepository key={idx} repository={item} isFavorite={isFavorite}
                  addFavorite={addFavorite} />
              ))
            }

            {
              (data?.viewer.repositories.pageInfo.hasNextPage) && (

                <Button onClick={nextPage} className="m-2">Load More</Button>
              )
            }
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
