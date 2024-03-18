import app from './src/app'
import dotenv from 'dotenv'


dotenv.config({path: './.env'})
const PORT = process.env.PORT || 1234


app.listen(PORT, () => console.log(`Server Running at port ${PORT}`))