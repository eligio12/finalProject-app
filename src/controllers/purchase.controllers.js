const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({ where: {userId: req.user.id}, 
        include: [{
            model: Product,
            include: [Image],
        }]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id;
    const productsCart = await Cart.findAll({ 
        where: {userId: userId},
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    });

    console.log(productsCart)

    await Purchase.bulkCreate(productsCart);
    await Cart.destroy({where: {userId: userId}});
    return res.status(201).json(productsCart);
});

module.exports = {
    getAll,
    create
}