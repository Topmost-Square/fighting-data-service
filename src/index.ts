import {verify} from "jsonwebtoken";

const {ApolloServer} = require('apollo-server')
import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";
import "reflect-metadata";
const resolvers = require("./resolvers");
const typeDefs = require('./typeDefs')
import {MyContext} from "./utils/isAuth";

dotenv.config();

const runServer = async () => {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        cors: {
            origin: [process.env.FRONT_URL, 'https://studio.apollographql.com'],
            credentials: true,
        },
        context( { req, res} : MyContext ) {
            let token = null;

            const bearer = req.headers.authorization || null;

            if (bearer) {
                token  = bearer!.split(' ')[1];

                if (!token) throw new Error('Not authenticated');

                const tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
                if (!tokenPayload) throw new Error('Not authenticated');

                token = tokenPayload as any;
            }

            return { token };
        }
    });

    await server.listen(process.env.PORT, () => {
        console.log(`server started port ${process.env.PORT}`)
    });
}

mongoose.connect(process.env.MONGO!)
    .then(() => {
        console.log('mongo connected');
        runServer();
    })
    .catch(err => console.log(err))
