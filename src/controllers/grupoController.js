import Grupo from "../models/Grupo";

export async function createGroup(req, res){
  const {nombreGrupo, idPracticaG} = req.body;
  try {
    const grupo = await Grupo.create({
      nombreGrupo,
      idPracticaG
    }, {fields:['nombreGrupo','idPracticaG']});
    console.log(grupo);
    res.json(grupo);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllGrupos(req, res) {
  try {
    const Grupos = await Grupo.findAll();
    res.json(Grupos);
  } catch (error) {
    console.log(error);
  }
}
