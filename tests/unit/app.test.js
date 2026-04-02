const request = require('supertest');
const app = require('../../src/app');

describe('Unit Tests', () => {
  test('GET /health returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });

  test('GET /api/info returns 200 with correct fields', async () => {
    const res = await request(app).get('/api/info');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('kevin-tp');
    expect(res.body.version).toBe('1.0.0');
    expect(res.body.environment).toBeDefined();
  });

  test('GET / returns 200 with HTML', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Welcome to kevin-tp');
  });

  test('Unknown route returns 404', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Not found');
  });
});
