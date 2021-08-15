require("./models/db");

const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

const studentController = require("./controllers/studentController");
var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
	res.send(
		`<h1>welcome here</h1>
        <h3>Click here <b>
            <a href="/student/list">Fetch db</a></b>
            </h3>`
	);
});

app.set("views", path.join(__dirname, "/views/"));

app.engine(
	"hbs",
	exphbs({
		handlebars: allowInsecurePrototypeAccess(handlebars),
		extname: "hbs",
		defaultLayout: "MainLayout",
		layoutsDir: __dirname + "/views/layouts",
	})
);

app.set("view engine", "hbs");

app.listen(3000, () => {
	console.log("server has started on port 3000");
});

app.use("/student", studentController);
