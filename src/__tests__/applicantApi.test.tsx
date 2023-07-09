import { applicantApi } from '../Hooks/api';
import { Applicant } from '../Pages/Home';
import { store } from '../Hooks/api';

const applicant: Applicant = {
    id: 50000,
    firstname: '',
    lastname: '',
    about: '',
    address: '',
    city: '',
    state: '',
    zip: ''
}

// test API requests
describe('Applicant API Tests', () => {
    describe('GET applicant', () => {
        beforeAll(async () => {
            // Create the test object
            await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
        });

        afterAll(async () => {
            // Delete the test object
            await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
        });

        test('GET 200 & returns applicant', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.getApplicant.initiate(applicant.id)
            );
            const data = result.data;

            expect(result.isSuccess).toEqual(true);
            expect(data).toEqual(applicant);
        });

        test('GET invalid input returns success false', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.getApplicant.initiate(null)
            );

            expect(result.isSuccess).toEqual(false);
        });
    });

    describe('POST applicant', () => {
        beforeEach(async () => {
            // Delete the test object before each test
            await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
        });

        test('POST status success & returns applicant', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
            const data = result.data;

            expect(result.isSuccess).toEqual(true);
            expect(data).toEqual(applicant);
        });

        test('POST with same id is upsert', async () => {
            await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
            const result = await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
            const data = result.data;

            expect(data).toEqual(applicant);
        });

        test('POST invalid input returns success false', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate({})
            );

            expect(result.isSuccess).toEqual(false);
        });
    });

    describe('PUT applicant', () => {
        beforeAll(async () => {
            // Create the test object
            await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
        });

        afterAll(async () => {
            // Delete the test object
            await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
        });

        test('PUT status success & returns applicant', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.putApplicant.initiate(applicant)
            );
            const data = result.data;

            expect(result.isSuccess).toEqual(true);
            expect(data).toEqual(applicant);
        });

        test('PUT if no exist, create', async () => {
            await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
            const result = await store.dispatch(
                applicantApi.endpoints.putApplicant.initiate(applicant)
            );
            const data = result.data;

            expect(data).toEqual(applicant);
        });

        test('PUT invalid input returns success false', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.putApplicant.initiate({})
            );

            expect(result.isSuccess).toEqual(false);
        });
    });

    describe('DELETE applicant', () => {
        beforeAll(async () => {
            // Create the test object
            await store.dispatch(
                applicantApi.endpoints.postApplicant.initiate(applicant)
            );
        });

        afterAll(async () => {
            // Delete the test object
            await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
        });

        test('DELETE status success & returns id', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
            );
            const data = result.data;

            expect(result.isSuccess).toEqual(true);
            expect(data.id).toEqual(applicant.id);
        });

        test('DELETE invalid input returns success false', async () => {
            const result = await store.dispatch(
                applicantApi.endpoints.deleteApplicant.initiate(null)
            );

            expect(result.isSuccess).toEqual(false);
        });
    });
});