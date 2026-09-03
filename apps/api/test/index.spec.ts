import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Batter Bites API', () => {
	it('GET /catalog responds with 200 and a list of products', async () => {
		const request = new IncomingRequest('http://example.com/catalog');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = await response.json() as CatalogResponse;
		expect(body.items).toHaveLength(7);
		expect(body.items[0]).toMatchObject({
			id: 'p001',
			name: 'Idly/Dosa Batter',
			price: 5.0,
		});
	});

	it('GET /catalog sets CORS and Cache-Control headers', async () => {
		const request = new IncomingRequest('http://example.com/catalog');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
		expect(response.headers.get('Content-Type')).toBe('application/json');
		expect(response.headers.get('Cache-Control')).toBe('max-age=3600');
	});

	it('GET /product/:id responds with a single product', async () => {
		const request = new IncomingRequest('http://example.com/product/p002');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = await response.json() as Product;
		expect(body.id).toBe('p002');
		expect(body.name).toBe('Crispy Dosa Batter');
	});

	it('GET /product/:id with unknown id responds with 404', async () => {
		const request = new IncomingRequest('http://example.com/product/nonexistent');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(404);
	});

	it('GET /product without id segment responds with 404', async () => {
		const request = new IncomingRequest('http://example.com/product');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(404);
	});

	it('GET unknown route responds with 404', async () => {
		const response = await SELF.fetch('https://example.com/unknown');
		expect(response.status).toBe(404);
	});

	it('POST method is not routed (falls through to 404)', async () => {
		const request = new IncomingRequest('https://example.com/catalog', { method: 'POST' });
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(404);
	});
});

interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl?: string;
}

interface CatalogResponse {
	items: Product[];
}
