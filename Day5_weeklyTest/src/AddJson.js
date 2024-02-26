// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// export default async function addJsonData(productName, productPrice, productDescription) {
//     const dataFolder = path.join("src", 'data');
//     const productsDataFile = path.join(dataFolder, 'productsData.json');
    
//     const newData = {
//         id: uuidv4(),
//         productName,
//         productPrice,
//         productDescription
//     };

    
//     if (!fs.existsSync(dataFolder)) {
//         fs.mkdirSync(dataFolder, { recursive: true });
//     }

  
//     let productsData = [];
//     if (fs.existsSync(productsDataFile)) {
//         try {
//             const data = fs.readFileSync(productsDataFile, 'utf8');
//             productsData = JSON.parse(data);
//         } catch (error) {
//             throw error;
//         }
//     }
//     productsData.push(newData);
//     try {
//         await fs.promises.writeFile(productsDataFile, JSON.stringify(productsData, null, 2));
//         return newData;
//     } catch (error) {
//         throw error;
//     }
// }

