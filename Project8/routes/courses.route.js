const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');
const { middleware } = require('../middleware/validationSchema');
const verifyToken = require('../middleware/verifyToken');
const userRoles = require('../utils/userRoles');
const allowedTo = require('../middleware/allowedTo');

router.route('/')
        .get(courseController.getCourses)
        .post(verifyToken, allowedTo(userRoles.MANGER), middleware(), courseController.addCourse)

router.route('/:courseID')
        .get(courseController.getSingleCourse)
        .put(courseController.updateCourse)
        .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANGER), courseController.deleteCourse);

module.exports = router;