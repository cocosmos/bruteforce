/**
 * @author Mipam Guillot
 * @name TP_BruteForce
 */

const express = require("express");
const app = express();
const port = 8080;

/*****Variables*****/
const password = "cnFrbg==";
const alphabet = "abcdefghijklmnopqrstuvwxyz ";
const size = alphabet.length;
const max = 4;
let start = new Date();
let finish = new Date();
let time = 0;
let method = "";
let guess = "";
let guess_crypted = "";

/*****Hash Algorythm*****/
const calculateHash = (str) => {
  let hash = str
    .split("")
    .map((c, i) => str.charCodeAt(i))
    .map((c) => c + 2)
    .map((c) => String.fromCharCode(c))
    .join("");

  return Buffer.from(hash).toString("base64");
};

/*****Call the bruteforces function *****/
random_method();
loop_method();

/******Bruteforce password method 1*****/
function random_method() {
  start = new Date();
  method = "Random";
  while (guess_crypted !== password) {
    guess = "";
    for (let i = 0; i < max; i++) {
      guess += alphabet[Math.floor(Math.random() * size)];
      guess_crypted = calculateHash(guess);
    }
    display();
  }
}

/******Bruteforce password method 2******/
//It will sequentially test all possibilities for 4 letters
function loop_method() {
  start = new Date();
  method = "Multiple loop";
  for (let letter in alphabet) {
    for (let letter2 in alphabet) {
      for (let letter3 in alphabet) {
        for (let letter4 in alphabet) {
          guess =
            alphabet[letter] +
            alphabet[letter2] +
            alphabet[letter3] +
            alphabet[letter4];
          guess_crypted = calculateHash(guess);
          display();
        }
      }
    }
  }
}

/*****Function to display the solution*****/
function display() {
  if (guess_crypted === password) {
    /*Calculate the time to perform the calculation*/
    finish = new Date();
    time = finish - start;

    console.log(
      `The encrypted password: "${guess_crypted}" was decrypted to: "${guess}" with the "${method}" method and it took: ${time} ms to perform. \n`
    );
    //break; /*For the While loop*/
  } else {
    // console.log("Password crypted: " + guess_crypted);
    // console.log("Password decrypted: " + guess + "\n");
  }
}

app.listen(port);
