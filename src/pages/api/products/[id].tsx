import { NextApiRequest, NextApiResponse } from 'next';
import Product from "../../../../models/Product";
import db from "../../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    await db.connect()

    if(req.method === 'GET'){
        const product = await Product.findById(req.query.id)
        return res.status(200).json(product)
    }

    await db.disconnect()
}