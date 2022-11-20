import { ApolloServer } from "@apollo/server";
import Schema from "./Schema";
import {Resolvers} from "./Resolvers";
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import * as dotenv from 'dotenv';
import * as mongoose from "mongoose";

dotenv.config()

interface MyContext {
    token?: String
}

const runServer = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<MyContext>({
        typeDefs: Schema,
        resolvers: Resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    }) as any;
    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token })
        })
    )
    await new Promise<void>((resolve => httpServer.listen({ port: 4000 }, resolve)));
    console.log('server started')
}

mongoose.connect(process.env.MONGO!)
    .then(() => {
        console.log('mongo connected');
        runServer();
    })
    .catch(err => console.log(err))

