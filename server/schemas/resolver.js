const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models')
const {signToken} = require('../utils')

const resolvers = {
    Query: {
        user: async (parent, {userId}) => {
            return await User.findOne({_id: userId})
        }
    },

    Mutation: {
        // recieves username, email, and password input from client side and creates new account 
        addUser: async (parent, {username, email, password}) => {
            return await User.create({username, email, password})
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email: email});

            if (!user) {
                throw new AuthenticationError('No user found with this email address!')
            }

            const checkPassword = user.isCorrectPassword(password)

            if (!checkPassword) {
                throw new AuthenticationError('Incorrect password!');
            }

            // const token = signToken(profile);
            return profile //{ token, profile };
        },

        saveBook: async (parent, {book, userId}) => {
            const updateUser = await User.findOneAndUpdate(
                {_id: userId},
                {$addToSet: {books: book}},
                {
                    new: true,
                    runValidators: true
                }
            )
        },

        removeBook: async (parent, {book, userId}) => {
            const updateUser = await User.findOneAndUpdate(
                {_id: userId},
                {$pull: {books: book}},
                {new: true}
            )
        },
    }
}

module.exports = resolvers