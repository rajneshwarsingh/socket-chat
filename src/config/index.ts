export const config: any = {
    development: {
        port: process.env.PORT,
        url: 'http://localhost:8005',
        db: process.env.DB_URL,
        secret: {
            jwtKey: process.env.JWT_SECRET,
            jwtAlgo: 'HS256'
        },
      },
}