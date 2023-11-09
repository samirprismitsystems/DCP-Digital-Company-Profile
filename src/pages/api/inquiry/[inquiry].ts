import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { BASE_URI } from '@/services/config';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    await axios.get(`${BASE_URI}api/inquiry/${req.query.inquiry}/${req.query.user}`,{
        headers:{
            token: req.headers.token
        }
    }).then((response) => {
        res.status(200).json(response.data);
    });
}

export default handler;