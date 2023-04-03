import {gql} from '@apollo/client'

export const GET_ME = gql`
query me($userId: ID!) {
    me(userId: $userId) {
      username
      savedBooks {
        bookId
        authors
        description   
        image
        link
        title
      }
    }
  }
`