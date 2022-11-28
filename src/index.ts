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
            origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
            credentials: true,
        },
        context( { req, res} : MyContext ) {
            return ({req, res});
        }
    });

    await server.listen(4000, () => {
        console.log('server started')
    });
}

mongoose.connect(process.env.MONGO!)
    .then(() => {
        console.log('mongo connected');
        runServer();
    })
    .catch(err => console.log(err))
