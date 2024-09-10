import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/games", async (req,res) => {
    const games = await prisma.game.findMany();
    res.json(games);
});

app.listen(5100, () => {
    console.log("Server running on localhost:5100");
})
