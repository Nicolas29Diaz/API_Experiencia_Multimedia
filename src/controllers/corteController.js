import Corte from "../models/Corte";

export async function getAllCortes(req, res) {
  try {
    const cortes = await Corte.findAll();
    res.json(cortes);
  } catch (error) {
    console.log(error);
  }
}
