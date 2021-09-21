import ProductoAtributo2 from "../models/ProductoAtributo2";

export async function createProductTwoAtribute(req, res) {
  const { idAtributoPA2, idProductoC2A } = req.body;
  try {
    const producto_atributo_2 = await ProductoAtributo2.create(
      {
        idAtributoPA2,
        idProductoC2A,
      },
      { fields: ["idAtributoPA2", "idProductoC2A"] }
    );
    console.log(producto_atributo_2);
    res.json(producto_atributo_2);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct2Atributes(req, res) {
  try {
    const producto_atributo_2 = await ProductoAtributo2.findAll();
    res.json(producto_atributo_2);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProduct2Atribute(req, res) {
  try {
    const { idProductoAtributo2 } = req.params;
    const producto_atributo_2 = await ProductoAtributo2.findOne({
      where: {
        idProductoAtributo2,
      },
    });
    res.json(producto_atributo_2);
  } catch (error) {
    console.log(error);
  }
}
