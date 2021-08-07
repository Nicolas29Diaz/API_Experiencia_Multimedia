import Grafico from "../models/Grafico";

export async function getAllGrafico(req, res) {
  try {
    const Graficos = await Grafico.findAll();
    res.json(Graficos);
  } catch (error) {
    console.log(error);
  }
}
