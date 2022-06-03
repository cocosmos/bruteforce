/**
 * @author Mipam Guillot
 * @name TP_BruteForce
 */

/*****Variables*****/
const password = "cnFrbg==";
const alphabet = "abcdefghijklmnopqrstuvwxyz ";
const size = alphabet.length;
const max = 4;
let start = new Date();
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

/******Bruteforce password method 1******/
//It will sequentially test all possibilities for 4 letters
const forin_method = () => {
  start = new Date();
  const bruteforce = (g, num) => {
    method = "For In";
    if (num <= max) {
      for (letter in alphabet) {
        guess = g + alphabet[letter];
        guess_crypted = calculateHash(guess);
        bruteforce(guess, num + 1);
        display();
      }
    }
  };
  bruteforce("", 1);
};

/******Bruteforce password method 2*****/
//It will randomly test all possibilities for 4 letters
const random_method = () => {
  start = new Date();
  method = "Random";
  while (guess_crypted !== password) {
    guess = "";
    for (let i = 0; i < max; i++) {
      guess += alphabet[Math.floor(Math.random() * size)];
      guess_crypted = calculateHash(guess);
    }
    display();
    if (guess_crypted === password) {
      break;
    }
  }
};

/*****Function to display the solution*****/
function display() {
  if (guess_crypted === password) {
    /*Calculate the time to perform the calculation*/
    let finish = new Date();
    time = finish - start;

    console.log(
      `The encrypted password: "${guess_crypted}" was decrypted to: "${guess}" with the "${method}" method and it took: ${time} ms to perform. \n`
    );
  } else {
    /*It can take a lot of time to show all possibilities with the random method*/
    //console.log("Password crypted: " + guess_crypted);
    //console.log("Password decrypted: " + guess + "\n");
  }
}

/*****Call the bruteforces function *****/
forin_method();
random_method();
