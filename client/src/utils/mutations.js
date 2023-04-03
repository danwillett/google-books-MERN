import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username, password: $password, email: $email) {
          token
            
        }
      }
`;

export const SAVE_BOOK = gql`
mutation saveBook($authors: [String]!, $bookId: String!, $description: String!, $title: String!, $image: String!, $link: String!, $userId: ID!) {
    saveBook(authors: $authors, bookId: $bookId, description: $description, title: $title, image: $image, link: $link, userId: $userId) {
      savedBooks {
        title
        authors
        bookId
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!, $userId: ID!) {
        removeBook(bookId: $bookId, userId: $userId) {
            savedBooks {
                title
                authors
                bookId
                description
                image
                link
              }
        }
    }
`