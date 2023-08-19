import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import data from '../../../utils/data';
import db from '../../../utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.status(200).json({ msg: 'seeded successfully' });
};

export default handler;