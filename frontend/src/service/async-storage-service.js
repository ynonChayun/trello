export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || _createBoards()
  return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  )
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, _id: _makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

// labels cls {
// 1 - #f2d600
// 2 - #ff9f1a
// 3 - #eb5a46
// 4 - #e377e0
// 5 - #0079bf
// 6 - #51e898
// }

function _createBoards() {
  const boards = [
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/2.jpg',
      archivedAt: 1589983468418,
      createdAt: 1589983468418,
      createdBy: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      style: {},
      labels: [
        {
          id: 'l101',
          title: 'Done',
          color: '#f2d600',
        },
        {
          id: 'l102',
          title: '',
          color: '#ff9f1a',
        },
        {
          id: 'l103',
          title: 'Progress',
          color: '#eb5a46',
        },
        {
          id: 'l104',
          title: '',
          color: '#e377e0',
        },
        {
          id: 'l105',
          title: '',
          color: '#0079bf',
        },
        {
          id: 'l106',
          title: '',
          color: '#51e898',
        },
      ],
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl: 'https://www.google.com',
        },
        {
          _id: 'u102',
          fullname: 'Ynon Chayun',
          imgUrl: 'https://www.google.com',
        },
      ],
      groups: [
        {
          id: 'g101',
          title: 'Group 1',
          archivedAt: 1589983468418,
          tasks: [
            {
              id: 'c101',
              title: 'Replace logo',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'https://www.google.com',
                },
                {
                  _id: 'u102',
                  fullname: 'Ynon Chayun',
                  imgUrl: 'https://www.google.com',
                },
              ],
            },
            {
              id: 'c102',
              title: 'Add Samples',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'https://www.google.com',
                },
                {
                  _id: 'u102',
                  fullname: 'Ynon Chayun',
                  imgUrl: 'https://www.google.com',
                },
              ],
            },
          ],
          style: {},
        },
        {
          id: 'g102',
          title: 'Group 2',
          tasks: [
            {
              id: 'c103',
              title: 'Do that',
              archivedAt: 1589983468418,
              members: [
                {
                  _id: 'u102',
                  fullname: 'Ynon Chayun',
                  imgUrl: 'https://www.google.com',
                },
              ],
            },
            {
              id: 'c104',
              title: 'Help me',
              status: 'in-progress',
              description: 'description',
              comments: [
                {
                  id: 'ZdPnm',
                  txt: 'also @yaronb please CR this',
                  createdAt: 1590999817436.0,
                  byMember: {
                    _id: 'u101',
                    fullname: 'Tal Tarablus',
                    imgUrl:
                      'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                  },
                },
              ],
              checklists: [
                {
                  id: 'YEhmF',
                  title: 'Checklist',
                  todos: [
                    {
                      id: '212jX',
                      title: 'To Do 1',
                      isDone: false,
                    },
                  ],
                },
              ],
              members: [
                {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'https://www.google.com',
                },
                {
                  _id: 'u102',
                  fullname: 'Ynon Chayun',
                  imgUrl: 'https://www.google.com',
                },
              ],
              labelIds: ['l101', 'l102'],
              createdAt: 1590999730348,
              dueDate: 16156215211,
              byMember: {
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
              style: {
                bgColor: '#26de81',
              },
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
      // for monday
      cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    },
    // {
    //   _id: 'b101',
    //   title: 'Robot dev proj',
    //   archivedAt: 1589983468418,
    //   createdAt: 1589983468418,
    //   createdBy: {
    //     _id: 'u101',
    //     fullname: 'Abi Abambi',
    //     imgUrl: 'http://some-img',
    //   },
    //   style: {},
    //   labels: [
    //     {
    //       id: 'l101',
    //       title: 'Done',
    //       color: '#61bd4f',
    //     },
    //     {
    //       id: 'l102',
    //       title: 'Progress',
    //       color: '#61bd33',
    //     },
    //   ],
    //   members: [
    //     {
    //       _id: 'u101',
    //       fullname: 'Tal Tarablus',
    //       imgUrl: 'https://www.google.com',
    //     },
    //     {
    //       _id: 'u102',
    //       fullname: 'Ynon Chayun',
    //       imgUrl: 'https://www.google.com',
    //     },
    //   ],
    //   groups: [
    //     {
    //       id: 'g101',
    //       title: 'Group 1',
    //       archivedAt: 1589983468418,
    //       tasks: [
    //         {
    //           id: 'c101',
    //           title: 'Replace logo',
    //           members: [
    //             {
    //               _id: 'u101',
    //               fullname: 'Tal Tarablus',
    //               imgUrl: 'https://www.google.com',
    //             },
    //             {
    //               _id: 'u102',
    //               fullname: 'Ynon Chayun',
    //               imgUrl: 'https://www.google.com',
    //             },
    //           ],
    //         },
    //         {
    //           id: 'c102',
    //           title: 'Add Samples',
    //           members: [
    //             {
    //               _id: 'u101',
    //               fullname: 'Tal Tarablus',
    //               imgUrl: 'https://www.google.com',
    //             },
    //             {
    //               _id: 'u102',
    //               fullname: 'Ynon Chayun',
    //               imgUrl: 'https://www.google.com',
    //             },
    //           ],
    //         },
    //       ],
    //       style: {},
    //     },
    //     {
    //       id: 'g102',
    //       title: 'Group 2',
    //       // groups: [
    //       //   {
    //       //     id: 'g101',
    //       //     title: 'Group 1',
    //       //     archivedAt: 1589983468418,
    //           tasks: [
    //             {
    //               id: 'c101',
    //               title: 'Replace logo',
    //             },
    //             {
    //               id: 'c102',
    //               title: 'Add Samples',
    //             },
    //           ],
    //           style: {},
    //         },
    //         {
    //           id: 'c104',
    //           title: 'Help me',
    //           status: 'in-progress',
    //           description: 'description',
    //           comments: [
    //             {
    //               id: 'ZdPnm',
    //               txt: 'also @yaronb please CR this',
    //               createdAt: 1590999817436.0,
    //               byMember: {
    //                 _id: 'u101',
    //                 fullname: 'Tal Tarablus',
    //                 imgUrl:
    //                   'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    //               },
    //             },
    //           ],
    //           checklists: [
    //             {
    //               id: 'YEhmF',
    //               title: 'Checklist',
    //               todos: [
    //                 {
    //                   id: '212jX',
    //                   title: 'To Do 1',
    //                   isDone: false,
    //                 },
    //               ],
    //             },
    //           ],
    //           memberIds: ['u101'],
    //           labelIds: ['l101', 'l102'],
    //           createdAt: 1590999730348,
    //           dueDate: 16156215211,
    //           byMember: {
    //             _id: 'u101',
    //             username: 'Tal',
    //             fullname: 'Tal Tarablus',
    //             imgUrl:
    //               'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
    //           },
    //           style: {
    //             bgColor: '#26de81',
    //           },
    //         },
    //       ],
    //       style: {},
    //       activities: [
    //         {
    //           id: 'a101',
    //           txt: 'Changed Color',
    //           createdAt: 154514,
    //           byMember: {
    //             _id: 'u101',
    //             fullname: 'Abi Abambi',
    //             imgUrl: 'http://some-img',
    //           },
    //           task: {
    //             id: 'c101',
    //             title: 'Replace Logo',
    //           },
    //         },
    //       ],
    //     },
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/1.jpg',
    },
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/2.jpg',
    },
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/3.jpg',
    },
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/4.jpg',
    },
    {
      _id: 'b101',
      title: 'sprint 4',
      imgUrl: '../imgs/4.jpg',
    },
  ]

  localStorage.setItem('boardDB', JSON.stringify(boards))
  return boards
}
