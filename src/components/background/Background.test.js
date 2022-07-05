import React from "react";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Background from "./Background";
import AppContext from "../../utils/context/AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const renderBackground = (input) => {
    return (
        <AppContext.Provider value={input | false}>
            <Background/>
        </AppContext.Provider>
    )
}

it("renders without crashing", () => { 
    render(renderBackground())
})

it("matches snapshot", () => {
    const tree = renderer.create(renderBackground()).toJSON();
    expect(tree).toMatchSnapshot();
})

