import { sign } from 'jsonwebtoken'

export interface UserType {
    _id: String
}

export const generateAccessToken = (user: UserType) => {
    return sign({
        id: user._id
    }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15m'
    });
}
