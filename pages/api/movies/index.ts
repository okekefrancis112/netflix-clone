import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../../lib/serverAuth";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        // await serverAuth(req);
        await serverAuth(req, res);
        const movies = await prismadb.movie.findMany();

        return res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}