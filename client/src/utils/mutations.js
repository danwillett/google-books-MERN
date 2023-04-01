import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            User {
                _id
                username
                
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($email: String!, $password: String!, $username: String!) {
        addUser(email: $email, password: $password, username: $username) {
            token
            User {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($author: [String]!, $description: String, $title: String!, $image: String!, $link: String!) {
        saveBook(author: $author, description: $description, title: $title, image: $image, link: $link) {
            User {
                _id
                username
                savedBooks
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            User {
                _id
                username
                savedBooks
            }
        }
    }
`