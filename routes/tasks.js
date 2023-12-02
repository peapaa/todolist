const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTask, updateTask, deleteTask }  = require('../app/controller/tasks');
router.route('/').get(getAllTasks).post(createTask);

router.route('/:id/edit').get(getTask)
router.route('/:id').put(updateTask)
router.route('/:id').delete(deleteTask);




module.exports = router;