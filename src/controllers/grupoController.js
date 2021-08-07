import Grupo from "../models/Grupo";

export async function getAllGrupos(req, res) {
  try {
    const Grupos = await Grupo.findAll();
    res.json(Grupos);
  } catch (error) {
    console.log(error);
  }
}
