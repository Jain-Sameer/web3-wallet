import { useState } from "react";
import generateMnemonics from "./utils/generateSeed";
import "./App.css";
import Solana from "./Component/Solana";
import Ethereum from "./Component/Eth";

function App() {
  const [mnemonic, setMnenomic] = useState("");
  const [seed, setSeedfromMnenomic] = useState();

  async function setSeed() {
    const { mnemonic: phrase, seed } = await generateMnemonics();
    setMnenomic(phrase);
    setSeedfromMnenomic(seed);
  }
  return (
    <div className="bg-gray-900 text-white min-h-screen  flex flex-col items-center p-8">
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex flex-col text-center">
          <div className="text-lg font-bold flex flex-col justify-between">
            <span className="mb-2">Your wallet seed phrase is: </span>
            <span
              className="bg-gray-700 text-yellow-400 px-2 py-1 rounded mb-3"
              
            >
              {mnemonic || "Not generated yet"}
            </span>
          </div>
          <div className="flex flex-col"> 
            <button
              onClick={setSeed}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold shadow-md hover:bg-blue-600"
            >
              Generate Seed Phrase
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(mnemonic);
                alert("Copied to clipboard!");
              }}
              className="bg-blue-500 px-4 py-2 mt-2 rounded-lg text-white font-bold shadow-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-8 w-full max-w-3xl">
        <Solana seed={seed} />
        <Ethereum seed={seed} />
      </div>
    </div>
  );
}

export default App;
