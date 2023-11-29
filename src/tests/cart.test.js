const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test123'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token
})

test('GET/cart ', async () => { 
    const res = await request(app).get('/cart')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 })


 test('POST /products ', async () => { 
    const product = {
        productId: 1,
        quantity: 2
    }
    const res = await request(app)
        .post('/cart')
        .send(product)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(product.title);
  });


  test('PUT /cart/:id debe actualizar un producto del carrito', async () => {
    const cart = {
      quantity: 1
    }
    const res = await request(app)
      .put(`/cart/${id}`)
      .send(cart)
      .set('Authorization', `Bearer ${token}`);
  
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
  })
  
  test('DELETE /cart/:id debe borrar un producto del carrito', async () => {
    const res = await request(app)
      .delete(`/cart/${id}`)
      .set('Authorization', `Bearer ${token}`);

    console.log(res.body)
    expect(res.status).toBe(204);
  })