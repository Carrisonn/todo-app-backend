import { DB } from '../DB/DB.js'
import { DataTypes } from 'sequelize'

export const TaskModel = DB.define('tasks', {
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('alta', 'media', 'baja'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'completada'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  creation_date: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
