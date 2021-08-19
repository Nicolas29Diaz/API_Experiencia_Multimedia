import GrupoEstudiante from "../Models/GrupoEstudiante";

export async function getAllStudentGroups(req, res) {
  try {
    const grupoEstudiantes = await GrupoEstudiante.findAll();
    res.json(grupoEstudiantes);
  } catch (error) {
    console.log(error);
  }
}
