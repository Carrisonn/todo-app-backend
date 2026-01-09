export function validateTaskData(data, isCreation = false) {
  const { task, priority, status } = data

  if (isCreation) {
    if (!task || !priority || !status) return { isValidData: false, errorMessage: 'Faltan datos en el formulario' }
  }

  if ('task' in data && (typeof task !== 'string' || task.trim() === '')) {
    return { isValidData: false, errorMessage: 'El valor de la tarea es inválido' }
  }

  if ('priority' in data && (typeof priority !== 'string' || !['Baja', 'Media', 'Alta'].includes(priority))) {
    return { isValidData: false, errorMessage: 'El valor de la prioridad es inválido' }
  }

  if ('status' in data && (typeof status !== 'string' || !['Pendiente', 'Completada'].includes(status))) {
    return { isValidData: false, errorMessage: 'El valor del estado es inválido' }
  }

  return { isValidData: true }
}
