import express from 'express';
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/audioSettings', (req, res)=>{

    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})