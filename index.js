import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';
import fs from 'fs';
import { Worker} from 'worker_threads';

const {promises} = fs;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV == 'development') {
     console.log('development mode');
    } else {
    console.log('production mode');
    }
    

const app = express();

//1
// app.get('/', (req, res)=>{
//     res.send('<h1>Wellcome</h1>');
// })

// app.listen(PORT, ()=> {
//     console.log(`Server started on http://localhost:${PORT}`);
// })

//2
// app.get('/', (req, res) => {
//     fs.readFile('./package.json', (err, data) => {
//       const packageJson = JSON.parse(data);
//       const welcomeMsg = '<h1>Welcome</h1>';
//       const jsonInfo = `
//       <h1>JSON TEXT</h1>  
//       <pre>
//         {
//           "name": "${packageJson.name}",
//           "version": "${packageJson.version}",
//           "description": "${packageJson.description}",
//           "main": "${packageJson.main}",
//           "type": "${packageJson.type}",
//           "scripts": ${JSON.stringify(packageJson.scripts, null, 2)},
//           "keywords": ${JSON.stringify(packageJson.keywords, null, 2)},
//           "author": "${packageJson.author}",
//           "license": "${packageJson.license}"
//         }
//         </pre>
//       `;
//       const info = welcomeMsg + jsonInfo;
//       fs.writeFile('info.html', info, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//       });
//       res.setHeader('Content-Type', 'text/html');
//       res.write(info);
//       res.end();
//     });
//   });
  
// app.listen(PORT, ()=> {
//     console.log(`Server started on http://localhost:${PORT}`);
// })

//3
app.get('/', async (req, res) => {
    try {
      const data = await promises.readFile('./package.json');
      const packageJson = JSON.parse(data);
      const welcomeMsg = '<h1>Welcome</h1>';
      const jsonInfo = `
        <h1>JSON TEXT</h1>  
        <pre>
          {
            "name": "${packageJson.name}",
            "version": "${packageJson.version}",
            "description": "${packageJson.description}",
            "main": "${packageJson.main}",
            "type": "${packageJson.type}",
            "scripts": ${JSON.stringify(packageJson.scripts, null, 2)},
            "keywords": ${JSON.stringify(packageJson.keywords, null, 2)},
            "author": "${packageJson.author}",
            "license": "${packageJson.license}"
          }
        </pre>
      `;
      const info = welcomeMsg + jsonInfo;
      await promises.writeFile('info.html', info);
      res.setHeader('Content-Type', 'text/html');
      res.write(info);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  app.listen(PORT, ()=> {
      console.log(`Server started on http://localhost:${PORT}`);
  })
  




//callback
// console.log('start');//1
// fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
//  if (err) {
//  console.error(err);
//  }
//  console.log(content.toString());//3
// });
// console.log('end');//2

//Promise
// console.log('start'); //1
// function readFilePromise(filePath) {
//  return new Promise((resolve, reject) => {
//  try{
//  const data = fs.readFileSync(filePath);
//  resolve(data.toString())
//  } catch(error){
//  reject(error)
//  }})}

// readFilePromise(path.join(__dirname, './package.json'))
//  .then(data => {console.log(data)}) //3
//  .catch(err => {console.error(err)});
// console.log('end');//2

//Async Await
// const filePath = path.join(__dirname, './package.json')

// async function getData (path) {
//     try {
//         const fileData = await promises.readFile(path)
//         console.log(fileData.toString());
//     } catch (error) {
//         console.log(error)
//     }

// }
// console.log('start');
// getData(filePath);
// console.log('end');

// workerData
// const worker = new Worker('./worker.js', { workerData: 'ABCDEFG' });
// worker.on('message', (msg) => {
//  console.log(`Answer: ${msg}`);
//  });
 
//  worker.on('error', (err) => {
//  console.error(err);
//  });
 
//  worker.on('exit', (code) => {
//  console.log(`Worker finished with code: ${code}`);
//  });
