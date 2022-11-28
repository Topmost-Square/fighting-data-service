import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import {Request, Response} from "express";

export interface MyContext {
    res: Response,
    req: Request,
    token?: {
        id: string
    }
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    try {
        const bearer = context.req.headers['authorization'];
        const token  = bearer!.split(' ')[1];
        if (!token) throw new Error('Not authenticated');

        const tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        if (!tokenPayload) throw new Error('Not authenticated');

        context.token = tokenPayload as any;
    } catch (e) {
        throw new Error('Not authenticated');
    }
    return next();
}
