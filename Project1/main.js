// import * as fs from 'node:fs';
// import * as _ from 'lodash';

// read file

// const fileContent = fs.readFileSync('./hello.txt', 'utf-8');
// console.log(`fileContent ${fileContent}`);

// fs.readFile('./hello.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(`error reading file ${err}`);
//     } else {
//         console.log(`fileContent ${data}`);
//     }
// })

// write to file

// fs.writeFile('./users.json', JSON.stringify([
//     {
//         "id": 1,
//         "name": "Nourhan"
//     },
//     {
//         "id": 2,
//         "name": "Mohammed"
//     }
// ]), 'utf-8', (err) => {
//     if (err) {
//         console.log(`error writing file ${err}`);
//     }
//     console.log("Done");
// });

// delete file

// fs.unlink('./users.json', (err) => {
//     if (err) {
//         console.log(`error deleting file ${err}`);
//     }
// })

// streams [readable - writeable]

// const rStream = fs.createReadStream('./hello.txt', 'utf-8');

// rStream.on('data', (chunk) => {
//     console.log(`data ${chunk}`);
// })

console.log("test run:dev");
