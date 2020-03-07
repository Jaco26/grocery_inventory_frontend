
function makeReq({ uri, method = 'GET', body = null} = {}) {
  return { uri, method, body }
}
 
const _get = uri => makeReq({ uri })
const _post = (uri, body = null) => makeReq({ uri, body, method: 'POST' })
const _put = (uri, body = null ) => makeReq({ uri, body, method: 'PUT' })
const _delete = uri => makeReq({ uri, method: 'DELETE' })

export default [
  _post('/account/login', {
    username: 'jacob',
    password: '1234',
  }),
  _post('/account/logout'),
  

  _get('/categories/food/category'),
  _post('/categories/food/category', { name: 'Fr    UiT' }),
  _put('/categories/food/category/29b4aa12-da5a-4d28-a95c-0bd20a512b79', { name: 'dried   legume' }),
  _delete('/categories/food/category/29b4aa12-da5a-4d28-a95c-0bd20a512b79'),
  

  _get( '/categories/food/kind'),
  _post('/categories/food/kind', {
    name: 'lentils',
    nutrition_info: {
      blabla: 23,
    },
    notes: 'good when cooked'
  }),
  _put('/categories/food/kind/<kind_id>', {
    name: 'green lentils',
    nutrition_info: {
      blabla: 34,
    },
    notes: 'good when cooked'
  }),
  _delete('/categories/food/kind/<kind_id>'),

  _get('/categories/packaging/kind'),
  _post('/categories/packaging/kind', { name: 'jar' }),
  _put('/categories/packaging/kind/<kind_id>', { 
    name: 'glass jar'
  }),
  _delete('/categories/packaging/kind/<kind_id>'),

  _post( '/food_item_state', {
    food_item_id: '',
    packaging_kind_id: '',
    packaging_state_id: '',
    number_of_servings: 4,
    weight: 2,
  }),

  _post('/snapshot', {
    stock_id: ''
  }),

  _get('/stock/<stock_id>'),
  _get('/stock/'),
  _post('/stock/', { name: 'The House' }),
  _put('/stock/<stock_id>', { name: '' }),
  _delete('/stock/<stock_id>'),
  
  _post('/stock/item/<stock_id>', {
    food_kind_id: '',
    date_item_was_new: '2020-01-01',
    expiration_date: '2021-04-12',
  }),
  _delete('/stock/item/<stock_id>/<item_id>'),

]
