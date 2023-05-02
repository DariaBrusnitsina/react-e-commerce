const express = require("express")
const mongoose = require("mongoose");
const config = require("config")
const chalk = require("chalk")
const cors = require("cors")
const routes = require("./routes/index")
const initDatabase = require("./startUp/initDatabase")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)

const PORT = config.get('port')

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))

        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on PORT ${PORT}...`));
            return "start";
          });
    } catch (e) {
        process.exit(1)
    }
}
start()
