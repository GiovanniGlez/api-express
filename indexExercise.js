/*const express = require("express")
const fs = require("fs")
const fsPromise = require("fs/promises")
//const { request } = require("http")

const app = express()


//Endpoint de bienvenida
app.get("/", (request, response) =>{
    response.write("Bienvenido a nuestra api de express")
    response.end()
})

//Callback
app.get("/files-callbacks", (request, response) => {
    fs.readFile("text1.txt", "utf8", (err, data) =>{
        if(err) {
            response.write("Hubo un error")
            response.end()
        }
        response.write(data)
        response.end()
    })
})

//promise
app.get("/files-promises", (request, response) => {
    fsPromise.readFile("text1.txt", "utf8")
    .then((data) => {
        response.write(data)
        response.end()
    })
    .catch((err) => {
        response.write(err)
        response.end()
    })
})

//asyncAwait
app.get("/file-async-await", async (request, response) => {
    try{
        const files = await fsPromise.readFile("text1.txt", "utf8")
        response.write(files)
        response.end()
    } catch(err) {
        response.write(err)
        response.end()
    }
})

//Endpoints koders
//recurso-> koders

/*
1 - PATH -> identificadores -> modifican la ruta del lado back
/recurso/identificador -> /koders/:id
2 -QUERY PARAM -> no cambian la ruta
?modulo=AWS&edad=25
*/
/*app.get("/koders", async (request, response) => {
    const { query } = request
    //console.log("modulo", query.modulo)

    const db = await  fsPromise.readFile("koders.json", "utf-8")
    const parsedDB = JSON.parse(db)
    //response.json(parsedDB.koders)

    if(Object.keys(query).length) {
        //Significa que no es 0
        const kodersFound = parsedDB.koders.filter((koder) => koder.modulo === query.modulo)
        response.json(kodersFound)
    } else {
        //Significa que es 0
        //Si el cliente no me manda algo que regrese todos los koders
        response.json(parsedDB.koders)
    }
})

app.get("/koders/:id", async (request, response) => {
    //Path params
    const { params } = request
    console.log("request", request)

    //DB
    const db = await fsPromise.readFile("koders.json", "utf-8")
    const parsedDB = JSON.parse(db)

    //Filtramos para encontrar al koder con identificador 2
    const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))

    //Respondemos
    response.json(foundKoder[0])
})

app.use(express.json())
// POST
const middleware2 = (request, response, next) => {
    console.log("Estoy en mi middleware 2")
    next()
}
app.post("/koders", middleware2, async (request,response) => {
    const { body } = request

    const bd = await fsPromise.readFile("koders.json", "utf-8")
    //console.log("bd", bd)
    const parsedDB = JSON.parse(bd)

    const newKoder = {
        id: parsedDB.koders.length + 1,
        ...body
      }
    parsedDB.koders.push(newKoder)

    await fsPromise.writeFile("koders.json", JSON.stringify(parsedDB, "\n", 2), "utf-8")


    //console.log("body", body)
    response.status(201)
    response.json({success: true})
})

app.listen("8080", () => {
    console.log("Server listening ...");
});


/*
Tarea:
En el endpoint de enlistar koders, recibir modulo como query params
y regresar todos los koders que tengan ese modulo
*/

// Ejercicio
// PUT -> me van a reemplazar el koder
// PATH PARAM -> id
// BODY -> data que tienen que reeemplazar
// REFLEJAr -> en su bd -> koders.json
// findIndex

/*app.put("/koders/:id", async (request, response) => {
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

app.delete("/koders/id", async (request, response) => {
    //Path params
    const { params} = request

    //Acceder a la bd
    const bd = await fsPromise.readFile("koders.json", "utf8")
    parsedBD =JSON.parse(bd)// Manejar el json
    //.filter
    //findIndex
    //map -> element =>
    const kodersQueSeQuedan = parsedBD.koders.filter(koder => koder.id !== Number(params-id))
    parsedBD.koders = kodersQueSeQuedan

    //Escribir en nuestra BD
    await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf-8")
    //Respuesta
    response.json({ sucess: true})
})

//Middlewares
app.use(express.json())//parseando json
//Global

//Middleware 1
app.use((request, response, next) => {
    //Toda la logica de mi middleware
    console.log("Estoy en mi middleware 1")
    console.log("body", request.body)

    //Puedes continuar
    next()
})

//Middleware 2
*/