import { TaskModel } from '../model/TaskModel.js'
import { validateTaskData } from '../validations/validations.js'

export async function getTasks(req, res) {
  try {
    const tasks = await TaskModel.findAll()
    res.status(200).json({ tasks })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ errorMessage: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function createTask(req, res) {
  try {
    const validations = validateTaskData(req.body, true)
    if (!validations.isValidData) return res.status(400).json({ errorMessage: data.errorMessage })

    const newTask = await TaskModel.create({ ...req.body })
    res.status(201).json({ newTask, successMessage: 'Tarea creada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ errorMessage: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function deleteTask(req, res) {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ errorMessage: 'Falta el ID de la tarea' })

    const taskToDelete = await TaskModel.findByPk(id)
    if (!taskToDelete) return res.status(404).json({ errorMessage: 'No se ha podido borrar la tarea o ya ha sido eliminada' })

    await taskToDelete.destroy()
    res.status(200).json({ taskToDelete, successMessage: 'Tarea eliminada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ errorMessage: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function editTask(req, res) {
  try {
    const { id } = req.params
    const { task, priority, status } = req.body

    const taskToUpdate = await TaskModel.findByPk(id)
    if (!taskToUpdate) return res.status(404).json({ errorMessage: 'Tarea no encontrada' })

    const validation = validateTaskData(req.body)
    if (!validation.isValidData) return res.status(400).json({ errorMessage: data.errorMessage })

    if (task) taskToUpdate.task = task
    if (priority) taskToUpdate.priority = priority
    if (status) taskToUpdate.status = status

    await taskToUpdate.save()
    res.status(200).json({ taskToUpdate, successMessage: 'Tarea actualizada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ errorMessage: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}
