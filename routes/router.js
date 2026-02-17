import { Router } from 'express'
import { getTasks, createTask, deleteTask, editTask } from '../controller/controller.js'

export const router = Router()

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.delete('/tasks/:id', deleteTask)
router.patch('/tasks/:id', editTask)
router.put('/tasks/:id', editTask)