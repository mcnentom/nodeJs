const fs = require('fs').promises;
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');
const zlib = require('zlib');

async function createFile(filePath, fileContent) {
    try {
        await fs.writeFile(filePath, fileContent);
        console.log(`File ${filePath} created successfully.`);
    } catch (error) {
        console.error(`Error creating file: ${error}`);
    }
}

async function zipFile(inputFilePath, outputFilePath) {
    try {
        const readStream = createReadStream(inputFilePath);
        const writeStream = createWriteStream(outputFilePath);
        const zipStream = zlib.createGzip();

        readStream.pipe(zipStream).pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        console.log(`File ${inputFilePath} zipped successfully to ${outputFilePath}.`);
    } catch (error) {
        console.error(`Error zipping file: ${error}`);
    }
}

async function main() {
    const fileName = 'myZip.txt';
    const fileContent = 'This is an example file content.';
    const filePath = path.join(__dirname, fileName);
    const zippedFilePath = path.join(__dirname, `${fileName}.zip`);

    await createFile(filePath, fileContent);

    await zipFile(filePath, zippedFilePath);
}

main();
