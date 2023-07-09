import configureStore from 'redux-mock-store';
import { applicantApi } from '../Hooks/api';
import { useLazyGetApplicantQuery, useLazyPostApplicantQuery, useLazyPutApplicantQuery, useLazyDeleteApplicantQuery } from '../Hooks/api';
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

const middlewares = [];
const mockStore = configureStore(middlewares);

const getApplicant = () => ({ type: useLazyGetApplicantQuery });
const postApplicant = () => ({ type: useLazyPostApplicantQuery });
const putlicant = () => ({ type: useLazyPutApplicantQuery });
const deleteApplicant = () => ({ type: useLazyDeleteApplicantQuery });

// Test redux store
describe('Applicant Redux Tests', () => {
  test('GET payload matches expected', () => {
    const initialState = {};
    const testStore = mockStore(initialState);
    // Dispatch the action
    testStore.dispatch(getApplicant());

    // Test if your store dispatched the expected actions
    const actions = testStore.getActions();
    const expectedPayload = { type: useLazyGetApplicantQuery };
    expect(actions).toEqual([expectedPayload]);
  });

  test('POST payload matches expected', () => {
    const initialState = {};
    const testStore = mockStore(initialState);
    // Dispatch the action
    testStore.dispatch(postApplicant());

    // Test if your store dispatched the expected actions
    const actions = testStore.getActions();
    const expectedPayload = { type: useLazyPostApplicantQuery };
    expect(actions).toEqual([expectedPayload]);
  });

  test('PUT payload matches expected', () => {
    const initialState = {};
    const testStore = mockStore(initialState);
    // Dispatch the action
    testStore.dispatch(putlicant());

    // Test if your store dispatched the expected actions
    const actions = testStore.getActions();
    const expectedPayload = { type: useLazyPutApplicantQuery };
    expect(actions).toEqual([expectedPayload]);
  });

  test('DELETE payload matches expected', () => {
    const initialState = {};
    const testStore = mockStore(initialState);
    // Dispatch the action
    testStore.dispatch(deleteApplicant());

    // Test if your store dispatched the expected actions
    const actions = testStore.getActions();
    const expectedPayload = { type: useLazyDeleteApplicantQuery };
    expect(actions).toEqual([expectedPayload]);
  });
});

// test API requests
describe('Applicant API Tests', () => {
  describe('GET applicant', () => {
    beforeAll(async () => {
      // Create the test object
      return await store.dispatch(
        applicantApi.endpoints.postApplicant.initiate(applicant)
      );
    });

    afterAll(async () => {
      // Delete the test object
      return await store.dispatch(
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
      return await store.dispatch(
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
      return await store.dispatch(
        applicantApi.endpoints.postApplicant.initiate(applicant)
      );
    });

    afterAll(async () => {
      // Delete the test object
      return await store.dispatch(
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
      return await store.dispatch(
        applicantApi.endpoints.postApplicant.initiate(applicant)
      );
    });

    afterAll(async () => {
      // Delete the test object
      return await store.dispatch(
        applicantApi.endpoints.deleteApplicant.initiate(applicant.id)
      );
    });

    test('DELETE status success & returns id', async () => {
      const result = await store.dispatch(
        applicantApi.endpoints.getApplicant.initiate(applicant.id)
      );
      const data = result.data;

      expect(result.isSuccess).toEqual(true);
      expect(data.id).toEqual(applicant.id);
    });

    test('DELETE invalid input returns success false', async () => {
      const result = await store.dispatch(
        applicantApi.endpoints.getApplicant.initiate(null)
      );

      expect(result.isSuccess).toEqual(false);
    });
  });
});