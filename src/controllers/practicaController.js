import { sequelize } from "../database/database";
import Grupo from "../models/Grupo";
import Practica from "../models/Practica";
import { getRandomMinMax } from "../helpers";
import GrupoEstudiante from "../models/GrupoEstudiante";
import GraficoPractica from "../models/GraficoPractica";
import ProductoAtributo1 from "../models/ProductoAtributo1";
import ProductoAtributo2 from "../models/ProductoAtributo2";
import ProductoAtributo3 from "../models/ProductoAtributo3";
import ProductoCorte1 from "../models/ProductoCorte1";
import ProductoCorte2 from "../models/ProductoCorte2";
import ProductoCorte3 from "../models/ProductoCorte3";
import Subgrupo from "../Models/Subgrupo";
import SubgrupoProducto from "../models/SubgrupoProducto";
import {
  ALEATORIO,
  CONSTANTE,
  VARIABLE,
  selectedGraphic,
} from "../constants/index";
import MetodoProducto from "../models/MetodoProducto";

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
    res.status(500).json("Hubo un error");
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

    const getGraphics = graficos.map((grafico) => grafico.value);

    // Contadores que permite identificar el tipo de grafico para crear los subgrupos
    let contConstant = 1;
    let contVariable = 1;
    let contRandom = 1;

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

        for (
          let indexGraphic = 0;
          indexGraphic < getGraphics.length;
          indexGraphic++
        ) {
          // Si el profesor elige un grafico de tipo aleatorio

          if (
            contRandom === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === ALEATORIO
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: getRandomMinMax(4, 8),
                  tipoSubgrupo: "aleatorio",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }
            contRandom--;
          }
          // Si el profesor elige un grafico de tipo constante

          if (
            contConstant === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === CONSTANTE
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: tamanioSubgrupo,
                  tipoSubgrupo: "constante",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }
            contConstant--;
          }
          // Si el profesor elige un grafico de tipo variable

          if (
            contVariable === 1 &&
            selectedGraphic[getGraphics[indexGraphic]] === VARIABLE
          ) {
            for (let s = 0; s < subgrupo; s++) {
              const createSubgroup = await Subgrupo.create(
                {
                  nombreSubgrupo: `Subgrupo ${s + 1}`,
                  cantidadSubgrupo: tamanioSubgrupo,
                  tipoSubgrupo: "variable",
                },
                {
                  fields: [
                    "nombreSubgrupo",
                    "cantidadSubgrupo",
                    "tipoSubgrupo",
                  ],
                }
              );

              await SubgrupoProducto.create(
                {
                  idProductoC2SP: referenceProduct.dataValues.idProductoC2,
                  idSubgrupoSP: createSubgroup.dataValues.idSubgrupo,
                },
                { fields: ["idProductoC2SP", "idSubgrupoSP"] }
              );
            }

            contVariable--;
          }
        }
      }
    }

    res.json("Practica creada satisfactoriamente");
  } catch (error) {
    console.log(error);
  }
}

export async function createPractice3(req, res) {
  try {
    const {
      field: {
        nombrePractica,
        descripcion,
        modulo: { value },
        tipoMuestreo,
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

    for (let i = 0; i < numGrupo.value; i++) {
      const {
        producto,
        tolerancia,
        cont,
        lote,
        aql,
        severidad,
        nivelInspeccion,
        integrantes,
        metodo,
        atributos,
      } = group[i];
      const nombreGrupo = `Grupo ${i + 1}`;

      const getMethods = metodo && metodo.map((metodo) => metodo.value);

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

        const referenceProduct = await ProductoCorte3.create(
          {
            nombrePC3: producto.label,
            ...(tipoMuestreo === VARIABLE && {
              variablePrincipalC3: cont.value,
            }),
            ...(tipoMuestreo === VARIABLE && { toleranciaPC3: tolerancia }),
            tamanioLote: lote,
            aql: aql.value,
            severidad: severidad.value,
            nivelInspeccion: nivelInspeccion.value,
            idGrupoEstudiantePC3: grupoEstudiante.dataValues.idGrupoEstudiante,
          },
          {
            fields: [
              "nombrePC3",
              "tamanioLote",
              "aql",
              "severidad",
              "nivelInspeccion",
              "variablePrincipalC3",
              "toleranciaPC3",
              "idGrupoEstudiantePC3",
            ],
          }
        );

        if (atributos?.length > 0) {
          console.log("entré atributos");
          for (let attribute = 0; attribute < atributos.length; attribute++) {
            await ProductoAtributo3.create(
              {
                idAtributoPA3: atributos[attribute].value,
                idProductoC3A: referenceProduct.dataValues.idProductoC3,
              },
              { fields: ["idAtributoPA3", "idProductoC3A"] }
            );
          }
        }

        if (getMethods?.length > 0) {
          console.log("entré métodos");

          for (
            let indexMethod = 0;
            indexMethod < getMethods.length;
            indexMethod++
          ) {
            await MetodoProducto.create({
              idMetodoMP: getMethods[indexMethod],
              idProductoMP: referenceProduct.dataValues.idProductoC3,
            });
          }
        }
      }
    }

    res.json("Insertado con exito");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
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
