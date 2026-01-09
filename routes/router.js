import { Router } from 'express'
import { getTasks, createTask, deleteTask, editTask } from '../controller/controller.js'

export const router = Router()

router.get('/tasks', getTasks)
router.post('/create', createTask)
router.delete('/delete/:id', deleteTask)
router.patch('/edit/:id', editTask)
