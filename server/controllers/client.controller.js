const express = require('express')
const path = require('path')
const fs = require("fs")

module.exports = (expressApp) => {
    expressApp.use('/', express.static(path.resolve(process.cwd(), 'build')))
    expressApp.use('/login', (req, res) => {
        res.set('Content-Type', 'text/html');

        const indexContent = fs.readFileSync(path.resolve(process.cwd(), 'build', 'index.html'));
        res.send(indexContent)
    })
}
