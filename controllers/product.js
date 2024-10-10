import { request } from "http";
import { response } from "express";
import products from "../models/product-model.js";

//----------------single image----------------------
//export const postProductData = async (req , res ) => {
//     try{
//         const {name , quantity , price, description,user  } = req.body;
//         const image=req.file.path

//         console.log(name , quantity, price, description,user); 
//         const isnameExisted = await products.findOne({ name: name });
//         if(isnameExisted) {
//             return res.status(400).json({ message: "already exists" });
//         }
        
//         const productData = products({
//             name,
//             quantity,
//             price,
//             description,
//             user,
//             image
//         })

//         await productData.save();
//         return res.status(200).json({ message: "data saved succesfully", success: true , productData});


//     }
//     catch(error){
//         res.status(500).json(error.message);
//     }
// }


export const postProductData = async (req, res) => {
        try {
            const {name ,category, quantity , price, description,user,rating} = req.body;
    
            // Handle multiple images
            let images = [];
            if (req.files) {
                images = req.files.map(file => file.path); // Array of image paths
            }
    
            console.log(name , category, quantity , price, description,user,rating ); // Check the data in the console
    
            const isnameExisted = await products.findOne({ name: name });
            if (isnameExisted) {
                return res.status(400).json({ message: "Product already exists" });
            }
    
            // Save user data with multiple images
            const productData = new products({
                name,category, quantity,price,description,user,rating,images
            });
    
            await productData.save();
            return res.status(200).json({ message: "Product saved successfully", success: true, productData });
    
        } catch (error) {
            res.status(500).json({message: error.message });
        }
    }



    export const getProductsData = async (req, res) => {
        try {
            // Fetch all products from the database
            const getProducts = await products.find();
    
            // Initialize object to group products by category
            const productData = {
                laptops: [],
                smartphones: [],
                cameras: [],
                accessories: [],
            };
    
            // Group products by category
            getProducts.forEach(product => {
                switch (product.category) {
                    case 'laptops':
                        productData.laptops.push({
                            id: product._id,
                            imageKey: product.images[0], // Assuming the first image for each product
                            productName: product.name,
                            price: product.price,
                            rating: product.rating,
                        });
                        break;
                    case 'smartphones':
                        productData.smartphones.push({
                            id: product._id,
                            imageKey: product.images[0],
                            productName: product.name,
                            price: product.price,
                            rating: product.rating,
                        });
                        break;
                    case 'cameras':
                        productData.cameras.push({
                            id: product._id,
                            imageKey: product.images[0],
                            productName: product.name,
                            price: product.price,
                            rating: product.rating,
                        });
                        break;
                    case 'accessories':
                        productData.accessories.push({
                            id: product._id,
                            imageKey: product.images[0],
                            productName: product.name,
                            price: product.price,
                            rating: product.rating,
                        });
                        break;
                    default:
                        break;
                }
            });
    
            // Return the structured data grouped by category
            return res.status(200).json({ success: true, productData });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    };

    // export const getProductsByCategory = async (req, res) => {
    //     const { category } = req.params; // Get the category from request parameters
    //     try {
    //         // Fetch products based on the category from the database
    //         const getProducts = await products.find({ category }); // Filter products by category
    
    //         if (getProducts.length === 0) {
    //             return res.status(404).json({ success: false, message: 'No products found in this category.' });
    //         }
    
    //         // Initialize array to store filtered products
    //         const productData = getProducts.map(product => ({
    //             id: product._id,
    //             imageKey: product.images[0], // Assuming the first image for each product
    //             productName: product.name,
    //             price: product.price,
    //             rating: product.rating,
    //         }));
    
    //         // Return the structured data for the specified category
    //         return res.status(200).json({ success: true, productData });
    //     }
    //     catch (error) {
    //         return res.status(500).json({ success: false, message: error.message });
    //     }
    // };
    
    export const getProductsByCategory = async (req, res) => {
        const { category } = req.params; // Get the category from request parameters
        try {
            // Fetch products based on the category from the database
            const getProducts = await products.find({ category }); // Filter products by category
    
            if (getProducts.length === 0) {
                return res.status(404).json({ success: false, message: 'No products found in this category.' });
            }
    
            // Get the backend server's base URL from environment variables
            const baseURL = process.env.BASE_URL || 'http://localhost:8000'; // Update this based on your backend server
    
            // Initialize array to store filtered products
            const productData = getProducts.map(product => ({
                id: product._id,
                imageKey: `${baseURL}/${product.images[0]}`, // Do not add 'uploads' again here
                productName: product.name,
                price: product.price,
                rating: product.rating,
            }));
    
            // Return the structured data for the specified category
            return res.status(200).json({ success: true, productData });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    };
    
    

    

export const getProductById = async (req , res) => {
    try{
        const getProductId = req.params.id;
        const productData = await products.findById(getProductId);
        if (!productData) {
            return res.status(404).json({ message: "product not found" });

        }
        return res.status(200).json({ success: true, productData , message :"got data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}
export const getProductByuser = async (req , res) => {
    try{
        const productData = await products.find().populate("user");
        if (!productData) {
            return res.status(404).json({ message: "product not found" });

        }
        return res.status(200).json({ success: true, productData , message :"got data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}





export const updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // The fields to update
        const { name , quantity , price, description,user,rating } = req.body;

        // Find the product by ID and update with the new data
        const updatedProduct = await products.findByIdAndUpdate(
            productId,
            { name , category, quantity , price, description,user,rating  }, // Object with the updated fields
            { new: true } // This option ensures you get the updated document in the response
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            user: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




export const deleteProductById = async (req , res) => {
    try{
        const deleteProductById = req.params.id;
        const productData = await products.findByIdAndDelete(deleteProductById);
        if (!productData) {
            return res.status(404).json({ message: "not found" });

        }
        return res.status(200).json({ success: true, productData , message :"Product deleted"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}