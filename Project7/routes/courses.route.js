const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { middleware } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verifyToken');

router.route('/')
        .get(courseController.getCourses)
        .post(verifyToken, middleware(), courseController.addCourse)

router.route('/:courseID')
        .get(courseController.getSingleCourse)
        .put(courseController.updateCourse)
        .delete(courseController.deleteCourse);

module.exports = router;