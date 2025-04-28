import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../../lib/serverAuth";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // await serverAuth(req);
    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== "string") {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return res.status(404).end();
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}