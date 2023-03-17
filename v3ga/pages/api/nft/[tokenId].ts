// API to retrieve the ERC-1155 Metadata for the Chronicles COIW Mint Token

import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const imageHost = 'https://static.shinji.xyz/coiw/nft-images/';
const METADATA = [
  {
    image: `${imageHost}1.png`,
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Some Stuff' },
    ],
  },
  {
    image: `${imageHost}2.png`,
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Base' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Some Stuff' },
    ],
  },
  {
    image: `${imageHost}3.png`,
    attributes: [
      { trait_type: 'Species', value: 'Synths' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Base' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Some Stuff' },
    ],
  },
  {
    image: `${imageHost}4.png`,
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Yotta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Some Stuff' },
    ],
  },
  {
    image: `${imageHost}5.png`,
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Base' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'None' },
    ],
  },
];

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

    // req.query.tokenId is NOT in hex.  It is base 10 (decimal)
    const tokenId = parseInt(req.query.tokenId as string);

    if (tokenId < 0 || tokenId > METADATA.length - 1) {
      res.status(400).json({
        error: 'Id exceeds the metadata total',
      });
    }

    res.status(200).json(METADATA[tokenId]);
  } catch (e) {
    res.status(500).json({
      error: 'Something unexpected happend...',
    });
  }
}
