import SubgrupoProducto from "../Models/SubgrupoProducto";

export async function createSubgroupProduct(req, res){
  const {idProductoC2SP, idSubgrupoSP} = req.body;
  try {
    const subgrupoProducto = await SubgrupoProducto.create({
      idProductoC2SP,
      idSubgrupoSP
    },{fields:['idProductoC2SP','idSubgrupoSP']});
    console.log(subgrupoProducto);
    res.json(subgrupoProducto);
  } catch (error) {
    console.log(error);
  }
}

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
