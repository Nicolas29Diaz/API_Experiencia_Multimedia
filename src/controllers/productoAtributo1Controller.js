import ProductoAtributo1 from "../models/ProductoAtributo1";

export async function createProductOneAtribute(req, res) {
  const { idAtributoPA1, idProductoC1A } = req.body;
  try {
    const producto_atributo_1 = await ProductoAtributo1.create(
      {
        idAtributoPA1,
        idProductoC1A,
      },
      { fields: ["idAtributoPA1", "idProductoC1A"] }
    );
    console.log(producto_atributo_1);
    res.json(producto_atributo_1);
  } catch (error) {
    console.log(error);
  }
}

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
