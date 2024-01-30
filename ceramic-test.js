import CeramicClient from '@ceramicnetwork/http-client';
const API_URL = 'https://gateway-clay.ceramic.network';
const ceramic = new CeramicClient(API_URL);
import KeyDidResolver from 'key-did-resolver';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { DID } from 'dids';
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic)
};
const did = new DID({ resolver });
ceramic.did = did;
