import Account from "../models/Account.js";
import Idea from "../models/Idea.js";

export async function getAccount(req, res) {
    let { id } = req.params
    try {
        let account = await Account.findById(id)

        res.send(account)

    }
    catch (err) {
        res.status(500).send({ msg: "error fetching student" })
    }

}


export async function getAccounts(req, res) {

    try {
        let accounts = await Account.find()

        let adminRemoved = accounts.filter(account => account.userType != "admin")
        res.send(adminRemoved)
    }
    catch (err) { res.status(500).send("error getting students") }


}

export async function deleteAccount(req, res) {

    try {
        await Account.findByIdAndDelete(req.params.id)
        await Idea.deleteMany({ studentId: req.params.id })
        res.status(200).send("student deleted")
    }
    catch (err) { res.status(500).send("error getting students") }


}

export default getAccount