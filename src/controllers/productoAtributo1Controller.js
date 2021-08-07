import ProductoAtributo1 from "../Models/ProductoAtributo1";

export async function getAllProduct1Atributes(req, res) {
  try {
    const producto_atributo_1 = await ProductoAtributo1.findAll();
    res.json(producto_atributo_1);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProduct1Atribute(req, res) {
  try {
    const { idProductoAtributo1 } = req.params;
    const producto_atributo_1 = await ProductoAtributo1.findOne({
      where: {
        idProductoAtributo1,
      },
    });
    res.json(producto_atributo_1);
  } catch (error) {
    console.log(error);
  }
}
