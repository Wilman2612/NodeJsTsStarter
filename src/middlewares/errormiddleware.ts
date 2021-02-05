import express from 'express'
import { HttpError } from 'http-errors'

export default function (err: any, req: express.Request, res: express.Response, _next: any) {
  let status = 500
  if (err instanceof HttpError) status = err.statusCode
  res.status(status).json({ status, message: req.t(err.message) })
}
