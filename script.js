function clearing() {
  // Clear all input and output fields
  document.getElementById("dataInput").value = "";
  document.getElementById("hammingCodeOutput").innerText = "";
  document.getElementById("correctionOutput").innerText = "";
  document.getElementById("errorInput").value = "";
  document.getElementById("errorOutput").innerText = "";
}

function calculateHammingCode() {
  const data = document.getElementById("dataInput").value;
  
  // Validate the input data
  if (!validateInput(data)) {
    document.getElementById("hammingCodeOutput").innerText = "Invalid input. Please enter 4, 8, or 16 bits.";
    return;
  }
  
  // Generate the Hamming code
  const hammingCode = generateHammingCode(data);
  document.getElementById("hammingCodeOutput").innerText = hammingCode.join("");
}

const parityBits = [];

let errorDetected = false;

function generateHammingCode(data) {
  parityBits.length = 0; // Clear the parity bits array
  
  // Convert the input data to an array of bits and reverse it
  const dataBits = data.split("").map(Number).reverse();
  const numDataBits = dataBits.length;
  
  // Calculate the number of parity bits required
  const numParityBits = Math.ceil(Math.log2(numDataBits + Math.ceil(Math.log2(numDataBits)) + 1));
  
  // Initialize the Hamming code array with zeros
  const hammingCode = Array(numDataBits + numParityBits).fill(0);

  // Place the data bits into the Hamming code array, skipping parity bit positions
  for (let i = 0, dataIndex = 0; i < hammingCode.length; i++) {
    if (Math.pow(2, dataIndex) - 1 === i) {
      dataIndex++;
    } else {
      hammingCode[i] = dataBits.shift();
    }
  }

  // Calculate parity bits and place them in their respective positions
  for (let i = 0; i < numParityBits; i++) {
    const parityPosition = Math.pow(2, i) - 1;
    let parityValue = 0;

    for (let j = parityPosition; j < hammingCode.length; j += 2 * (parityPosition + 1)) {
      for (let k = j; k < j + parityPosition + 1 && k < hammingCode.length; k++) {
        parityValue ^= hammingCode[k];
      }
    }

    parityBits.push(parityValue);
    hammingCode[parityPosition] = parityValue;
  }
  
  // Reverse the Hamming code and parity bits to their original order
  hammingCode.reverse();
  parityBits.reverse();

  return hammingCode;
}

let errorPosition;

function introduceError() {
  errorDetected = false;
  errorPosition = 0;
  let bitPosition = 1;
  
  const errorInput = document.getElementById("errorInput").value;
  const hammingCode = document.getElementById("hammingCodeOutput").innerText;
  let parityPositions = [];

  // Check if the length of the error input matches the Hamming code length
  if (errorInput.length !== hammingCode.length) {
    document.getElementById("errorOutput").innerText = "Invalid hamming code";
    return;
  }

  // Calculate parity bit positions
  for (let i = 0; i < Math.ceil(Math.log2(hammingCode.length)); i++) {
    parityPositions.push(Math.pow(2, i));
  }

  // Detect if there is an error by comparing Hamming code and error input
  for (let i = 0; i < hammingCode.length; i++) {
    if (hammingCode[i] !== errorInput[i]) {
      if (!errorDetected) {
        errorDetected = true;
      } else {
        document.getElementById("errorOutput").innerText = "More than one error was encountered";
        return;
      }
    }
  }

  const parityBitsStr = parityBits.join("");
  const parityBitsDecimal = parseInt(parityBitsStr, 2);

  if (errorDetected) {
    // Determine the error position
    for (let i = errorInput.length - 1; i >= 0; i--, bitPosition++) {
      if (errorInput[i] === "1") {
        if (!parityPositions.includes(bitPosition)) {
          errorPosition ^= bitPosition;
        }
      }
    }
    errorPosition ^= parityBitsDecimal;
  }

  // Check if parity bits are altered
  for (let i = 0; i < Math.ceil(Math.log2(hammingCode.length)); i++) {
    if (hammingCode[hammingCode.length - Math.pow(2, i)] != errorInput[hammingCode.length - Math.pow(2, i)]) {
      document.getElementById("errorOutput").innerText = "Don't change the check bits!";
      return;
    }
  }

  if (errorPosition) {
    document.getElementById("errorOutput").innerText = "The error bit number is: " + errorPosition;
  } else {
    document.getElementById("errorOutput").innerText = "No error was introduced";
  }
}

function correctError() {
  const erroredCode = document.getElementById("errorInput").value;

  if (!errorDetected) {
    document.getElementById("correctionOutput").innerText = "No error introduced.";
    return;
  }

  const correctedCode = correctHammingCode(erroredCode.split(""));
  document.getElementById("correctionOutput").innerText = correctedCode;
}

function validateInput(data) {
  return /^[01]{4}$|^[01]{8}$|^[01]{16}$/.test(data);
}

function correctHammingCode(code) {
  code[code.length - errorPosition] = code[code.length - errorPosition] === "1" ? "0" : "1";
  return code.join("");
}
