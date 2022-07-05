import React from "react";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from "./Footer";
import AppContext from "../../utils/context/AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const renderFooter = (input) => {
    const isPlaying = input | false
    return (
        <AppContext.Provider value={{isPlaying}}>
            <Footer/>
        </AppContext.Provider>
    )
}

it("renders without crashing", () => { 
    render(renderFooter())
})

it("matches snapshot, isPlaying className false", () => {
    const tree = renderer.create(renderFooter()).toJSON();
    expect(tree).toMatchSnapshot();
})

it("matches snapshot, isPlaying className true", () => {
    const tree = renderer.create(renderFooter(true)).toJSON();
    expect(tree).toMatchSnapshot();
})
