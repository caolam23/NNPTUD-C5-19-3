let inventoryModel = require('../schemas/inventory')

module.exports = {
    // Tạo inventory mới khi tạo product
    CreateInventory: async function (productId) {
        try {
            let newInventory = new inventoryModel({
                product: productId,
                stock: 0,
                reserved: 0,
                soldCount: 0
            });
            await newInventory.save();
            return newInventory;
        } catch (error) {
            throw error;
        }
    },

    // Lấy tất cả inventory
    GetAllInventories: async function () {
        try {
            return await inventoryModel.find()
                .populate({
                    path: 'product',
                    select: 'title price category'
                });
        } catch (error) {
            throw error;
        }
    },

    // Lấy inventory theo ID kèm thông tin product
    GetInventoryById: async function (id) {
        try {
            return await inventoryModel.findById(id)
                .populate({
                    path: 'product',
                    select: 'title price category images description'
                });
        } catch (error) {
            throw error;
        }
    },

    // Tăng stock
    AddStock: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error('Số lượng phải lớn hơn 0');
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory không tồn tại');
            }
            inventory.stock += quantity;
            inventory.updatedAt = Date.now();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Giảm stock
    RemoveStock: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error('Số lượng phải lớn hơn 0');
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory không tồn tại');
            }
            if (inventory.stock < quantity) {
                throw new Error('Stock không đủ');
            }
            inventory.stock -= quantity;
            inventory.updatedAt = Date.now();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Đặt hàng - giảm stock, tăng reserved
    Reservation: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error('Số lượng phải lớn hơn 0');
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory không tồn tại');
            }
            if (inventory.stock < quantity) {
                throw new Error('Stock không đủ để đặt hàng');
            }
            inventory.stock -= quantity;
            inventory.reserved += quantity;
            inventory.updatedAt = Date.now();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Bán hàng - giảm reserved, tăng soldCount
    Sold: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error('Số lượng phải lớn hơn 0');
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory không tồn tại');
            }
            if (inventory.reserved < quantity) {
                throw new Error('Reserved không đủ để bán');
            }
            inventory.reserved -= quantity;
            inventory.soldCount += quantity;
            inventory.updatedAt = Date.now();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    },

    // Hủy đặt hàng - giảm reserved, tăng stock
    CancelReservation: async function (productId, quantity) {
        try {
            if (quantity <= 0) {
                throw new Error('Số lượng phải lớn hơn 0');
            }
            let inventory = await inventoryModel.findOne({ product: productId });
            if (!inventory) {
                throw new Error('Inventory không tồn tại');
            }
            if (inventory.reserved < quantity) {
                throw new Error('Reserved không đủ để hủy');
            }
            inventory.reserved -= quantity;
            inventory.stock += quantity;
            inventory.updatedAt = Date.now();
            await inventory.save();
            return inventory;
        } catch (error) {
            throw error;
        }
    }
}
