import bcrypt from "bcrypt";
import { Router } from "express";
import User from "../database/createSchema.js";


const router = Router();

  router.post("/signup", async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // Creating a new mongoose user from input data
    const user = new User(body);

    // Generating salt to hash password
    const salt = await bcrypt.genSalt(10);

    // Setting user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    user.save().then((doc) => res.status(201).send(doc));


  });