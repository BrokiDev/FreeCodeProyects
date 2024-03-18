import { Request, Response } from "express";

export const getDate = (req: Request, res: Response) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
};

export const getDateId = (req: Request, res: Response) => {
  const dateId = req.params.date;
  let date: Date;

  if (!isNaN(Number(dateId))) {
    const milliseconds = parseInt(dateId);
    date = new Date(milliseconds);
  } else {
    date = new Date(dateId);
  }

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid Date." });
  }

  res.status(200).json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
};
