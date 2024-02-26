import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataFolder = path.join("src", 'data');
const productsDataFile = path.join(dataFolder, 'productsData.json');

export const getProducts = () => {
    const data = fs.readFileSync(productsDataFile, 'utf8');
    return JSON.parse(data);
};

export const addProduct = async (productName, productPrice, productDescription) => {
    const newData = {
        id: uuidv4(),
        productName,
        productPrice,
        productDescription
    };

    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder, { recursive: true });
    }

    let productsData = [];
    if (fs.existsSync(productsDataFile)) {
        try {
            const data = fs.readFileSync(productsDataFile, 'utf8');
            productsData = JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }
    productsData.push(newData);
    try {
        await fs.promises.writeFile(productsDataFile, JSON.stringify(productsData, null, 2));
        return newData;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = (productId) => {
    let products = getProducts();
    products = products.filter(product => product.id !== productId);
    fs.writeFileSync(productsDataFile, JSON.stringify(products, null, 2));
};

export const updateProduct = (productId, productName, productPrice, productDescription) => {
    let products = getProducts();
    products = products.map(product => {
        if (product.id === productId) {
            return { ...product, productName, productPrice, productDescription };
        }
        return product;
    });
    fs.writeFileSync(productsDataFile, JSON.stringify(products, null, 2));
};

export const patchProduct = (productId, productName, productPrice, productDescription) => {
    let products = getProducts();
    products = products.map(product => {
        if (product.id === productId) {
            return {
                ...product,
                ...(productName && { productName }),
                ...(productPrice && { productPrice }),
                ...(productDescription && { productDescription }),
            };
        }
        return product;
    });
    fs.writeFileSync(productsDataFile, JSON.stringify(products, null, 2));
};
