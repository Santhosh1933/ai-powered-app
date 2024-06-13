import moment from "moment";
import { Schema, model, models } from "mongoose";

const questionsSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
  questions: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  jobDescription: { type: String, required: true },
  yearOfExperience: { type: String, required: true },
  level: { type: String, required: true },
  dateOfCreation: {
    type: String,
    default: () => moment().format("MMM Do YY"),
  },
});

const Questions = models.Questions || model("Questions", questionsSchema);

export default Questions;
