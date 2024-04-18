const router = require("express").Router();
const StudentModel = require("../model/studentModel.js");

router.route("/").get((req, res) => {
  StudentModel.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(404).json("Server Error"));
});

router.route("/:id").get((req, res) => {
  StudentModel.findById(req.params.id)
    .then((student) => res.json(student))
    .catch((err) => res.status(404).json("Server Error"));
});

router.route("/").post(async (req, res) => {
  const name = req.body.name;
  const department = req.body.department;
  const studentNumber = req.body.studentNumber;
  const newStudent = new StudentModel({
    name,
    department,
    studentNumber,
  });
  newStudent
    .save()
    .then(() => res.json("New Student registered"))
    .catch((err) => res.status(404).json("Server Error"));
});

router.route("/:id").post(async (req, res) => {
  StudentModel.findById(req.params.id)
    .then((studentFormUpdate) => {
      studentFormUpdate.name = req.body.name;
      studentFormUpdate.department = req.body.department;
      studentFormUpdate.studentNumber = req.body.studentNumber;

      studentFormUpdate
        .save()
        .then(() => res.json("New Student registered"))
        .catch((err) => res.status(404).json("Server Error"));
    })
    .catch((err) => res.status(404).json("Server Error"));
});

router.route("/:id").delete(async (req, res) => {
  StudentModel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleted."))
    .catch((err) => res.status(404).json("Server Error"));
});

module.exports = router;