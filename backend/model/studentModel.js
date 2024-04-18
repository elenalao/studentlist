const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    studentNumber: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "studentCollection",
  }
);

const studentModel=mongoose.model("Student",studentSchema);
module.exports=studentModel;