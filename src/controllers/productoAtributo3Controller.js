import ProductoAtributo3 from "../Models/ProductoAtributo3";

export async function createProductThreeAtribute(req, res) {
  const { idAtributoPA3, idProductoC3A } = req.body;
  try {
    const producto_atributo_3 = await ProductoAtributo3.create({
      idAtributoPA3,
      idProductoC3A
    },{fields:['idAtributoPA3','idProductoC3A']})
    console.log(producto_atributo_3);
    res.json(producto_atributo_3);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProduct3Atributes(req, res) {
  try {
    const producto_atributo_3 = await ProductoAtributo3.findAll();
    res.json(producto_atributo_3);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProduct3Atribute(req, res) {
  try {
    const { idProductoAtributo3 } = req.params;
    const producto_atributo_3 = await ProductoAtributo3.findOne({
      where: {
        idProductoAtributo3,
      },
    });
    res.json(producto_atributo_3);
  } catch (error) {
    console.log(error);
  }
}
