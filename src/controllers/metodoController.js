import Metodo from "../models/Metodo";

export async function createMethod(req, res){
  const {nombreMetodo} = req.body;
  try {
    const metodo = await Metodo.create({
      nombreMetodo
    },{fields:['nombreMetodo']});
    console.log(metodo);
    res.json(metodo);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMethods(req, res) {
  try {
    const metodos = await Metodo.findAll();
    res.json(metodos);
  } catch (error) {
    console.log(error);
  }
}
