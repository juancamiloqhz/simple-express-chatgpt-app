import { Configuration, OpenAIApi } from 'openai'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const configuration = new Configuration({
  organization: 'org-xxxxxxxxxxxxxxxxxxxx',
  apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
})

const openai = new OpenAIApi(configuration)

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
  const { messages } = req.body
  console.log(messages)
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are DesignGPT a helpful assistant graphics design chatbot.' },
      ...messages
      // { role: 'user', content: message }
    ]
  })
  res.json({
    completion: completion.data.choices[0].message
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
