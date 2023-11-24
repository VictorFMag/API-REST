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

async function updateItem(id_param, novosValores){
  const existeItem = await itemModel.findOne({ where: { id: `${id_param}` } });

  if (!existeItem) {
    throw new Error(`O item com ID ${id_param} não existe!`);
  }

  await itemModel.update(novosValores, { where: { id: `${id_param}` } });

  const itemAtualizado = await itemModel.findOne({ where: { id: `${id_param}` } });
  return itemAtualizado;
}

module.exports = { createItem, getItem, listItems, deleteItem, updateItem }