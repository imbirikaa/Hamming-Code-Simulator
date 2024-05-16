function calculateHammingCode() {
  const data = document.getElementById("dataInput").value;
  if (!validateInput(data)) {
    alert("Invalid input. Please enter 4, 8, or 16 bits.");
    return;
  }
  const hammingCode = generateHammingCode(data);
  document.getElementById("hammingCodeOutput").innerText = hammingCode.join("");
}
let found = false;
function introduceError() {
  found = false;
  const errorInput = document.getElementById("errorInput").value;
  const hammingCode = document.getElementById("hammingCodeOutput").innerText;

  let place = 0;
  if (errorInput.length !== hammingCode.length) {
    alert("Invalid bit position.");
    return;
  }
  for (let i = 0; i < hammingCode.length; i++) {
    if (hammingCode[i] !== errorInput[i])
      if (!found) {
        found = true;
        place = i;
      } else {
        document.getElementById("errorInput").value = "";
        alert("More than one Error was encountered");
        return;
      }
  }
  let plc = Math.abs(place - hammingCode.length);
  if (found)
    document.getElementById("errorOutput").innerText =
      "The Error Bit Number is : " + plc;
  else
    document.getElementById("errorOutput").innerText =
      "No Error was introduced";
}

function correctError() {
  const erroredCode = document.getElementById("errorInput").value;
  if (!found) {
    alert("No error introduced.");
    return;
  }
  const correctedCode = correctHammingCode(erroredCode.split(""));
  document.getElementById("correctionOutput").innerText =
    correctedCode.join("");
}

function validateInput(data) {
  return /^[01]{4}$|^[01]{8}$|^[01]{16}$/.test(data);
}

function validateBitPosition(bit, length) {
  const position = parseInt(bit, 10);
  return position >= 0 && position < length;
}

function generateHammingCode(data) {
  const dataBits = data.split("").map(Number).reverse();
  const m = dataBits.length;
  const r = Math.ceil(Math.log2(m + Math.ceil(Math.log2(m)) + 1));
  const hammingCode = Array(m + r).fill(0);

  for (let i = 0, j = 0; i < hammingCode.length; i++) {
    if (Math.pow(2, j) - 1 === i) {
      j++;
    } else {
      hammingCode[i] = dataBits.shift();
    }
  }

  for (let i = 0; i < r; i++) {
    const position = Math.pow(2, i) - 1;
    let parity = 0;
    for (let j = position; j < hammingCode.length; j += 2 * (position + 1)) {
      for (let k = j; k < j + position + 1 && k < hammingCode.length; k++) {
        parity ^= hammingCode[k];
      }
    }
    hammingCode[position] = parity;
  }
  hammingCode.reverse();
  return hammingCode;
}

function correctHammingCode(code) {
  const r = Math.ceil(Math.log2(code.length));
  let errorPosition = 0;

  for (let i = 0; i < r; i++) {
    const position = Math.pow(2, i) - 1;
    let parity = 0;
    for (let j = position; j < code.length; j += 2 * (position + 1)) {
      for (let k = j; k < j + position + 1 && k < code.length; k++) {
        parity ^= parseInt(code[k]);
      }
    }
    if (parity !== 0) {
      errorPosition += position + 1;
    }
  }

  if (errorPosition > 0) {
    code[errorPosition - 1] = code[errorPosition - 1] === "0" ? "1" : "0";
  }

  return code;
}
