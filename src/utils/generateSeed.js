import { generateMnemonic , mnemonicToSeedSync} from "bip39";

const generateMnemonics = async () => {
    const mnemonic = generateMnemonic();
    const seed = await mnemonicToSeedSync(mnemonic)
    return {
        mnemonic,
        seed
    }
}
export default generateMnemonics