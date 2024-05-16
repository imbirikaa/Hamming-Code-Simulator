# Hamming Code Simulator

A web-based simulator for generating, detecting, and correcting errors in Hamming codes. This tool is designed to help users understand how Hamming codes work and how they can be used for error detection and correction.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Hamming Code Generation**: Generate Hamming codes for 4, 8, or 16-bit input data.
- **Error Introduction**: Introduce a single-bit error into the Hamming code and detect its position.
- **Error Correction**: Correct the detected error and display the corrected code.

## Installation
To run the Hamming Code Simulator locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hamming-code-simulator.git
    ```

2. Navigate to the project directory:
    ```bash
    cd hamming-code-simulator
    ```

3. Open `index.html` in your web browser to start the simulator.

## Usage
1. **Enter Data**: Input a binary number (4, 8, or 16 bits) in the "Enter Data" field.
2. **Calculate Hamming Code**: Click the "Calculate Hamming Code" button to generate the Hamming code for the input data.
3. **Introduce Error**: Input the generated Hamming code with one bit flipped in the "Enter the above code with flipping ONE bit" field and click the "Find The Error" button to detect the error.
4. **Correct Error**: Click the "Correct Error" button to correct the detected error and display the corrected code.

## Files
- `index.html`: The main HTML file containing the structure of the web page.
- `styles.css`: The CSS file for styling the web page.
- `script.js`: The JavaScript file containing the logic for generating, detecting, and correcting Hamming codes.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.
