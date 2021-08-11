import Grafico from "../models/Grafico";

export async function createGraphic(req, res){
  const {nombreGrafico} = req.body;
  try {
    const grafico = await Grafico.create({
      nombreGrafico
    },{fields:['nombreGrafico']});
    console.log(grafico);
    res.json(grafico)
  } catch (error) {
    console.log(error);
  }
}

export async function getAllGraphics(req, res) {
  try {
    const Graficos = await Grafico.findAll();
    res.json(Graficos);
  } catch (error) {
    console.log(error);
  }
}
