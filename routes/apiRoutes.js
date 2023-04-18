const router = require("express").Router()
const utils = require("util")
const fs = require("fs")
const readFileAsync = utils.promisify(fs.readFile)
const writeFileAsync = utils.promisify(fs.writeFile)
const { v4: uuidv4 } = require('uuid');


router.get("/notes", (req, res)=>{
    readFileAsync("db/db.json", "utf8").then(notes=>{
      

        return res.json(JSON.parse(notes))

    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
        
    })
})

router.post("/notes", (req, res)=>{
    readFileAsync("db/db.json", "utf8").then(notes=>{
      const data=JSON.parse(notes)
      data.push({
        id:uuidv4(),
        ...req.body
      })

      writeFileAsync("db/db.json", JSON.stringify(data))
      .then(updatednotes=>res.json(updatednotes))


    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
        
    })
})

router.delete("/notes/:id", (req, res)=>{
    readFileAsync("db/db.json", "utf8").then(notes=>{
      const data=JSON.parse(notes).filter(note=>{
return note.id !== req.params.id

      })
    

      writeFileAsync("db/db.json", JSON.stringify(data))
      .then(updatednotes=>res.json(updatednotes))


    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
        
    })
})


module.exports = router

