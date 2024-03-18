import { NextFunction, Request, Response } from "express";
import dns from "dns";

export const lookupDns = (req: Request, res: Response, next: NextFunction) => {
    const originalUrl = req.body.url;

    if (!originalUrl) {
        return res.status(400).json({ error: 'url is required' });
    }

    try {
        const url = new URL(originalUrl);
        const hostname = url.hostname;

        dns.lookup(hostname, (err, address) => {
            if (err) {
                return res.json({ error: 'invalid url'});
            } else {
                next();
            }
        });
    } catch (error) {
        return res.json({ error: 'invalid url'});
    }
};