const express = require('express');
const router = express.Router();
// middleware
var fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1: get all the notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add a new  notes using: POST "/api/notes/addnote. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 }),

], async (req, res) => {
    try {
        // destructuring concept
        const { title, description, tag } = req.body;

        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // // Check if a note with the same description already exists
        // const existingNote = await Notes.findOne({ description });
        // if (existingNote) {
        //     return res.status(400).json({ error: "A note with this description already exists" });
        // }

        const note = new Notes({
            user: req.user.id,
            title, description, tag
        });

        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 3: Update an existing  Note using: PUT "/api/notes/addnote. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
    // use destructuring concept to get data from body
    const { title, description, tag } = req.body;
    // empty newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // find the note to be updated and update it

    // If the user is authorized, the note is updated using Notes.findByIdAndUpdate. The {$set: newNote} part specifies that the fields in newNote should be updated. The { new: true } option returns the updated note. The updated note is then sent back in the response as JSON.
    let note = await Notes.findById(req.params.id); //params is parameter
    if (!note) { return res.status(404).send("Not Found") };

    if (!note.user || note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
}   catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
});

// ROUTE 4: Delete an existing  Note using: DELETE "/api/notes/deletenote. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
     try { 
    // find the note to be deleted and delete it.
    let note = await Notes.findById(req.params.id); //params is parameter
    if (!note) {console.log("Note not found");
         return res.status(404).send("Not Found") };
   // Ensure the note has a user field and check ownership
    if ( note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    // Delete the note
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success":"Note has been deleted",note:note });
}  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

});


module.exports = router

