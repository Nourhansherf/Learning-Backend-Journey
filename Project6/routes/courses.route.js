const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');
const {middleware} = require('../middleware/validationSchema');

router.route('/')
        .get(courseController.getCourses)
        .post(middleware(), courseController.addCourse)

router.route('/:courseID')
        .get(courseController.getSingleCourse)
        .put(courseController.updateCourse)
        .delete(courseController.deleteCourse);

module.exports = router;