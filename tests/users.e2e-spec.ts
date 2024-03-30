import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
  const { app } = await boot;

  application = app;
});

afterAll(() => {
  application.close();
});

describe('Users Controller', () => {
  it('Register - error', async () => {
    const res = await request(application.app).post('/users/sign-up').send({
      email: 'login@mail.com',
      password: 'new_pasrdку',
      name: 'user name',
    });

    expect(res.status).toBe(422);
  });

  it('Login - error', async () => {
    const res = await request(application.app).post('/users/sign-in').send({
      email: 'login@mail.com',
      password: 'pasrdку_wrong',
    });

    expect(res.status).toBe(401);
  });

  it('Login - error', async () => {
    const res = await request(application.app).post('/users/sign-in').send({
      email: 'login@mail.com',
      password: 'pasrdку',
    });

    expect(res.status).toBe(200);
    expect(res.body.jwt).toBeTruthy();
  });

  it('Info - success', async () => {
    const res = await request(application.app)
      .get('/users/info')
      .set('Authorization', 'Bearer wrong_jwt');

    expect(res.status).toBe(403);
  });
});
