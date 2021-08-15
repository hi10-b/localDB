const e = require("express");
const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost:27017/StudentDB",
	{
		useNewUrlParser: true,
	},
	(err) => {
		if (!err) {
			console.log("db connection success");
		} else {
			console.log("db connection error");
		}
	}
);

require("./student.model");
