const Items = require('../models/Items')
const Categories = require('../models/Categories')
const Admin = require('../models/Admin')
const categoriesMock = require('../mock/categories.json')
const itemsMock = require('../mock/items.json')
const adminMock = require('../mock/admin.json')

// dbrusnitsina
// O0QkV5gAOiPQXdlz

module.exports = async () => {
    const items = await Items.find()
    if (items.length !== itemsMock.length) {
        await createInitialEntity(Items, itemsMock)
    }

    const categories = await Categories.find()
    if (categories.length !== categoriesMock.length) {
        await createInitialEntity(Categories, categoriesMock)
    }

    const admin = await Admin.find()
    if (admin.length !== adminMock.length) {
        await createInitialEntity(Admin, adminMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            }catch (e) {
                return e
            }
        })
    )
}