import express from "express";
import { getDate, getDateId } from "../controller/apiController";


export const apiRoute = express.Router();

apiRoute.route('/').get(getDate);
apiRoute.route('/:date').get(getDateId);