const Course = require('../models/course.model');
const { validationResult } = require('express-validator');
const status = require('../utils/httpStatusText');

const getCourses = (async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page;
    const skip = (page - 1) * limit;
    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip);
    res.json({
        status: status.SUCCESS ,
        data: {
            courses
        }
    });
});

const getSingleCourse = (async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseID);

        if (!course) {
            return res.status(404).json({
                status: status.FAIL,
                data: {
                    course: null
                }
            });
        }
        return res.json({
            status: status.SUCCESS,
            data: {
                course
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: status.ERROR,
            data: null,
            message: error.message,
            code: 400
        })
    }
});

const addCourse = (async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: status.FAIL,
            data: errors.array()
        });
    }

    const course = new Course(req.body); // data save in the runtime only
    await course.save(); // data saved in the database successfuly

    res.status(201).json({
        status: status.SUCCESS,
        data: {course: course}
    });
});

const updateCourse = (async (req, res) => {
    const courseID = req.params.courseID;
    try {
        const course = await Course.findByIdAndUpdate(courseID, { $set: { ...req.body } });
        if (!course) {
            return res.status(404).json({
                status: status.FAIL,
                data: null,

            });
        }
        return res.status(200).json({
            status: status.SUCCESS,
            data: {
                course: course
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: status.ERROR,
            data: {
                message: error.message
            }
        });
    }

});

const deleteCourse = (async (req, res) => {
    await Course.deleteOne({ _id: req.params.courseID });
    res.status(200).json({ 
        status: status.SUCCESS,
        data: null
    });
});

module.exports = {
    getCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}