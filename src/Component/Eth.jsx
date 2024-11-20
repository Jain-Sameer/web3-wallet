import { Wallet, HDNodeWallet } from "ethers";
import { useEffect, useState } from "react";

export default function Ethereum({ seed }) {
  const [c_id, setCid] = useState(0);
  const [keypairs, setKeypairs] = useState([]);

  useEffect(() => {
    setKeypairs([]);
    setCid(0);
  }, [seed]);

  function addWallet() {
    const derivationPath = `m/44'/60'/${c_id}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    setKeypairs([...keypairs, { privateKey, publicKey: wallet.address }]);
    setCid(c_id + 1);
  }

  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg my-5">
      <button
        onClick={addWallet}
        className="bg-blue-600 px-4 py-2 rounded-md text-white font-bold shadow-md hover:bg-blue-700"
      >
        Add an Ethereum Wallet
      </button>
      <div className="mt-4 space-y-4">
        {keypairs.map((kp, index) => (
          <div
            key={index}
            className="bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col space-y-2"
          >
            <span className="font-bold text-green-400">Wallet {index + 1}</span>
            <span>Public Key: {kp.publicKey}</span>
            <span>Private Key: {kp.privateKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
