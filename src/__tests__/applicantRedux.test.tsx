import { useLazyGetApplicantQuery, useLazyPostApplicantQuery, useLazyPutApplicantQuery, useLazyDeleteApplicantQuery } from '../Hooks/api';
import configureStore from 'redux-mock-store';

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