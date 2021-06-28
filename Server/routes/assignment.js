/*const express = require('express');
const router = express.Router();
const Assignment = require("../models/assignment")

const{
  postassignment,
  saveTextEditorState
//   signin,
//   signout,
} = require("../controllers/assignment");
// const { userSignupValidator } = require("../validator");

// router.post("/assignment" , postassignment);
// router.post("/assignment/", signin);
// router.get("/signout", signout);

// module.exports = router;

router.post("/assignment",
            async (req, res) => {

    const { project_title, project_type, case_type, project_description, short_description, 
      project_cost, project_deadline_from, project_deadline_to, who_can_apply, five_star_can_apply } = req.body;
    
  
      const newAssignment = new Assignment();

      newAssignment.title = project_title;
      newAssignment.assignment_type = project_type;
      newAssignment.case_type = case_type;
      newAssignment.description = project_description;
      newAssignment.short_description = short_description;
      newAssignment.cost = project_cost;
      newAssignment.deadline = project_deadline_to;
      newAssignment.deadline_from = project_deadline_from;
      newAssignment.who_can_apply = who_can_apply;
      newAssignment.five_star_can_apply = five_star_can_apply;
      newAssignment.save((err, assignment) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }
        return res.send({
          success: true,
          message: "Assignment Saved"
        })
      })
    }      
);

module.exports = router;
  

router.post("/saveTextEditorState", saveTextEditorState);
*/