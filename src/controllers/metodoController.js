import Metodo from "../models/Metodo";

export async function getAllMethods(req, res) {
  try {
    const metodos = await Metodo.findAll();
    res.json(metodos);
  } catch (error) {
    console.log(error);
  }
}
