const request = require('supertest');
const app = require('../../src/app');

describe('E2E Tests - Parcours complet', () => {
  test('Health check is available', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('API info returns correct app name', async () => {
    const res = await request(app).get('/api/info');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('kevin-tp');
    expect(res.body.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('Homepage contains Welcome', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Welcome');
  });

  test('Full user journey: health → info → home', async () => {
    const health = await request(app).get('/health');
    expect(health.status).toBe(200);

    const info = await request(app).get('/api/info');
    expect(info.status).toBe(200);
    expect(info.body.name).toBe('kevin-tp');

    const home = await request(app).get('/');
    expect(home.status).toBe(200);
    expect(home.text).toContain('Welcome to kevin-tp');
  });
});
