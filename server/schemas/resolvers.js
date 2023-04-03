const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models')
const {signToken} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, {userId}) => {
            console.log(userId)
            return await User.findOne({_id: userId})
        }
    },

    Mutation: {
        // recieves username, email, and password input from client side and creates new account 
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return {token, user}
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email: email});

            if (!user) {
                throw new AuthenticationError('No user found with this email address!')
            }
            console.log(user)
            const checkPassword = await user.isCorrectPassword(password)
            console.log(checkPassword)
            if (!checkPassword) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, {authors, title, image, link, userId, bookId, description}) => {
            console.log(userId)
            const book = {
                authors: authors,
                title: title,
                image: image,
                link: link,
                bookId: bookId,
                description: description           
            }
            const updateUser = await User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: {savedBooks: book}},
                {
                    new: true,
                    runValidators: true
                }
            )
            console.log(updateUser)
            return updateUser
        },

        removeBook: async (parent, {bookId, userId}) => {
            
            const updateUser = await User.findOneAndUpdate(
                {_id: userId},
                {$pull: {savedBooks: {bookId: bookId}}},
                {new: true}
            )
            console.log(updateUser)
            return updateUser
        },
    }
}

module.exports = resolvers