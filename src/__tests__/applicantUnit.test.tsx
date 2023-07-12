import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../Hooks/api";
import Home from "../Pages/Home";
import userEvent from "@testing-library/user-event";

describe('Home component', () => {
    const produceComponent = () =>
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

    test('renders the home component', () => {
        produceComponent();
        expect(screen.getByTestId('applicantImage')).toBeInTheDocument();
    });

    test('create/edit: show submit', () => {
        produceComponent();

        // Click edit
        fireEvent.click(screen.getByTestId('editBtn'));
        expect(screen.getByTestId('editBtn')).toHaveTextContent('Submit');

        // Click edit
        fireEvent.click(screen.getByTestId('createBtn'));
        expect(screen.getByTestId('createBtn')).toHaveTextContent('Submit');
    });

    test('On create/edit: show form', () => {
        produceComponent();

        // Click edit
        fireEvent.click(screen.getByTestId('createBtn'));
        expect(screen.getByTestId('addressLabel')).toBeInTheDocument();
        expect(screen.getByTestId('cityLabel')).toBeInTheDocument();
        expect(screen.getByTestId('stateLabel')).toBeInTheDocument();
        expect(screen.getByTestId('zipLabel')).toBeInTheDocument();
        expect(screen.getByTestId('firstNameLabel')).toBeInTheDocument();
        expect(screen.getByTestId('lastNameLabel')).toBeInTheDocument();
        expect(screen.getByTestId('aboutLabel')).toBeInTheDocument();
    });

    test('On picture click: display applicant data', () => {
        produceComponent();

        // Click edit
        fireEvent.click(screen.getByTestId('applicantImage'));
        // Wait for data to load in
        setTimeout(() => {
            expect(screen.getByTestId('addressData')).toBeInTheDocument();
            expect(screen.getByTestId('nameData')).toBeInTheDocument();
            expect(screen.getByTestId('aboutData')).toBeInTheDocument();
        }, 200);
    });
});