import express from 'express'
import CRUD from '../controllers/studentController.js';
import isValid from '../middlewares/Valid.js'
const route = express.Router();

//apply middleware for validation
route.use("/add-student", isValid);
//public routes 
route.get("/get-student-by-id/:id", CRUD.getStudentById);
route.post("/add-student", CRUD.insertStudent);
route.post("/update-student/:id", CRUD.updateStudent);
export default route;

