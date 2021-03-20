const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//conectando com mongoose
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



app.get('/', (req, res) => {
     res.json({msg: 'Api v1'})
})

require("./routes/turorial.routes")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('i´m alive');
})