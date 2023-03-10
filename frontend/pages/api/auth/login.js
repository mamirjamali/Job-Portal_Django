// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie'
import axios from "axios"

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body
    try {

      const response = await axios.post(`${process.env.API_URL}/api/token/`, {
        username,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (response.data.access) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", response.data.access, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 15, //15 days
            sameSite: "Lax",
            path: "/",
          })
        ])
        
        return res.status(200).json({
          success: true
        })
        
      }

    } catch (error) {

       return res.status(error.response.status).json({
         error: error.response.data.error
       })
    }
  }
}
