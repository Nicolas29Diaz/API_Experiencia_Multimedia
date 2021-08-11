import Atributo from "../Models/Atributo";

export async function createAtribute(req, res) {
  const { nombreAtributo } = req.body;
  try {
    const atributo = await Atributo.create({
      nombreAtributo
    },{fields:['nombreAtributo']})
    console.log(atributo);
    res.json(atributo);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAtributes(req, res) {
  try {
    const atributos = await Atributo.findAll();
    res.json(atributos);
  } catch (error) {
    console.log(error);
  }
}

export async function getOneAtribute(req, res) {
  try {
    const { idAtributo } = req.params;
    const atributo = await Atributo.findOne({
      where: {
        idAtributo,
      },
    });
    res.json(atributo);
  } catch (error) {
    console.log(error);
  }
}

// export async function create(req, res) {
//   const { body } = req;
//   try {
//     const created = await this.ServiceAtributo.create(body);
//     console.log(created);
//     if (created) return res.sendStatus(201);
//     return res.sendStatus(500);
//   } catch (e) {
//     const errosLog = e.errors.map((error) => error.message);
//     return res.status(500).json({ errors: errosLog });
//   }
// }

// export async function update(req, res) {
//   const { body, params } = req;
//   const { idAtributo } = params;
//   try {
//     const updated = await this.ServiceAtributo.updateById(idAtributo, body);
//     console.log(updated);
//     if (updated) return res.sendStatus(201);
//     return res.sendStatus(404);
//   } catch (e) {
//     const errosLog = e.errors.map((error) => error.message);
//     return res.status(500).json({ errors: errosLog });
//   }
// }

// export async function deleteById(req, res) {
//   const { idAtributo } = req.params;
//   try {
//     const deleted = await this.ServiceAtributo.deleteById(idAtributo);
//     console.log(deleted);
//     if (deleted) return res.sendStatus(201);
//     return res.sendStatus(404);
//   } catch (e) {
//     const errosLog = e.errors.map((error) => error.message);
//     return res.status(500).json({ errors: errosLog });
//   }
// }
