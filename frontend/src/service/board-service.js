import { storageService } from './async-storage-service.js'

const STORAGE_KEY = 'boardDB'

export const boardService = {
  query,
  getById,
  getEmptyBoard,
  save,
  remove,
  getTask,
  saveTask,
}

function query() {
  return storageService.query(STORAGE_KEY)
}

function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

function getEmptyBoard() {
  return {
    title: '',
    severity: '',
  }
}

function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(STORAGE_KEY, board)
  } else {
    return storageService.post(STORAGE_KEY, board)
  }
}

function _makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function saveTask(boardId, groupId, task, activity) {
  const board = getById(boardId)
  const group = board.groups.find((group) => group._id === groupId)
  const taskIdx = group.tasks.findIndex((currTask) => currTask._id === task._id)
  group.tasks[taskIdx] = task

  // TODO: find the task, and update
  //   board.activities.unshift(activity)
  //   saveBoard(board)
  // return board
  // return task
}

function getTask({ boardId, groupId, taskId }) {
  return query().then((boards) => {
    return boards
      .find((board) => board._id === boardId)
      .groups.find((group) => groupId === group.id)
      .tasks.find((task) => task.id === taskId)
  })
}
