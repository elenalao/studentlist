const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://csis3380:csis3380@cluster.vrcmqo4.mongodb.net/StudentList?retryWrites=true&w=majority";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB datebase successfully connected");
})
// const StudentListRouter=require("./routes/studentList.js");
// app.use("/",StudentListRouter);
const Schema = mongoose.Schema;
const studentSchema = new Schema(
    {name: { type: String,required: true,},
        department: {type: String,required: true,},
        studentNumber: {type: Number,required: true,},
    },
    {collection: "studentCollection",
    }
);
const StudentModel = mongoose.model("Student", studentSchema);
app.get("/", (req, res) => {
    StudentModel.find()
        .then((students) => res.json(students))
        .catch((err) => res.status(404).json("Server Error"));
});

app.get("/:id", (req, res) => {
    StudentModel.findById(req.params.id)
        .then((student) => res.json(student))
        .catch((err) => res.status(404).json("Server Error"));
});

app.post("/", async (req, res) => {
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

app.post("/:id", async (req, res) => {
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

app.delete("/:id", async (req, res) => {
    StudentModel.findByIdAndDelete(req.params.id)
        .then(() => res.json("Student deleted."))
        .catch((err) => res.status(404).json("Server Error"));
});


// 404 Error Handler Middleware
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// Error Handling Middleware
// app.use((err, req, res, next) => {
//     res.status(err.status || 500).json({
//         error: {
//             message: err.message
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});