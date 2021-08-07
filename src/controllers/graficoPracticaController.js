import GraficoPractica from "../models/GraficoPractica";

export async function getAllGraficoPracticas(req, res) {
  try {
    const graficoPracticas = await GraficoPractica.findAll();
    res.json(graficoPracticas);
  } catch (error) {}
}
