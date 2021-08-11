import GrupoEstudiante from "../Models/GrupoEstudiante";

export async function createStudentGroup(req, res){
  const {fechaHoraGrupoEstudiante, idGrupoGE, idEstudianteGE} = req.body;
  try {
    const grupoEstudiante = await GrupoEstudiante.create({
      fechaHoraGrupoEstudiante,
      idGrupoGE,
      idEstudianteGE
    },{fields:['fechaHoraGrupoEstudiante', 'idGrupoGE', 'idEstudianteGE']});
    console.log(grupoEstudiante);
    res.json(grupoEstudiante);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudentGroups(req, res) {
  try {
    const grupoEstudiantes = await GrupoEstudiante.findAll();
    res.json(grupoEstudiantes);
  } catch (error) {
    console.log(error);
  }
}
