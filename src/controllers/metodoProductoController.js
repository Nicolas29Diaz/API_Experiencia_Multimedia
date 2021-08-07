import MetodoProducto from "../models/MetodoProducto";

export async function getAllMethodProduct(req, res) {
  try {
    const metodosProductos = await MetodoProducto.findAll();
    res.json(metodosProductos);
  } catch (error) {
    console.log(error);
  }
}
