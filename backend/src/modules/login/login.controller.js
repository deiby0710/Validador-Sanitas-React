import { loginS } from "./login.service.js";

export const login = async(req, res) => {
    const {username, password} = req.body

    if(!username){
        return res.status(404).json({error: "Username es obligatorio."})
    }
    if(!password){
        return res.status(401).json({error: 'Contraseña es obligatoria'})
    }
    try {
        const { token, user } = await loginS(username, password)
        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user
        })
    } catch (error) {
        if (error.message === 'USUARIO_NO_ENCONTRADO') {
            return res.status(404).json({ error: 'Usuario no encontrado'})
        }
        if (error.message === 'PASSWORD_INCORRECTA') {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }
        console.error('Error en el login: ', error)
        res.status(500).json({ error: 'Error en el servidor.'})
    }
}