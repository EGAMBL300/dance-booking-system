const express = require('express');
const router = express.Router();
const organiserController = require('../controllers/organiserController');
const userController = require('../controllers/userController');
const { requireLogin, requireOrganiser } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/dashboard', organiserController.showDashboard);

router.get('/dashboard/add-course', requireLogin, requireOrganiser, organiserController.showAddCourse);
router.post(
    '/dashboard/add-course',
    requireLogin,
    requireOrganiser,
    upload.single('courseImage'),
    organiserController.addCourse
  );
router.post('/dashboard/courses/:id/delete', requireLogin, requireOrganiser, organiserController.deleteCourse);
router.get('/dashboard/courses/:id/edit', requireLogin, requireOrganiser, organiserController.showEditCourse);
router.post('/dashboard/courses/:id/edit', requireLogin, requireOrganiser, organiserController.updateCourse);

router.get('/dashboard/manage-organisers', requireLogin, requireOrganiser, userController.showOrganisers);
router.post('/dashboard/organisers/:id/delete', requireLogin, requireOrganiser, userController.deleteOrganiser);



module.exports = router;
