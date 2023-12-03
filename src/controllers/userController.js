const userModel = require('../models/user')

async function listUsers() {
  const users = await userModel.findAll();
  return users;
}

async function createUser(user) {
  return userModel.create(user);
}

async function getUser(id_param) {
  const user = await userModel.findOne({where: {id: id_param}});
  return user;
}

async function deleteUser(id_param) {
  const user = await userModel.destroy({where: {id: id_param}});
  return user;
}

async function updateUser(id_param, novosValores){
  const existeuser = await userModel.findOne({ where: { id: `${id_param}` } });

  if (!existeuser) {
    throw new Error(`O user com ID ${id_param} não existe!`);
  }

  await userModel.update(novosValores, { where: { id: `${id_param}` } });

  const userAtualizado = await userModel.findOne({ where: { id: `${id_param}` } });
  return userAtualizado;
}

module.exports = { createUser, getUser, listUsers, deleteUser, updateUser }