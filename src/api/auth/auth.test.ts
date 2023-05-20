import request from 'supertest';

import app from '../../app';
import { Users, UsersModel } from '../users/users.model';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error) {}
});

beforeEach(async () => {
  try {
    const user = UsersModel.parse({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '+380981111111',
      password: 'Password1',
      city: {
        name: 'Kyiv',
      },
    });
    const newSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, newSalt);
    user.salt = newSalt;
    user.password = hashedPassword;
    await Users.insertOne(user);
  } catch (error) {}
});

describe('POST /api/v1/auth/register', () => {
  it('registration full fields responds access token', () =>
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe1@gmail.com',
        phoneNumber: '+380981111112',
        password: 'Password1',
        city: {
          name: 'Kyiv',
        },
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('accessToken');
      }),
  );
  it('registration existing user responds error message', () =>
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe1@gmail.com',
        phoneNumber: '+380981111112',
        password: 'Password1',
        city: {
          name: 'Kyiv',
        },
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );
  it('registration without required fields responds error message', () =>
    request(app)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send({
        firstName: 'John',
        email: 'johndoe@gmail.com',
        city: {
          name: 'Kyiv',
        },
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );
});

describe('POST /api/v1/auth/login', () => {
  it('login phone number responds access token', () =>
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        phoneNumber: '+380981111111',
        password: 'Password1',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('accessToken');
      }),
  );
  it('login email responds access token', () =>
    request(app)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'johndoe@gmail.com',
        password: 'Password1',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('accessToken');
      }),
  );

});
