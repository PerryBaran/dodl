import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from "../Header";
import AppContext from "../../AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const RenderWithContext = (isPlaying = false) => {
    const hideWhilePlaying = (input) => {
        if (!isPlaying) {
          return input
        }
        return ''
    };
    return (
        <AppContext.Provider value={{hideWhilePlaying}}>
            <Header/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderWithContext());
});

it("shows className while paused", () => {
    render(RenderWithContext());
    const h1Element = screen.getByText('Dreaming of Detuned Love')
    expect(h1Element).toHaveClass('pause');
});

it("hides className while playing", () => {
    render(RenderWithContext(true));
    const h1Element = screen.getByText('Dreaming of Detuned Love')
    expect(h1Element).not.toHaveClass('pause');
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot while playing", () => {
    const tree = renderer.create(RenderWithContext(true)).toJSON();
    expect(tree).toMatchSnapshot();
});
