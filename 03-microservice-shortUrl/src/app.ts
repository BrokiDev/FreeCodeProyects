import express from 'express'
import morgan from 'morgan'
import { apiRoute } from './routes'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use('/api/shorturl',apiRoute);



export default app;