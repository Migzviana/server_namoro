const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const memoriesRoutes = require("./routes/memories")
const seedRoutes = require("./routes/seed")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads",express.static("uploads"))

app.use(authRoutes)
app.use(memoriesRoutes)
app.use(seedRoutes)

app.listen(3001,()=>{
  console.log("Servidor rodando na porta 3001")
})