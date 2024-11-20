import { useState, useEffect } from "react";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import {Buffer} from "buffer"
import bs58 from "bs58"
import nacl from "tweetnacl";

export default function Solana({ seed }) {
  const [c_id, setcid] = useState(0);
  const [keypairs, setKeypairs] = useState([]);
  useEffect(() => {
    setKeypairs([]);
    setcid(0);
  }, [seed]);
  function createWallet() {
    const path = `m/44'/501'/${c_id}'/0'`;
    const derivedseed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedseed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const privateKey = bs58.encode(Buffer.from(keypair.secretKey));
    const publicKey = keypair.publicKey.toBase58();

    setKeypairs([...keypairs, { privateKey, publicKey }]);
    setcid(c_id + 1);
  }

  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg my-5">
  <button
    onClick={createWallet}
    className="bg-red-600 px-4 py-2 rounded-md text-white font-bold shadow-md hover:bg-red-700"
  >
    Add a Solana Wallet
  </button>
  <div className="mt-4 space-y-4">
    {keypairs.map((kp, index) => (
      <div
        key={index}
        className="bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col space-y-2"
      >
        <span className="font-bold text-yellow-400">
          Wallet {index + 1}
        </span>
        <span className="break-words">Public Key: {kp.publicKey}</span>
        <span className="break-words">
          Private Key: {kp.privateKey}
        </span>
      </div>
    ))}
  </div>
</div>

  );
}
