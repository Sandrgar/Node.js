import express from "express"
import { getAll, createById, deleteById, getOneById, updateById } from "./controllers/planets";

const app = express()
const port = 3000

app.use(express.json());

let planets = [
    {
        id: 1,
        name: 'Earth',
    },
    {
        id: 2,
        name: 'Mars',
    },
];

app.get("/api/planets", getAll )

app.get("/api/planets/:id", getOneById)

app.post("/api/planets", createById)

app.put("/api/planets/:id", updateById)

app.delete("/api/planet/:id", deleteById)

app.listen(port, () => {
    console.log("listening on port http://localhost:3000")
})