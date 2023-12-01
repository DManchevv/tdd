const config = {
    nodePort: 3000,
    host: 'localhost',
    http: {
        OK: 200,
        CREATED: 201,
        CLIENT_ERR: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        SERVER_ERR: 500,
        NETWORK_AUTHENTICATION_REQUIRED: 511
    },
    session: {
        name: 'connectDev',
        secret: 'Z15fBRMPCO5SS^',
        saveUninitialized: true,
        resave: false,
        maxAge: 1000 * 60 * 60 * 3
    },
    crypto: {
        saltLength: 20,
        digest: 'sha256',
        keyBytes: 32,
        ivBytes: 16,
        iterations: 10000,
        keylength: 64
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        user: 'mitkoeshop@gmail.com',
        pass: 'redgtpchnjosjekv'
    },
    redis: {
        port: 6379,
        host: "127.0.0.1",
        rateLimit: {
            EX: 15 * 60,
            windowMS: 1 * 60 * 1000,
            maxRequestsPerIP: 6
        }
    },
    page_limit: 50
}

module.exports = config;