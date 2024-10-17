import { Router } from "express";
import jwt from 'jsonwebtoken';
import signup from "../controllers/SignupController.js"
import login from "../controllers/LoginController.js"

import { getAllIdeas, postIdea } from "../controllers/IdeasController.js";
import { getAccount, getAccounts,deleteAccount } from "../controllers/AccountsController.js"
import { getIdeasByStudent, getIdeaById } from "../controllers/IdeasController.js";
import { Admin_auth, Student_auth,General_Auth } from "../authorize/authorize.js";
import { updateIdea } from "../controllers/IdeasController.js";
import { deleteIdea } from "../controllers/IdeasController.js";
const router = Router()


router.get("/admin/student/:id",)
router.patch("/admin/updateIdea/comment/:id", Admin_auth, updateIdea)

router.patch("/admin/updateIdea/:id", Student_auth, updateIdea)

router.patch("/student/updateIdea/:id", Student_auth, updateIdea)

router.delete("/admin/student/delete/:id", Admin_auth, deleteAccount)
router.delete("/student/idea/delete/:id",Student_auth,deleteIdea)

router.post("/ideas", General_Auth,postIdea)

router.post("/login", login)
router.post("/signup", signup)


router.get("/ideas", getAllIdeas)

router.get("/ideas/:id", getIdeaById)

router.get("/students", getAccounts)
router.get("/students/:id", getAccount)

router.get("/ideas/bystudent/:id", getIdeasByStudent)

export default router