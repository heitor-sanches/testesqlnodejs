const supertest = require('supertest');
const {app, server, connection} = require('./index.js'); // Importe seu aplicativo Express

describe('Teste GET /users', () => {
  it('deve responder com status 200', async () => {
    const response = await supertest(app).get('/users');
    expect(response.statusCode).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    response.body.forEach(element =>{
      expect(element).toHaveProperty("name");
    });
  });
});

describe('Teste POST /users', () => {
  it('deve responder com status 201', async () => {
    const response = (await supertest(app).post('/users')).setEncoding({name: "Crepe Guardiola", email: "crepe@guardiola.com"});
    expect(response.statusCode).toBe(201);
  });
});

afterAll(() => {
  server.close();
  connection.end()
});