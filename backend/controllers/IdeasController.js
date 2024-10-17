
import Idea from "../models/Idea.js";
import Account from "../models/Account.js";
export async function getAllIdeas(req, res) {
    let ideas = await Idea.find()

    res.status(200).send(ideas)


}


export async function postIdea(req, res) {

    let idea = new Idea(req.body)
    try {
        await idea.save()
        res.status(200).send(idea)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: "Error saving post" })
    }

}

export async function deleteIdea(req, res) {
    const { id } = req.params
    try {
        let idea = await Idea.findByIdAndDelete(id)
        return res.status(200).send({ msg: "record deleted", idea })
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error Deleteing an Idea" })
    }

}

export async function getIdeasByStudent(req, res) {
    const { id } = req.params


    let studentIdeas = await Idea.find({ studentId: id })
    return res.status(200).send(studentIdeas)

}

export async function getIdeaById(req, res) {
    const { id } = req.params


    let idea = await Idea.findById(id)
    return res.status(200).send(idea)

}

export async function updateIdea(req, res) {
    const { id } = req.params

    try {
        let idea = await Idea.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).send(idea)
    }
    catch (err) { res.status(500).send({ msg: "failed to update idea" }) }


}

export default getAllIdeas


