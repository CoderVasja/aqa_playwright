import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://qauto.forstudy.space';

test('Create a car', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/cars`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'sid=s%3AQe3WToFqndQx2cKzlBGBa-CQYIxTp8Th.5bArjk71GcMw1xZtTha9U4TsXVDaECJLqtBpQtanpco'
        },
        data: {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.data.brand).toBe('Audi');
    expect(body.data.model).toBe('TT');
});


test('Create a car (invalid - empty fields)', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/cars`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'sid=s%3AQe3WToFqndQx2cKzlBGBa-CQYIxTp8Th.5bArjk71GcMw1xZtTha9U4TsXVDaECJLqtBpQtanpco'
        },
        data: {
            carBrandId: '',
            carModelId: '',
            mileage: '122'
        }
    });

    expect(response.status()).toBe(400);

});

test.only('Create car (Invalid data)', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/cars`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'sid=s%3AQe3WToFqndQx2cKzlBGBa-CQYIxTp8Th.5bArjk71GcMw1xZtTha9U4TsXVDaECJLqtBpQtanpco'
        },
        data: {
            carBrandId: 100,
            carModelId: 300,
            mileage: 'fdfdfdf'
        }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toEqual({
        message: "Invalid mileage type",
        status: "error"
      });

});
