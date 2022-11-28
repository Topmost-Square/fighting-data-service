import {compare, hash} from "bcryptjs";
import {generateAccessToken} from "../utils/token";
const { UserInputError } = require('apollo-server')
const { validateRegister, validateLogin } = require('../utils/validate')

const User = require('../../mongo/User');

type RegisterInput = {
    email: string,
    password: string,
    confirmPassword: string
}

type LoginInput = {
    email: string,
    password: string,
}

module.exports = {
    Query: {
        getAllUsers: async (_: any, args: any) => {
            return await User.find();
        }
    },
    Mutation: {
         register: async (_: any, { email, password, confirmPassword }: RegisterInput ) => {
            const validatedInput = validateRegister(email, password, confirmPassword);

            for (let errorKey in validatedInput) {
                if (validatedInput[errorKey].length) {
                    throw new UserInputError('User Input Error', {
                        errorContent: {
                            [errorKey]: validatedInput[errorKey]
                        }
                    })
                }
            }

            const user = await User.findOne({ email });

            if (user) {
                throw new UserInputError('User Input Error', {
                    errorContent: {
                        email: 'This email is already used'
                    }
                })
            }

            password = await hash(password, 12);

            const newUser = new User({
                email,
                password
            });

            const userResponse = await newUser.save();

            const token = generateAccessToken(userResponse);

            return {
                ...userResponse._doc,
                id: userResponse._id,
                token
            }
        },
        async login (_: any, { email, password }: LoginInput) {

            const validatedInput = validateLogin(email, password);

            for (let errorKey in validatedInput) {
                if (validatedInput[errorKey].length) {
                    throw new UserInputError('User Input Error', {
                        errorContent: {
                            [errorKey]: validatedInput[errorKey]
                        }
                    })
                }
            }

            const user = await User.findOne({ email });

            if (!user) {
                throw new UserInputError('User not found', {
                    errorContent: {
                        email: 'Email or password is wrong'
                    }
                });
            }

            const passwordMatch = await compare(password, user.password);

            if (!passwordMatch) {
                throw new UserInputError('Wrong credentials', {
                    errorContent: {
                        email: 'Email or password is wrong'
                    }
                });
            }

            const token = generateAccessToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
    }
};
