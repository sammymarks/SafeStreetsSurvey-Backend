const { User,Organization,OrganizationImage,Project,ProjectImage,Ticket,TicketImage,TicketReview } = require('../models/index')

module.exports = {
    getAll,
    getByID,
    getOrCreateByAuth0ID
}

async function getAll (req,res) {
    try {
        const users = await User.find()
        res.status(201).send(users)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    } 
}
async function getByID (req,res) {
    try {
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

async function getOrCreateByAuth0ID (req,res) {
    try {

        //Lookup User by Auth0 sub
        const user = await User.findOne({"auth0sub" : req.headers.auth0sub})
        console.log("user:", user)

        //If User Exists...
        if (user) {
            //Projects where User is a userParticipant
            const projects = await Project.find({"userParticipants" : user._id})
                .populate([
                    {path: "organization", model: Organization},
                ]).exec()
            console.log("projects:", projects)
            
            //Tickets submittedBy User
            const tickets = await Ticket.find({"submittedBy" : user._id})                
            .populate([
                {path: "project", model: Project},
            ]).exec()
            console.log("tickets:", tickets)
            
            //Organizations where User is OrgAdmim
            const orgs = await Organization.find({"orgAdmins": user._id})
            
            //return object
            const userInfo = {
                "user" : user,
                "projects" : projects,
                "tickets" : tickets,
                "orgs" : orgs
            }
            return res.status(201).send(userInfo)
        } 

        //If User does not exist
        const newUser = User.create({
            "auth0sub": req.body.auth0sub,
            "displayName": req.body.displayName,
            "email": req.body.email,
            "isSiteAdmin":req.body.isSiteAdmin,
            "isOrgAdmin": req.body.isOrgAdmin
            })
        const newUserInfo = {
            "user" : newUser,
            "projects" : "[]",
            "tickets" : "[]"
        }
        res.status(201).send(newUserInfo)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}