import express, { Request, Response } from 'express';
import cors from 'cors';
import { AddressInfo } from 'net'

const app = express();

app.use(express.json());
app.use(cors());

// ENDPOINTS

// get
app.get("/playlists", async (req: Request, res: Response):Promise<void> => {


   try {

       INSERT INTO Rating(id, comment, rate, movie_id)
      VALUES(
         "001",
         "Muito bom!",
         7,
         "004"
      );
   


      res.status(200).send("Sucess");
   } catch (err: any) {

      res.status(400).send(err.message)
   }
});



const server = app.listen(process.env.PORT || 3001, () => {

   if (server) {
      const address = server.address() as AddressInfo
      console.log(`Running in : http://localhost:${address.port}`)

   } else {
      console.error("failure upon starting server !")
   }

});
