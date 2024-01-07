const generateAccessToken  = require("./generateAccess")

const token =  async() => {
   const token = await generateAccessToken()
   console.log(token)
}
token()