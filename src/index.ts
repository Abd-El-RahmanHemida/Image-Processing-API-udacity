import express, { Application, Request, Response } from 'express';
import routes from './routes/route';
import {readdirSync } from 'fs';
import path from 'path';

const imagesFullPath:string = path.resolve(__dirname, '../images/full');

const availableNamesList:string = readdirSync(imagesFullPath).map(
    (filename: string): string => filename.split('.')[0]).join(' || ');

const port = 3000;
// create server
const app: Application = express();

// add routes
app.use(routes);


app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>Welcome to my image-processing-api</h1>
    <p>Please ,use 
    <a href="/api/images">/api/images</a>
    To see my app You must use a valid filename.
    <br>optionally use width and height to set the size
    </p>
    
    <p>the valid names is :${availableNamesList}
    <br>
    </p>
     Example: <br>
     <ul>
     <li>
     <a href='/api/images?filename=fjord'>/api/images?filename=fjord</a>
     </li>
    <li>
    <a href='/api/images?filename=fjord&width=500&height=500'>
    /api/images?filename=fjord&width=500&height=500
    </a>
    </li>
    </ul>`);
});

// start server
app.listen(port, () => {
    console.log(`Server listening at port:${port}`);
});
export default app;
