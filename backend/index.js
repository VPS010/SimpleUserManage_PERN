const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
})


app.get("/users", async (req, res) => {
    try {
        const users = await Prisma.user.findMany({});
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});


//get users by id
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ error: "An error occurred while fetching user" });
    }
});


//create user
app.post("/users", async (req, res) => {
    const user = req.body;
    console.log(user);
    try {
        const newUser = await Prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
            }
        });
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json({ error: "An error occurred while creating user" });
    }
});


//update user
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const updatedUser = await Prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: user.name,
                email: user.email,
            }
        });
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: "An error occurred while updating user" });
    }
});


//delete user
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
        res.status(500).json({ error: "An error occurred while deleting user" });
    }
});



app.listen(5000, () => {
    console.log('Server is running on port 3000');
})


app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({ error: "Internal server error" });

});

