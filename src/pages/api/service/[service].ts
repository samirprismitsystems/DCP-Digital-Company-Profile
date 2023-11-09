import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import AuthService from '@/services/AuthServices';
import { BASE_URI } from '@/services/config';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    console.log(req.headers.token);
    console.log(req.query.service);
    await axios.get(`${BASE_URI}api/service/${req.query.service}/${req.query.user}`,{
        headers:{
            token: req.headers.token
        }
    }).then((response) => {
        res.status(200).json(response.data);
    });
}

export default handler;