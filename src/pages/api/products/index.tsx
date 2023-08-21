import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await db.connect();
    switch (req.method) {
        case 'GET': {
            if (req.query.featured) {
                const featuredProducts = await Product.find({ isFeatured: true });
                return res.status(200).json(featuredProducts);
            } else if (req.query.cat) {
                const catProducts = await Product.find({ category: req.query.cat });
                return res.status(200).json(catProducts);
            } else if (req.query.sec) {
                const secProducts = await Product.find({ section: req.query.sec });
                return res.status(200).json(secProducts);
            } else {
                const products = await Product.find({});
                return res.status(200).json(products);
            }
        }
        case 'POST': {
            const product = await Product.create({ ...req.body });
            return res.status(200).json(product);
        }

    };
}

export default handler;