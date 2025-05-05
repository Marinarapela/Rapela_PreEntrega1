const app = require("./src/app.js")

const PORT = 8080

app.listen (PORT, () => {
    console.log (`Server listening on port http://localhost:${PORT}`)
})