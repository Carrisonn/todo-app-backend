import { TaskModel } from '../model/TaskModel.js'
import { validateData } from '../validations/validations.js'

export async function getTasks(req, res) {
  try {
    const tasks = await TaskModel.findAll()
    res.status(200).json({ tasks })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ message: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function createTask(req, res) {
  const { isValidData, validationMessage } = validateData(req.body, true)
  if (!isValidData) return res.status(400).json({ message: validationMessage })

  try {
    const newTask = await TaskModel.create(req.body)
    res.status(201).json({ task: newTask, message: 'Tarea creada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ message: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Falta el ID de la tarea' })

  try {
    const taskToDelete = await TaskModel.findByPk(id)
    if (!taskToDelete) return res.status(404).json({ message: 'No se ha podido borrar la tarea o ya ha sido eliminada' })

    await taskToDelete.destroy()
    res.status(200).json({ task: taskToDelete, message: 'Tarea eliminada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ message: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}

export async function editTask(req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Falta el ID de la tarea' })

  const { isValidData, validationMessage } = validateData(req.body)
  if (!isValidData) return res.status(400).json({ message: validationMessage })

  const { task, priority, status } = req.body
  try {
    const taskToUpdate = await TaskModel.findByPk(id)
    if (!taskToUpdate) return res.status(404).json({ message: 'Tarea no encontrada' })

    if (task) taskToUpdate.task = task
    if (priority) taskToUpdate.priority = priority
    if (status) taskToUpdate.status = status

    await taskToUpdate.save()
    res.status(200).json({ task: taskToUpdate, message: 'Tarea actualizada correctamente' })
  } catch (error) {
    //console.log(error)
    res.status(500).json({ message: 'Servicios no disponibles en este momento, vuelve más tarde' })
  }
}
