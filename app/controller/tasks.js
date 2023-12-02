const Task = require('../models/task');
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).lean()
        // res.status(200).json({ tasks, amount: tasks.length });
        // res.status(200).json({ tasks});
        res.status(200).render('home', {tasks});
        // res.status(200).render('../../views/home', { tasks });
    }
    catch (error) { 
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
        const task =   await Task.create(req.body)
        res.status(200).redirect('/home')
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task =  await Task.findOne({_id: taskID}).lean()
        if(!task){
            return res.status(404).json({msg: `Task not found with id ${taskID}`});
        }
        res.status(200).render('edit', {task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task =  await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        }).lean();
        if(!task){
            return res.status(404).json({msg: `Task not found with id ${taskID}`});
        }
        res.status(200).redirect('/home')
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task =  await Task.findOneAndDelete({_id: taskID}).lean();
        if(!task){
            return res.status(404).json({msg: `Task not found with id ${taskID}`});
        }
        res.status(200).redirect('/home')
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }