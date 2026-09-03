import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker, { CatalogResponse, Product } from '../src/index';

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Batter Bites API', () => {
	it('GET /catalog responds with 200, all 8 products, fees, and policies', async () => {
		const request = new IncomingRequest('http://example.com/catalog');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = (await response.json()) as CatalogResponse;
		expect(body.items).toHaveLength(8);

		// Check first item (Idly/Dosa Batter)
		expect(body.items[0]).toMatchObject({
			id: 'p001',
			name: 'Idly/Dosa Batter',
			price: 5.50,
			unit: 'kg',
			minOrder: '1 kg',
		});

		// Check Podi item with variants
		const podi = body.items.find(i => i.id === 'p008');
		expect(podi).toBeDefined();
		expect(podi?.name).toBe('Gunpowder Chutney Podi');
		expect(podi?.variants).toEqual([
			{ weight: '100g', price: 2.50 },
			{ weight: '200g', price: 4.00 },
		]);
		expect(podi?.ingredients).toContain('Roasted Chana Dal');

		// Check fees and policies metadata
		expect(body.fees).toEqual({
			delivery: 1.00,
			cancellation: 1.00,
			currency: 'EUR',
		});
		expect(body.policies).toEqual({
			minBatterOrder: '1 kg',
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

	it('GET /product/:id responds with a single product and ingredients', async () => {
		const request = new IncomingRequest('http://example.com/product/p003');
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = (await response.json()) as Product;
		expect(body.id).toBe('p003');
		expect(body.name).toBe('Adai Dosa Batter');
		expect(body.price).toBe(8.50);
		expect(body.ingredients).toEqual([
			'Toor Dal',
			'Chana Dal',
			'Urad Dal',
			'Rice',
		]);
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
