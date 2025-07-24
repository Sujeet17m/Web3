import { generateMnemonic , validateMnemonic} from "bip39"

const words =generateMnemonic(128);//generate 12 different words
const word =generateMnemonic(256);//generate __ different words

console.log(words);
