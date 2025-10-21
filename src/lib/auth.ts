import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
    throw new Error('JWT_SECRET is not set in environment variables. Please add it to your .env.local file.');
}
const key = new TextEncoder().encode(secretKey);

export async function signJwt(payload: { email: string; expires: Date }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h') // Session expires in 1 hour
        .sign(key);
}

export async function verifyJwt<T>(token: string): Promise<T | null> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ['HS256'],
        });
        return payload as T;
    } catch {
        // Token is invalid or expired
        return null;
    }
}