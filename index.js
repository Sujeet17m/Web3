// const { log } = require('console');
// const crypto = require('crypto');

// const input ="100xdevs";
// const hash = crypto.createHash('sha256').update(input).digest('hex');

// console.log(hash);

// const crypto = require('crypto');

// //function to find an input string that produces a hash start
// function findHashWithPrefix(prefix){
//     let input = 0;
//     while(true){
//         let inputStr = input.toString();
//         let hash = crypto.createHash('sha256').update(inputStr)
//         if (hash.startsWith(prefix)){
//             return { input: inputStr , hash: hash};
//         }
//         input++;

    
//     }
// }

// //find and print the input string and hash
// const result = findHashWithPrefix('00000');
// console.log(`Input : ${result.input}`);
// console.log(`Hash: ${result.hash}`);

// const crypto = require('crypto');

// // Function to find an input string that produces a hash starting with the prefix
// function findHashWithPrefix(prefix) {
//     let input = 0;
//     while (true) {
//         let inputStr = "100xdevs" + input.toString();
//         // Generate SHA-256 hash and convert to hex string
//         let hash = crypto.createHash('sha256').update(inputStr).digest('hex');
//         if (hash.startsWith(prefix)) {
//             return { input: inputStr, hash: hash };
//         }
//         input++;
//     }
// }

// // Find and print the input string and hash
// const result = findHashWithPrefix('0000');
// console.log(`Input: ${result.input}`);
// console.log(`Hash: ${result.hash}`);

const bytes = [202,256,1,23]
//console.log(bytes);

//A better way to represent an array of bytes is to use a UInt8Array in JS
let byte = new Uint8Array([0,256,127,128]);
//console.log(byte);

let uint8Arr = new Uint8Array([1, 255, 127, 128]);
uint8Arr[0] = 300;
console.log(uint8Arr);




