import SubgrupoProducto from "../Models/SubgrupoProducto";

export async function getAllSubgroupsProduct(req, res) {
  try {
    const subgruposProducto = await SubgrupoProducto.findAll();
    res.json(subgruposProducto);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneSubgroupProduct(req, res) {
  const { idSubgrupoProducto } = req.params;
  try {
    const subgrupoProducto = await SubgrupoProducto.findOne({
      where: {
        idSubgrupoProducto,
      },
    });
    res.json(subgrupoProducto);
  } catch (error) {
    console.log(error);
  }
}
