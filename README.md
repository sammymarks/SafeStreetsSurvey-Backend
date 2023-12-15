<a id="top"></a>
# Welcome to Safe Streets Survey

## Overview
**Safe Streets Survey** is a Mobile-friendly browser application to help local organizations crowdsource community feedback on local infrastructure issues.

**In partnership with the [Chicago 40th Ward](https://40thward.org/)**, the initial version of Safe Streets Survey will replace the current community tool to identify gaps in local pedestrian and cyclist infrastructure.

**The goal** is to and enable simple and detailed user feedback and streamline Ward triage of issues for bigger-picture resolution.

**Down the road**, we are looking to expand this into an open source initiative for any organization to create a location-based project to survey local infrastructure, including other governmental groups, park and community advisory boards, etc.

***Note** - This repo is for the application back-end. The full application ReadMe can be  found found [here](https://github.com/sammymarks/SafeStreetsSurvey-Frontend). **The deployed backend** can be found [here](https://safe-streets-survey-backend-b894985790a9.herokuapp.com/).*



**Table of contents:**
1. [Backend Structure](#structure)
1. [Controllers](#controllers)
1. [All Other Documentation](#documentation)

<a id="structure"></a>
## Structure
- server.js
    - imports
    - middleware
    - API Routes
- db/index.js
    - Mongoose connection to database
- models/index.js
    - Converts all schemas into Mongoose/Mongo models
- models/...
    - Schema definition
- controllers/...
    - Controller definition
- seed/seed.js
    - Initial Seed File

<a id="controllers"></a>
## Controllers
- Index
    - `app.get("/", (req, res) => res.send("This is Index"));`
- User
    - Get All Users\
     `app.get("/users", userController.getAll);`
    - Get or Post a single user with Auth0 authentiaction\
    `app.post("/users/auth/check-user", jwtCheck, userController.getOrCreateByAuth0ID)`
- Organization
    - Get All Organizations\
    `app.get("/organizations", organizationController.getAll);`
- OrganizationImage
    - WIP
- Project
    - Get All Projects\
    `app.get("/projects", projectController.getAll);`
    - Get All Projects joined by a single Authenticated User\
    `app.get("/projects/get-by-user", jwtCheck, projectController.getByUserID);`
    - Add (Put) an authenticated User to a Project\
    `app.put("/projects/join/:id", jwtCheck, projectController.addUserToProject)`
- ProjectImage
    - WIP
- Ticket
    - Get all Tickets\
    `app.get("/tickets", ticketController.getAll);`
    - Create (post) new Ticket by an authenticated User\
    `app.post("/tickets/create-new", jwtCheck, ticketController.postTicketsAndImages);`
- TicketImage
    - Get All Ticket Images\
    `app.get("/ticketimages", ticketImageController.getAll);`

<a id="documentation"></a>
## All Other Documentation
**The ReadMe for the [front-end application](https://github.com/sammymarks/SafeStreetsSurvey-Frontend)** contains:
- Entity Relationship Diagram
- Dependencies and packages
- .env requirements
- Other documentation (planning and backlog)