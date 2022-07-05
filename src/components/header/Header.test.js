import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from "./Header";
import AppContext from "../../utils/context/AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const renderHeader = (input) => {
    return (
        <AppContext.Provider value={false}>
            <Header text={input}/>
        </AppContext.Provider>
    )
}

it("renders without crashing", () => { 
    render(renderHeader())
})

it("renders text passed as prop", () => {
    render(renderHeader('biscuit'));
    expect(screen.getByText(/biscuit/)).toBeInTheDocument();
})

it("matches snapshot", () => {
    const tree = renderer.create(renderHeader('biscuit')).toJSON();
    expect(tree).toMatchSnapshot();
})
