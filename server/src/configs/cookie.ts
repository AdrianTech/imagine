export const cookieConfig = {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    domain: 'http://localhost:8080',
    sameSite: 'strict' as const,
}