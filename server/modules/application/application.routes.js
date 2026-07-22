const express = require('express');
const router = express.Router();
const applicationController = require('./application.controller');
const verifyToken = require('../../middleware/verifyToken');

// Protect all routes in this module
router.use(verifyToken);

router.post('/', applicationController.createApplication);
router.get('/', applicationController.getApplications);
router.get('/dashboard/stats', applicationController.getDashboardStats);
router.patch('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;