const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
  addBoard,
  getBoards,
  deleteBoard,
  getBoardById,
  updateBoard,
} = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:id', getBoardById)
router.post('/', log, addBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoard)

//GROUP

// router.post('/group', log, addGroup)
// router.put('/group/:id', updateGroup)
// router.delete('/group/:id', deleteGroup)

// //TASK

// router.post('/task', log, addTask)
// router.put('/task/:id', updateTask)
// router.delete('/task/:id', deleteTask)

module.exports = router
