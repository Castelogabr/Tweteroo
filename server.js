import express from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = (req.body);
    const usuario = { username, avatar }
    users.push(usuario);
    res.send("OK")
})

server.get("/tweets", (req, res) => {
    res.send(tweets.slice(-10).reverse());
});



server.post("/tweets", (req, res) => {
    const tweet = req.body
    const user = users.find(usuario => usuario.username === tweet.username)
    const emptyuser = users.find(usuario => usuario.username === "")
    
    if (emptyuser){
        return res.status(401).send("UNAUTHORIZED")
    }
    if (!user){
        return res.status(401).send("UNAUTHORIZED")
    }

    tweets.push({... tweet, avatar: user.avatar})
    res.send(tweet)
})



server.listen(5000, () => console.log('Servidor conectado'));


