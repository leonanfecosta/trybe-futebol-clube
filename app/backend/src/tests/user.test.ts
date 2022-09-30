import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const correctUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

describe('Testa a rota /login', () => {
  describe('POST /login', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(correctUser as Users);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Deve retornar um token', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('deve retornar um erro 401 quando a senha estiver incorreta', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: correctUser.email,
        password: 'wrong_password',
      });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'Incorrect email or password'
      );
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(null);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar um erro 401 quando o usuário não for encontrado', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'wrongemail@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'Incorrect email or password'
      );
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves(null);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar um erro 401 quando o usuário não for encontrado', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'wrongemail@admin.com',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'Incorrect email or password'
      );
    });
  });

  describe('POST /login', () => {
    before(() => {
      sinon.stub(Users, 'findOne').resolves();
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar erro 401 se o email for invalido', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'wrongemail',
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'Incorrect email or password'
      );
    });

    it('deve retornar erro 400 se o email não for enviado', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'secret_admin',
      });

      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'All fields must be filled'
      );
    });

    it('deve retornar erro 400 se a senha não for enviada', async () => {
      const chaiHttpResponse = await chai.request(app).post('/login').send({
        email: correctUser.email,
      });

      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.eq(
        'All fields must be filled'
      );
    });
  });
});
