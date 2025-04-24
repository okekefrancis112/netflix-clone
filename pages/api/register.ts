import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;

        // Validate input
        if (!email || !name || !password) {
            return res.status(400).json({ message: 'Email, name, and password are required' });
        }

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(422).json({ error: 'Email taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        // return res.status(400).end();
        return res.status(400).json({ error: "Registration failed" });
    }
}