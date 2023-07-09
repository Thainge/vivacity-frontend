import { Applicant } from "../Pages/Home";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';

const baseUrl = 'http://localhost:6060/awesome/applicant';

export const applicantApi = createApi({
    reducerPath: 'applicantApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json");
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getApplicant: builder.query({
            query: (id) => `${baseUrl}/${id}`
        }),
        postApplicant: builder.query<Applicant, Partial<Applicant>>({
            query: (body) => ({
                url: baseUrl,
                method: 'POST',
                body,
            }),
        }),
        putApplicant: builder.query<Applicant, Partial<Applicant>>({
            query: (body) => ({
                url: baseUrl,
                method: 'PUT',
                body,
            }),
        }),
        deleteApplicant: builder.query({
            query: (id) => `${baseUrl}/${id}`
        }),
    })
});

export const store = configureStore({
    reducer: {
        [applicantApi.reducerPath]: applicantApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(applicantApi.middleware),
})

export const { useLazyGetApplicantQuery, useLazyPostApplicantQuery, useLazyPutApplicantQuery, useLazyDeleteApplicantQuery } = applicantApi;