import express from 'express'
import { createExercises, createUser, getUser, getUserLogs } from '../controller/userControllers'


export const userRouter = express.Router()


userRouter.route('/').post(createUser).get(getUser)
userRouter.route('/:id/exercises').post(createExercises)
userRouter.route('/:id/logs').get(getUserLogs)