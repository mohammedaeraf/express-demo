const dns = require("node:dns");
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express")
const mongoose = require("mongoose")

const app = express();
app.use(express.json())

mongoose.connect(
  "mongodb+srv://aeraf:WHKAajUSGhsMCI3V@fla-cluster.ifq2las.mongodb.net/",
)
.then(()=> console.log("Express app connected to MongoDB"))
.catch((err) => console.error(err))

app.listen(3000, ()=> {
    console.log("Express App running on port 3000");
})