import configureStore from 'redux-mock-store';
import { useLazyGetApplicantQuery, useLazyPostApplicantQuery, useLazyPutApplicantQuery, useLazyDeleteApplicantQuery } from '../Hooks/api';

const middlewares = []
const mockStore = configureStore(middlewares)

const getApplicant = () => ({ type: useLazyGetApplicantQuery })
const postApplicant = () => ({ type: useLazyPostApplicantQuery })
const putlicant = () => ({ type: useLazyPutApplicantQuery })
const deleteApplicant = () => ({ type: useLazyDeleteApplicantQuery })

test('It should GET applicant', () => {
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(getApplicant());

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: useLazyGetApplicantQuery }
  expect(actions).toEqual([expectedPayload])
});

test('It should POST applicant', () => {
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(postApplicant());

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: useLazyPostApplicantQuery }
  expect(actions).toEqual([expectedPayload])
});

test('It should PUT applicant', () => {
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(putlicant());

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: useLazyPutApplicantQuery }
  expect(actions).toEqual([expectedPayload])
});

test('It should DELETE applicant', () => {
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(deleteApplicant());

  // Test if your store dispatched the expected actions
  const actions = store.getActions()
  const expectedPayload = { type: useLazyDeleteApplicantQuery }
  expect(actions).toEqual([expectedPayload])
});