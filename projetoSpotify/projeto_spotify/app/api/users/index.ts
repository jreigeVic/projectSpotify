import { NextApiRequest, NextApiResponse } from 'next';
// import pool from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // const { rows } = await pool.query('SELECT * FROM users');
            // res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
