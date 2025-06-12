const Product = require("../models/product.model")

class ProductManager {
    async createProduct(data){
        try {
            const product = new Product (data)
            return await product.save()
        } catch (error) {
            throw new Error ("Error al crear el producto")
        }
    }

    async getAllProducts({ limit = 10, page = 1, sort, category, available, query, baseUrl }) {
        const filter = {};

        if (category && category !== 'undefined') {
            filter.category = category;
        }

        if (available === 'true' || available === 'false') {
            filter.available = available === 'true';
        }
        if (query && query !== 'undefined') {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            lean: true,
        };

        if (sort === 'asc') options.sort = { price: 1 };
        else if (sort === 'desc') options.sort = { price: -1 };

        const result = await Product.paginate(filter, options);

    
    const buildLink = (targetPage) => {
        const params = new URLSearchParams();
        params.set('page', targetPage);
        params.set('limit', limit);

        if (sort) params.set('sort', sort);
        if (category) params.set('category', category);
        if (available) params.set('available', available);
        
        return `${baseUrl}?${params.toString()}`;
        };

        return {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null,
            limit
        };
    }


    async getProductById(productId){
        try {
            const product = await Product.findById(productId)
            return product
        } catch (error) {
            throw new Error("Error al obtener el producto")
        }
    }
    async updateProduct(id, updatedProduct){
        try {
            const product = await Product.findByIdAndUpdate(id, updatedProduct, {new: true})
            return product
        } catch (error) {
            throw new Error("Error al actualizar el producto")
        }
    }
    async deleteProduct(id){
        try {
            const product = await Product.findByIdAndDelete(id)
            return product
        } catch (error) {
            throw new Error("Error al eliminar el producto")
        }
    }
}

module.exports = ProductManager