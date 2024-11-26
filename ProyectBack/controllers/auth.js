import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken'; //zzzzz

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, 'mi_secreto', { expiresIn: '1h' });
        return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}
