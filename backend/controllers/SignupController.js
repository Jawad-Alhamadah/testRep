import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Account from "../models/Account.js"

async function signup(req, res) {

    const { email, password, name } = req.body

    try {

        if (password < 6) {
            return res.status(400).json({ mess: "Password length must be atleast 6" })
        }
        let account = await Account.findOne({ email })
        if (account) {
            return res.status(400).json({ mess: "email already exists" })
        }


        let hashed = await bcrypt.hash(password, 10)

        let newAccount = new Account({ password: hashed, email, name, userType: "student" })

        let token = await jwt.sign({ id: newAccount._id, newAccount: email }, process.env.JWT_secret, { expiresIn: "2h" })

        await newAccount.save()

        res.status(200).send({ messgage: "user created", token: token })



    }
    catch (err) {

        res.status(500).send(err.message)

    }


}

export default signup