import { DB } from '../DB/DB.js'
import { DataTypes } from 'sequelize'

export const TaskModel = DB.define('tasks', {
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'Completada'),
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  creation_date: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
