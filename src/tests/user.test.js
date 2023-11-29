const request = require('supertest');
const app = require('../app');

let id;
let token;


 test('POST /users ', async () => { 
    const user = {
        firstName: "Luis",
        lastName: "Cortes",
        email: "luis.cortes@gmail.com",
        password: 'luis123',
        phone: '1234567890'
    }
    const res = await request(app).post('/users').send(user)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
  });


  test('POST /users/login', async () => {
    const user = {
        email: "luis.cortes@gmail.com",
        password: 'luis123',
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });



  test('GET/users ', async () => { 
    const res = await request(app).get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 })

  test('PUT /users/id',async () => { 
    const user = {
        firstName: "Luis Actualizado",
    }
    const res = await request(app).put(`/users/${id}`).send(user)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
   });

   


  test('POST /users/login   debe retornar credenciales incorrectas', async () => {
    const user = {
        email: "incorrecto@gmail.com",
        password: 'incorrecto123',
    }
    const res = await request(app).post('/users/login').send(user);
    expect(res.status).toBe(401);
  });



  test("DELETE /users/id", async() => {
    const res = await request(app).delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });


  