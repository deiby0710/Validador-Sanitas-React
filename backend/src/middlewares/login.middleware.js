import jwt from 'jsonwebtoken'

export function verifyTokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado.'})
    }
    const token = authHeader.split(' ')[1] // Bearer <token>
    if(!token) {
        return res.status(401).json({ error: 'Formato de token invalido'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Guarda la info del user en el request
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido o expirado.'})
    }
}