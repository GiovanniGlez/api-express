/**
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 */

const express = require("express")
const fs = require("fs") // Callback
const fsPromise = require("fs/promises") // Promises
const { userInfo } = require("os")

// Endpoint de bienvenida
app.get("/", (request, response) => {
    response.write("Bienvenida a nuesta api de express")
    response.end()
  })

// Recibir un koder en especifico con el id
app.get("/koders/:id", async (request, response) => {
    // Path params
    const { params } = request

    // DB
    const db = await fsPromise.readFile("koders.json", "utf8")
    const parsedDB = JSON.parse(db)

    // Filtramos para encontrar al koder con identiciador 2
    const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))[0]

    // Respondemos
    response.json(foundKoder)
  })

const app = express()

// Middlewares
app.use(express.json()) // parseando a json

// Global

// Middleware 1
const middlewareGlobal = (request, response, next) => {
  // Toda la logica de mi middleware
  console.log("Estoy en mi middleware 1")
  console.log("body", request.body)

  // Para verificar que un usuario este autenticado

  // Puedes continuar
  next()
}
app.use(middlewareGlobal)

const middlewareDePost = (request, response, next) => {
    console.log("Estoy en mi middleware de post")
    next()
  }

  //Endpoint de post
app.post("/koders", middlewareDePost , async (request, response) => {
    // Recibimos el body que nos manda el cliente
    const { body } = request

    // Acceder nuestra bd
    const bd = await fsPromise.readFile("koders.json", "utf8")
    const parsedBD = JSON.parse(bd)

    // Koder a crear
    const newKoder = {
      id: parsedBD.koders.length + 1,
      ...body
    }
      // Agregar el koder a lo que ya teniamos
  parsedBD.koders.push(newKoder)

  // Crear koder en la base de datos
  await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf8")

  // Respondemos con el Koder creado o estatus de exitoso
  response.status(201)
  response.json({ success: true })
})

//Endpoint de put
app.put("/koders/:id", async (request, response) => {
    //
    const { body, params } = request

    const bd = await fsPromise.readFile("koders.json", "utf-8")
    const parsedBD = JSON.parse(bd)

    let index = parsedBD.koders.findIndex(koder => koder.id === Number(params.id))

    const changeKoder = { 
        "id": Number(params.id),
        ...body
    }

    parsedBD.koders[index] = changeKoder

    await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf-8")
    response.json ({success:true})
})

//Endpoint de patch
app.patch("/koders/:id", async (request, response) => {
    //Recibimos el body y los params
    const { params, body } = request

    //Acceso a la BD
    const db = await fsPromise.readFile("koders.json", "utf-8")
    const parsedDB = JSON.parse(db)
    //
    const foundKoder = parseDB.koders.find((koder) => koder.id === Number(params.id))

    if(foundKoder){
        Object.assign(foundKoder,body)
        await  fsPromise.writeFile("koders.json", JSON.stringify(parsedDB, "\n", 2), "utf-8")
        response.json(foundKoder)
    } else {
        response.json("Este koder aun no existe")
    }
})
//Endpoint de delete
app.delete("/koders/:id", async (request, response) => {
    // Path params
    const { params } = request

    // Acceder a la bd
    const bd = await fsPromise.readFile("koders.json", "utf8")
    const parsedBD = JSON.parse(bd) // Manejar el json

    const kodersQueSeQuedan = parsedBD.koders.filter(koder => koder.id !== Number(params.id))
    parsedBD.koders = kodersQueSeQuedan

    // Escribir en nuestra BD
    await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf8")

    // Respuesta
    response.json({ success: true })
  })


app.listen(8080, () => {
    console.log("Server is listening ...")
})