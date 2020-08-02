

import { Router, Application, Request, Response, NextFunction } from "express";
const Meme = require("../models/Meme");

const router = Router();

router.get("/show", async (req: Request, res: Response) => {
  try {
    const meme = await Meme.find({ id: req.query.id });
    res.status(200).json(meme);
  } catch (e) {
    console.log("Error: ", e.message);
  }
});

router.get("/getlist", async (req: Request, res: Response) => {
  try {
    const allMemes: [] = await Meme.find({});

    res.status(200).json(allMemes);
  } catch (e) {
    console.log("Error", e.message);
  }
});

router.post("/likememe", async (req: Request, res: Response) => {
  try {
    console.log("meme to like: ", req.body);
    const { id, email } = req.body;
    const memeBefore = await Meme.findOne({ id: id });
    if (memeBefore.likedBy.some((user: string) => user === email)) {
      await Meme.updateOne(
        { id: id },
        { likedBy: memeBefore.likedBy.filter((user: string) => user !== email) }
      );
      res.status(201).json(`Meme with id ${id} was disliked`);
    } else {
      await Meme.updateOne(
        { id: id },
        { likedBy: [...memeBefore.likedBy, email] }
      );
      res.status(201).json(`Meme with id ${id} was liked`);
    }
  } catch (e) {
    console.log("Error", e.message);
  }
});

module.exports = router;
