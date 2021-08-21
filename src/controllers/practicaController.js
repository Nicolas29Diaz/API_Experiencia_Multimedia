import { sequelize } from "../database/database";
import Grupo from "../models/Grupo";
import Practica from "../models/Practica";
import { getRandomMinMax } from "../helpers";
import GrupoEstudiante from "../models/GrupoEstudiante";
import GraficoPractica from "../models/GraficoPractica";
import ProductoAtributo1 from "../models/ProductoAtributo1";
import ProductoAtributo2 from "../models/ProductoAtributo2";
import ProductoCorte1 from "../models/ProductoCorte1";
import ProductoCorte2 from "../models/ProductoCorte2";
import Subgrupo from "../Models/Subgrupo";
import SubgrupoProducto from "../models/SubgrupoProducto";

export async function createPractice1(req, res) {
  try {
    const {
      field: { nombrePractica, descripcion, modulo },
      groups: { group, numGrupo },
    } = req.body;

    const idCorteP = modulo.value;

    const practica = await Practica.create(
      {
        nombrePractica,
        descripcionPractica: descripcion,
        idCorteP,
        idCursoP: 2,
      },
      {
        fields: [
          "nombrePractica",
          "descripcionPractica",
          "idCorteP",
          "idCursoP",
        ],
      }
    );

    for (let i = 0; i < numGrupo.value; i++) {
      const { producto, unidades, tolerancia, integrantes, cont, atributos } =
        group[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const grupo = await Grupo.create(
        {
          nombreGrupo,
          idPracticaG: practica.dataValues.idPractica,
        },
        { fields: ["nombreGrupo", "idPracticaG"] }
      );

      for (let j = 0; j < integrantes.length; j++) {
        const grupoEstudiante = await GrupoEstudiante.create(
          {
            idGrupoGE: grupo.dataValues.idGrupo,
            idEstudianteGE: integrantes[j].id,
          },
          { fields: ["idGrupoGE", "idEstudianteGE"] }
        );

        const referenceProduct = await ProductoCorte1.create(
          {
            nombrePC1: producto.label,
            variablePrincipalC1: cont.value,
            toleranciaPC1: tolerancia,
            unidadesPC1: unidades,
            idGrupoEstudiantePC1: grupoEstudiante.dataValues.idGrupoEstudiante,
          },
          {
            fields: [
              "nombrePC1",
              "variablePrincipalC1",
              "toleranciaPC1",
              "unidadesPC1",
              "idGrupoEstudiantePC1",
            ],
          }
        );

        for (let attribute = 0; attribute < atributos.length; attribute++) {
          await ProductoAtributo1.create(
            {
              idAtributoPA1: atributos[attribute].value,
              idProductoC1A: referenceProduct.dataValues.idProductoC1,
            },
            { fields: ["idAtributoPA1", "idProductoC1A"] }
          );
        }
      }
    }

    res.status(200).json("Practica creada con exito");
  } catch (error) {
    res.status(500).json("Algo salió mal");
    console.log(error);
  }
}

export async function createPractice2(req, res) {
  try {
    const {
      field: {
        nombrePractica,
        descripcion,
        modulo: { value },
        graficos,
      },
      groups: { group, numGrupo },
    } = req.body;

    const practica = await Practica.create(
      {
        nombrePractica,
        descripcionPractica: descripcion,
        idCorteP: value,
        idCursoP: 2,
      },
      {
        fields: [
          "nombrePractica",
          "descripcionPractica",
          "idCorteP",
          "idCursoP",
        ],
      }
    );

    for (let graphic = 0; graphic < graficos.length; graphic++) {
      await GraficoPractica.create(
        {
          idPracticaGP: practica.dataValues.idPractica,
          idGraficoGP: graficos[graphic].value,
        },
        { fields: ["idPracticaGP", "idGraficoGP"] }
      );
    }

    for (let i = 0; i < numGrupo.value; i++) {
      const {
        producto,
        subgrupo,
        tamanioSubgrupo,
        tolerancia,
        integrantes,
        cont,
        atributos,
      } = group[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const grupo = await Grupo.create(
        {
          nombreGrupo,
          idPracticaG: practica.dataValues.idPractica,
        },
        { fields: ["nombreGrupo", "idPracticaG"] }
      );

      for (let j = 0; j < integrantes.length; j++) {
        const grupoEstudiante = await GrupoEstudiante.create(
          {
            idGrupoGE: grupo.dataValues.idGrupo,
            idEstudianteGE: integrantes[j].id,
          },
          { fields: ["idGrupoGE", "idEstudianteGE"] }
        );

        const referenceProduct = await ProductoCorte2.create(
          {
            nombrePC2: producto.label,
            variablePrincipalC2: cont.value,
            toleranciaPC2: tolerancia,
            idGrupoEstudiantePC2: grupoEstudiante.dataValues.idGrupoEstudiante,
          },
          {
            fields: [
              "nombrePC2",
              "variablePrincipalC2",
              "toleranciaPC2",
              "idGrupoEstudiantePC2",
            ],
          }
        );

        for (let attribute = 0; attribute < atributos.length; attribute++) {
          await ProductoAtributo2.create(
            {
              idAtributoPA2: atributos[attribute].value,
              idProductoC2A: referenceProduct.dataValues.idProductoC2,
            },
            { fields: ["idAtributoPA2", "idProductoC2A"] }
          );
        }

        for (let s = 0; s < subgrupo; s++) {
          const createSubgroup = await Subgrupo.create(
            {
              nombreSubgrupo: `Subgrupo ${s + 1}`,
              cantidadSubgrupo: tamanioSubgrupo,
            },
            { fields: ["nombreSubgrupo", "cantidadSubgrupo"] }
          );

          await SubgrupoProducto.create(
            {
              idProductoC2SP: referenceProduct.dataValues.idProductoC2,
              idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
            },
            { fields: ["idProductoC2SP", "idSubgrupoSP"] }
          );
        }
      }
    }

    res.json("Practica creada satisfactoriamente");
  } catch (error) {
    console.log(error);
  }
}

export async function createPracticeInspectC1(req, res) {
  try {
    const {
      field: { nombrePractica, descripcion, modulo },
      groups: { group },
    } = req.body;

    let arrayObjects = [];

    for (let indexGroup = 0; indexGroup < group.length; indexGroup++) {
      const { producto, unidades, tolerancia, integrantes, cont, atributos } =
        group[indexGroup];
      const getUnitsValue = unidades;
      const getTolerance = tolerancia;
      const getLengthParticipantsByGroup = integrantes.length;
      const totalUnitsToMake = getUnitsValue * getLengthParticipantsByGroup;

      for (
        let indexParticipant = 0;
        indexParticipant < getLengthParticipantsByGroup;
        indexParticipant++
      ) {
        let newProduct = {};
        for (let indexUnits = 0; indexUnits < getUnitsValue; indexUnits++) {
          const getRandom = getRandomMinMax(-getTolerance, getTolerance + 5);
          newProduct = {
            nombrePC1: producto.label,
            variablePrincipalC1: cont.value + getRandom,
            toleranciaPC1: getTolerance,
            unidadesPC1: totalUnitsToMake,
            idGrupoEstudiantePC1: 35,
            integrantes: integrantes[indexParticipant],
          };
          arrayObjects.push(newProduct);
        }
      }
    }

    console.log(arrayObjects);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPractica(req, res) {
  try {
    const practicas = await Practica.findAll();
    res.json(practicas);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeStudentsPerGroup(req, res) {
  const { idPractica } = req.params;
  try {
    const practicestudentsPerGroup = await sequelize.query(
      `select e.nombreEstudiante,g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} order by g.idGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practicestudentsPerGroup);
    res.json(practicestudentsPerGroup);
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentsPerGroup(req, res) {
  const { idPractica, nombreGrupo } = req.params;
  try {
    const studentsPerGroup = await sequelize.query(
      `select e.nombreEstudiante,g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} and g.nombreGrupo="${nombreGrupo}";`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(studentsPerGroup);
    res.json(studentsPerGroup);
  } catch (error) {
    console.log(error);
  }
}

export async function getStudentCountPerGroup(req, res) {
  const { idPractica } = req.params;
  try {
    const studentsCount = await sequelize.query(
      `select count(e.idEstudiante),g.nombreGrupo from estudiante e, grupo_estudiante ge, grupo g, practica p where e.idEstudiante=ge.idEstudianteGE and ge.idGrupoGE=g.idGrupo and g.idPracticaG=p.idPractica and p.idPractica=${idPractica} group by g.nombreGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(studentsCount);
    res.json(studentsCount);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeOneProductPerGroup(req, res) {
  const { idPractica } = req.params;
  try {
    const practiceProducts = await sequelize.query(
      `select p.nombrePC1,g.nombreGrupo from producto_corte_1 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC1=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeGraphics(req, res) {
  const { idPractica } = req.params;
  try {
    const practicegraphics = await sequelize.query(
      `select g.nombreGrafico from grafico g, grafico_practica gp, practica p where g.idGrafico=gp.idGraficoGP and gp.idPracticaGp=p.idPractica and p.idPractica=${idPractica};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practicegraphics);
    res.json(practicegraphics);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeTwoProductPerGroup(req, res) {
  const { idPractica } = req.params;
  try {
    const practiceProducts = await sequelize.query(
      `select p.nombrePC2,g.nombreGrupo from producto_corte_2 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC2=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeThreeProductPerGroup(req, res) {
  const { idPractica } = req.params;
  try {
    const practiceProducts = await sequelize.query(
      `select p.nombrePC3,g.nombreGrupo from producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} group by g.nombreGrupo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(practiceProducts);
    res.json(practiceProducts);
  } catch (error) {
    console.log(error);
  }
}

export async function getPracticeThreeGroupMethods(req, res) {
  const { idPractica, nombreGrupo } = req.params;
  try {
    const groupMethods = await sequelize.query(
      `select m.nombreMetodo from metodo m, metodo_producto mp, producto_corte_3 p, grupo_estudiante ge, grupo g, practica pa where m.idMetodo=mp.idMetodoMP and mp.idProductoMP=p.idProductoC3 and p.idGrupoEstudiantePC3=ge.idGrupoEstudiante and ge.idGrupoGE=g.idGrupo and g.idPracticaG=pa.idPractica and pa.idPractica=${idPractica} and g.nombreGrupo='${nombreGrupo}' group by m.nombreMetodo;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(groupMethods);
    res.json(groupMethods);
  } catch (error) {
    console.log(error);
  }
}
