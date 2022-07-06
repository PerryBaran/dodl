import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import MediaControls from "../MediaControls";
import AppContext from "../../../AppContext";
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
            <MediaControls/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderWithContext());
});

it("contains 3 button elements", () => {
    render(RenderWithContext());
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
});

it("shows className while paused", () => {
    render(RenderWithContext());
    const buttons = screen.getAllByRole('button');
    console.log(buttons)
    buttons.forEach((button) => {
        expect(button).toHaveClass('pause');
    })
});

it("hides className while playing", () => {
    render(RenderWithContext(true));
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
        expect(button).not.toHaveClass('pause');
    })
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot while playing", () => {
    const tree = renderer.create(RenderWithContext(true)).toJSON();
    expect(tree).toMatchSnapshot();
});