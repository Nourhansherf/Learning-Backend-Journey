#!/usr/bin/env node

import { program } from "commander";
import inquirer from 'inquirer';
import fs from 'fs';

const filePath = './courses.json';

const questions = [
    {
        type: 'input',
        name: "title",
        message: "What is your course title",

    },
    {
        type: 'number',
        name: "price",
        message: "What is your course price",

    }
]

program
    .name('Course manager')
    .description('CLI to make courses')
    .version('1.0.0')

program
    .command('add')
    .alias('a')
    .description('Add a new course')
    .action(() => {

        inquirer
            .prompt(questions)
            .then((answers) => {
                if (fs.existsSync(filePath)) { // Check if the file exists
                    fs.readFile(filePath, 'utf-8', (err, fileContent) => {
                        if (err) {
                            console.log(`error ${err}`);
                            process.exit();
                        }
                        console.log(`file content : ${fileContent}`);
                        const fileContentAsJson = JSON.parse(fileContent);
                        fileContentAsJson.push(answers);
                        fs.writeFile(filePath, JSON.stringify(fileContentAsJson), 'utf-8', () => {
                            console.log(`Course addes successfully`);
                        })
                    })
                } else { // if the file is not exist
                    fs.writeFile(filePath, JSON.stringify([answers]), 'utf-8', () => {
                        console.log(`Course addes successfully`);
                    })
                }
                
            })
    })

program
    .command('list')
    .alias('l')
    .description('List all courses')
    .action(() =>
    {
        fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
                console.log(`Error => ${err}`);
                process.exit();
            }
            console.table(JSON.parse(content));
        })
    })

program.parse();