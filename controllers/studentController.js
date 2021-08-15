const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
	res.render("student/addOrEdit", {
		viewTitle: "Insert Student",
	});
});

router.post("/", (req, res) => {
	console.log("here it is " + req.body._id);
	if (req.body._id == "/") {
		insertRecord(req, res);
	} else {
		updateRecord(req, res);
	}
});

function insertRecord(req, res) {
	var student = new Student();
	student.fullName = req.body.fullName;
	student.email = req.body.email;
	student.number = req.body.number;
	student.city = req.body.city;
	student.save((err, doc) => {
		if (!err) {
			res.redirect("student/list");
			console.log("record added");
		} else {
			console.log("error during insertion" + err);
		}
	});
}

function updateRecord(req, res) {
	Student.findOneAndUpdate(
		{ _id: req.body._id },
		req.body,
		{ new: true },
		(err, doc) => {
			if (!err) {
				res.redirect("student/list");
			} else {
				console.log("error during upate " + err);
			}
		}
	);
}

router.get("/list", (req, res) => {
	Student.find((err, docs) => {
		if (!err) {
			console.log("the full lsit " + docs);
			res.render("student/list", {
				list: docs,
			});
		} else {
			console.log("error during find in list" + err);
		}
	});
});

router.get("/:id", (req, res) => {
	Student.findById(req.params.id, (err, docs) => {
		if (!err) {
			res.render("student/addOrEdit", {
				viewTitle: "Update Student",
				student: docs,
			});
		} else {
			console.log("error during get by id" + err);
		}
	});
});

router.delete("delete/:id", (req, res) => {
	Student.findByIdAndRemove(req.params.id, (err, docs) => {
		if (!err) {
			res.redirect("/student/list");
		} else {
			console.log("error during deletion" + err);
		}
	});
});

module.exports = router;
