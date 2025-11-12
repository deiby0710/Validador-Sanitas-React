import jwt from 'jsonwebtoken';
import pool from '../../../config/db.js';

export const loginS = async(username, password) => {
    const [rows] = await pool.execute(
        'SELECT username, password, sede FROM usuarios WHERE username = ?',
        [username]
    );
    
    const user = rows[0];
    
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
        user: { username: user.username, sede: user.sede }
    }
}