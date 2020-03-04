const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || "Development"
const HOST = "127.0.0.1"

const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build")

// Serve the static files from the React app
app.use(express.static(CLIENT_BUILD_PATH))

app.use(express.json({ extended: false }))

app.use("/api/parser", require("./routes/parser"))

// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, "index.html"))
})

app.listen(PORT, HOST, (err) => {
  if (err) console.error("❌ Unable to connect the server: ", err)
  console.log(`🌍 Server listening on port ${PORT} - ${ENV} environment`)
})
