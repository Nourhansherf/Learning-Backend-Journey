const Course = require('../models/course.model');
const { validationResult} = require('express-validator');

const getCourses = (async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

const getSingleCourse = (async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseID);

        if (!course) {
            return res.status(404).json({ msg: "course not found" });
        }
        return res.json(course);
    } catch (error) {
        return res.status(400).json({ msg: "invalid ID" })
    }
});

const addCourse = (async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const course = new Course(req.body); // data save in the runtime only
    await course.save(); // data saved in the database successfuly

    res.status(201).json(course);
});

const updateCourse = (async (req, res) => {
    const courseID = req.params.courseID;
    try {
        const course = await Course.findByIdAndUpdate(courseID, { $set: { ...req.body } });
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        return res.status(200).json(course);
    } catch (error) {
        return res.status(400).json({ msg: "Invalid ID" });
    }

});

const deleteCourse = (async (req, res) => {
    const course = await Course.deleteOne({ _id: req.params.courseID });
    res.status(200).json({ success: true, msg: course });
});

module.exports = {
    getCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}