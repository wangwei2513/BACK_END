import getDate from './getDate'
// 增
export const addOne = (data) => getDate('/addOne', data, 'post')
// 查
export const findAll = (data) => getDate('/getAll', 'get')
export const findOne = (data) => getDate('/getOne', data, 'get')
// 改
export const update = (data) => getDate('/update', data, 'put')
// 删
export const removeOne = (data) => getDate('/removeOne', data, 'delete')