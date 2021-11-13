import gql from 'graphql-tag';


export const GET_REPOSITORIES = gql`
query repoQuery($after: String) {
  viewer {
    avatarUrl
    login
    repositories(first: 6, after: $after) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        name
        description
        createdAt
        updatedAt
        isPrivate
        owner {
          login
        }
      }
    }
  }
}
`;

export const FIND_REPOSITORY = gql`
query repoQuery($name: String) { 
  viewer { 
    repository(name:$name){
       id
        name
        description
        createdAt
        updatedAt
        isPrivate
        owner {
          login
        }
    }
  }
}
`
