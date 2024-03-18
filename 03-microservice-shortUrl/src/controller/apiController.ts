import { Request, Response } from "express";
interface UrlDatabase {
  [shortUrl: string]: string;
}

const DB:UrlDatabase = {};
let shortUrl = 0;

export const convertShortUrl = (req: Request, res: Response) => {
  const originalUrl = req.body.url;
  shortUrl++;
  DB[shortUrl] = originalUrl;

  res.status(201).json({
    original_url:originalUrl,
    short_url:shortUrl
  })
};

export const getDateId = (req: Request, res: Response) => {
  const shorturl = req.params.id;

  if(!DB[shorturl]){
    return res.status(404).json({
      error: 'Short URL not found'
    })
  }

  res.redirect(DB[shorturl])
};
