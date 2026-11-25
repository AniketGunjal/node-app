
const test = require('node:test');
const assert = require('node:assert');
const { createServer } = require('../app');

test('Health endpoint returns healthy status', async () => {
    const server = createServer();

    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    try {
        const response = await fetch(`http://127.0.0.1:${port}/health`);
        const body = await response.json();

        assert.strictEqual(response.status, 200);
        assert.strictEqual(body.status, 'healthy');
        assert.strictEqual(body.application, 'node-app');
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});

test('Home endpoint returns application message', async () => {
    const server = createServer();

    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    try {
        const response = await fetch(`http://127.0.0.1:${port}/`);
        const body = await response.text();

        assert.strictEqual(response.status, 200);
        assert.match(body, /Jenkins CI\/CD/);
    } finally {
        await new Promise(resolve => server.close(resolve));
    }
});

