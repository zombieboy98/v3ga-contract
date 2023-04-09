// API to retrieve the ERC-1155 Metadata for the Chronicles COIW Mint Token

import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { METADATA } from './metadata';
import { v3gaNftService } from '../../../services/v3gaNftService';

const imageHost = 'https://v3ga.vercel.app/nft/';

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: '*',

    // Only allow requests with GET, POST and OPTIONS
    //methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run cors
  await cors(req, res);

  try {
    if (typeof req.query.tokenId !== 'string') {
      res.status(400).json({
        error: 'Invalid token Id',
      });
    }

    // Make sure tokenId is within bounds of total metadata length
    const tokenId = parseInt(req.query.tokenId as string);
    if (tokenId < 0 || tokenId > METADATA.length - 1) {
      res.status(400).json({
        error: 'Id exceeds the metadata total',
      });
    }

    // Make sure we don't leak metadata info beyond what is currently minted
    const service = new v3gaNftService('goerli');
    const totalSupply = await service.totalSupply(
      '0x4B9DAc484cc74549062f7eF318a1127D7A746792'
    );
    if (totalSupply <= tokenId) {
      res.status(400).json({
        error: 'This NFT is not yet minted',
      });

      return;
    }

    // Everything is good, let's return the metadata
    res.status(200).json(METADATA[tokenId]);
  } catch (e) {
    res.status(500).json({
      error: 'Something unexpected happend...',
    });
  }
}

const rng = (max: number) => {
  // min and max included
  return Math.floor(Math.random() * max);
};
