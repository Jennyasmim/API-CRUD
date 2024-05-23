const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

const Books = mongoose.model('Books', { 
    title: String,
    image_url: String,
    description: String, 
    autor: String,
    publicacao: String,
    genero: String,
});


app.get("/", async (req, res) =>{
   const books = await Books.find()
   return res.send(books)
})

//Vai deletar o livro especifico
app.delete("/:id", async(req, res) =>{
   const books = await Books.findByIdAndDelete(req.params.id)
   return res.send(books)
})

//Vai atualizar uma informação ou mais do livro
app.put("/:id", async (req, res) => {
    const books = await Books.findByIdAndUpdate(req.params.id, {
       title: req.body.title,
       image_url: req.body.image_url,
       description: req.body.description,
       autor: req.body.autor,
       publicacao: req.body.publicacao,
       genero: req.body.genero,
    }, 
    {
        new:true
    })
    return res.send(books)
})

app.post("/", async (req, res) => {
    const books = new Books({
       title: req.body.title,
       image_url: req.body.image_url,
       description: req.body.description,
       autor: req.body.autor,
       publicacao: req.body.publicacao,
       genero: req.body.genero,
   })
    await books.save()
    return res.send(books)
})


app.listen(port, () => {
    mongoose.connect('mongodb+srv://jyasmim4:84336967@firstapp-api.0vranus.mongodb.net/?retryWrites=true&w=majority&appName=firstapp-api');
   console.log('App running')
})