import jwt from 'jsonwebtoken';
import fs from "fs";

export const loginS = async(username, password) => {
    const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));
    
    const user = users.find(u => u.username === username)
    if(!user){
        throw new Error('USUARIO_NO_ENCONTRADO')
    }
    if(password !== user.password){
        throw new Error('PASSWORD_INCORRECTA')
    }
    const token = jwt.sign(
        { username: user.username, sede: user.sede },
        process.env.JWT_SECRET,
        { expiresIn: '8h'}
    )

    return {
        token,
        admin: { username: user.username, sede: user.sede }
    }
}