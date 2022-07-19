const fs = require('fs')
const cars = require('../data/car.json')

module.exports = {
    query,
    getById,
    remove,
    save
}


import { storageService } from './async-storage-service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    getEmptyBug,
    save,
    remove,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function getEmptyBug() {
    return {
        title: '',
        severity: '',
    }
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}

function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveCarsToFile() {
    return new Promise((resolve, reject) => {
        const content = JSON.stringify(cars, null, 2)
        fs.writeFile('./data/car.json', content, err => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve()
        })
    })
}

