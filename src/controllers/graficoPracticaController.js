import GraficoPractica from "../models/GraficoPractica";

export async function createGraphicPractice(req, res){
  const {idPracticaGP, idGraficoGP} = req.body;
  try {
    const grafico_practica = await GraficoPractica.create({
      idPracticaGP,
      idGraficoGP
    },{fields:['idPracticaGP','idGraficoGP']});
    console.log(grafico_practica);
    res.json(grafico_practica)
  } catch (error) {
    console.log(error);
  }
}

export async function getAllGraphicPractice(req, res) {
  try {
    const graficoPracticas = await GraficoPractica.findAll();
    res.json(graficoPracticas);
  } catch (error) {}
}
