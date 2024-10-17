import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Account from "../models/Account.js"

async function login(req, res) {

    const { email, password } = req.body

    try {
        let account = await Account.findOne({ email })
        if (!account) {
            return res.status(400).json({ mess: "user not found" })
        }

        let isMatched = await bcrypt.compare(password, account.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "incorrct password" })
        }
        let token = await jwt.sign({ id: account._id, email: account.email }, process.env.JWT_secret, { expiresIn: "2h" })

        return res.status(200).send({ msg: "login sucessful", token: token })



    }
    catch (err) {
        res.status(500).send({ msg: "server error while loging in " })

    }


}

export default login