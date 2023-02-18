import {MyContext} from "../utils/isAuth";
import {UserInputError} from "apollo-server";

const Fight = require('../../mongo/Fight');

module.exports = {
    Query: {
        getFightingData: async (_: any, args: any) => {
            return false;
        }

        //todo: get fighting data by user id...
    },
    Mutation: {

        setFightingData: async (_: any, args: any, context: MyContext) => {
            console.log(args, 'args')
            console.log(context.token, 'context token')

            if (!context.token) {
                throw new UserInputError('Not Authenticated', {
                    errorContent: {
                        auth: 'Not Authenticated'
                    }
                });
            }

            if (!args.data) {
                throw new UserInputError('No data', {
                    errorContent: {
                        data: 'No data'
                    }
                });
            }

            const newFight = new Fight({
                data: args.data,
                user: context.token.id,
                type: 'ai', //todo: once we have online mode change it
                date: Date.now()
            });

            const newFightResponse = await newFight.save();

            if (newFightResponse) {
                return { data: true };
            }

            return { data: false }

        }
    }
};
