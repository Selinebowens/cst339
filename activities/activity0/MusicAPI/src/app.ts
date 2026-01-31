import express, { Request, Response } from 'express';

// Express application instance
const app = express();
// Create port number the server will listen on
const port = 3000;

// Route that responds to GET requests at the root path '/'
// req (Request) contains information about the incoming HTTP request
// res (Response) is used to send the HTTP response back to the client 
app.get('/', (req: Request, res: Response) => {
  // Send the text 'Hello World from TypeScript with nodemon!' as the response
  res.send('Hello World from TypeScript with nodemon!');
});
// Start the server and have it listen on the specified port
// The callback function runs once the server successfully starts
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});