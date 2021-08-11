import MetodoProducto from "../models/MetodoProducto";

export async function createMethodProduct(req, res){
  const {idMetodoMP, idProductoMP} = req.params;
  try {
    const metodoProducto = await MetodoProducto.create({
      idMetodoMP,
      idProductoMP
    },{fields:['idMetodoMP','idProductoMP']});
    console.log(metodoProducto);
    res.json(metodoProducto);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMethodProduct(req, res) {
  try {
    const metodosProductos = await MetodoProducto.findAll();
    res.json(metodosProductos);
  } catch (error) {
    console.log(error);
  }
}
