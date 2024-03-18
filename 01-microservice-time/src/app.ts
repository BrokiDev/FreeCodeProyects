import express from 'express'
import morgan from 'morgan'
import { apiRoute } from './routes'

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use('/api',apiRoute);



export default app;