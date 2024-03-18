import express from "express";
import { convertShortUrl, getDateId } from "../controller/apiController";
import { lookupDns } from "../middleware/lookupDns";


export const apiRoute = express.Router();

apiRoute.route('/').post(lookupDns,convertShortUrl);
apiRoute.route('/:id').get(getDateId);