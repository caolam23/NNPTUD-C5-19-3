var express = require('express');
var router = express.Router();
let inventoryController = require('../controllers/inventory');

// Lấy tất cả inventory
router.get('/', async function (req, res) {
    try {
        let inventories = await inventoryController.GetAllInventories();
        res.send(inventories);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Lấy inventory theo ID (kèm thông tin product)
router.get('/:id', async function (req, res) {
    try {
        let inventory = await inventoryController.GetInventoryById(req.params.id);
        if (!inventory) {
            return res.status(404).send({ message: "Inventory không tồn tại" });
        }
        res.send(inventory);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

// Tăng stock
router.post('/add-stock', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).send({ message: "product và quantity là bắt buộc" });
        }

        let result = await inventoryController.AddStock(product, quantity);
        res.send({
            message: "Tăng stock thành công",
            data: result
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Giảm stock
router.post('/remove-stock', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).send({ message: "product và quantity là bắt buộc" });
        }

        let result = await inventoryController.RemoveStock(product, quantity);
        res.send({
            message: "Giảm stock thành công",
            data: result
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Đặt hàng - giảm stock, tăng reserved
router.post('/reservation', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).send({ message: "product và quantity là bắt buộc" });
        }

        let result = await inventoryController.Reservation(product, quantity);
        res.send({
            message: "Đặt hàng thành công",
            data: result
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Bán hàng - giảm reserved, tăng soldCount
router.post('/sold', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).send({ message: "product và quantity là bắt buộc" });
        }

        let result = await inventoryController.Sold(product, quantity);
        res.send({
            message: "Bán hàng thành công",
            data: result
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Hủy đặt hàng - giảm reserved, tăng stock
router.post('/cancel-reservation', async function (req, res) {
    try {
        let { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).send({ message: "product và quantity là bắt buộc" });
        }

        let result = await inventoryController.CancelReservation(product, quantity);
        res.send({
            message: "Hủy đặt hàng thành công",
            data: result
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

module.exports = router;
