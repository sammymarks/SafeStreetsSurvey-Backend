const { User,Organization,OrganizationImage,Project,ProjectImage,Ticket,TicketImage,TicketReview } = require('../models/index')

module.exports = {
    getAll,
    getByID,
    getByUserID,
    addUserToProject
}

async function getAll (req,res) {
    try {
        const projects = await Project.find()
            .populate([
                {path: "organization", model: Organization}
            ]).exec()
        res.status(201).send(projects)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}

async function getByID (req,res) {
    try {
        const project = await Project.findById(req.params.id)
        res.status(201).send(project)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getByUserID (req,res) {
    try {
        // const userID = req.body.user_id
        console.log("getByID controller called")
        console.log(req.query)
        const projects = await Project.find({ "userParticipants" : req.query.user_id })
        if (!projects) {
            return res.status(404).json({ message: 'No projects found for this user' });
        }
        res.status(201).send(projects)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function addUserToProject (req,res) {
    try {
        // console.log(req.body)
        const ticket = req.body.ticket
        const images = req.body.images
        console.log("ticket", ticket)
        const newTicket = await Ticket.create({
            "project": ticket.project,
            "submittedBy": ticket.submittedBy,
            "addressLat": ticket.addressLat,
            "addressLong": ticket.addressLong,
            "issue": ticket.issue,
            "location": ticket.location,
            "comments": ticket.comments
        })
        // console.log("newTicket", newTicket)
        console.log("imagesfile", images.uploadFiles)
        // for (const image of images) {
            const newImage = await TicketImage.create({
                "ticket": newTicket._id,
                "imageDataBase64": images.uploadFiles
            })

        // }

        res.status(201).send("ticket")
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

