const acceptedDomains = ['http://localhost:5173', 'https://todo-app-carrison.netlify.app']

export const corsOptions = {
  origin: (origin, callback) => {
    !origin || acceptedDomains.includes(origin)
      ? callback(null, true)
      : callback(new Error('No permitido por CORS'))
  }
}
