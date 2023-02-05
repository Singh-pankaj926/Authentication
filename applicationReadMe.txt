script in package.json behave like a script.
writing as follows in script:
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js"
}
npm run keyword(start/server) -> is the implict command
executing npm run start, will run the code same as node index.js where we have run the server every time we make any new changes in the code.
executing npm run server, will run the code with the nodemon and everytime we make changes and save the code, nodemon will itself run the server.
