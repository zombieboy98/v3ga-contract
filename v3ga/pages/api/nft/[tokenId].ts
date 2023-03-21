// API to retrieve the ERC-1155 Metadata for the Chronicles COIW Mint Token

import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const imageHost = 'https://v3ga.vercel.app/nft/';
const Species = ['Mech', 'Xeno', 'Synths'];
const Region = ['Exa', 'Zetta', 'Yotta'];
const Purity = ['Prime', 'Base'];
const Size = ['2-3 MB', '4-5 MB', '6-7 MB'];
const Motion = [
  'Motion1',
  'Motion2',
  'Motion3',
  'Motion4',
  'Motion5',
  'Motion6',
  'Motion7',
  'Motion8',
  'Motion9',
];

const METADATA = [
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion2' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/3.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion6' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/2.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion3' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/6.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion7' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/0.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion1' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Xeno' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/4.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Exa' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion4' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/1.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '2-3 MB' },
      { trait_type: 'Motion', value: 'Motion8' },
    ],
  },
  {
    image: 'https://v3ga.vercel.app/nft/5.png',
    attributes: [
      { trait_type: 'Species', value: 'Mech' },
      { trait_type: 'Region', value: 'Zetta' },
      { trait_type: 'Purity Idex', value: 'Prime' },
      { trait_type: 'Data Size', value: '4-5 MB' },
      { trait_type: 'Motion', value: 'Motion5' },
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

  // const Meta = [];
  // for (let i = 0; i <= 99; i++) {
  //   const obj = {
  //     image: `${imageHost}${rng(7)}.png`,
  //     attributes: [
  //       { trait_type: 'Species', value: Species[rng(2)] },
  //       { trait_type: 'Region', value: Region[rng(2)] },
  //       { trait_type: 'Purity Idex', value: Purity[rng(1)] },
  //       { trait_type: 'Data Size', value: Size[rng(2)] },
  //       { trait_type: 'Motion', value: Motion[rng(8)] },
  //     ],
  //   };

  //   Meta.push(obj);
  // }
  // res.status(400).json(Meta);

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

const rng = (max: number) => {
  // min and max included
  return Math.floor(Math.random() * max);
};
