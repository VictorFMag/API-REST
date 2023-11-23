const { INTEGER } = require('sequelize');
const itemModel = require('../models/item')

async function listItems() {
  const items = await itemModel.findAll();
  return items;
}

async function createItem(item) {
  return itemModel.create(item);
}

async function getItem(id_param) {
  const item = await itemModel.findOne({where: {id: id_param}});
  return item;
}

async function deleteItem(id_param) {
  const item = await itemModel.destroy({where: {id: id_param}});
  return item;
}

/*
async function updateItem(id_param, atributeToChange, newValue) {
  const item = await itemModel.update({[atributeToChange]: newValue}, {where: {id: id_param}});
  return item;
}
*/

module.exports = { createItem, getItem, listItems, deleteItem, updateItem }