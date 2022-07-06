import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Footer from "../Footer";
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
            <Footer/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderWithContext());
});

it("shows className while paused", () => {
    render(RenderWithContext());
    const a1 = screen.getByText('Music by Jenico');
    const a2 = screen.getByText('Art by Tom Martyn');
    expect(a1).toHaveClass('pause');
    expect(a2).toHaveClass('pause');
});

it("hides className while playing", () => {
    render(RenderWithContext(true));
    const a1 = screen.getByText('Music by Jenico');
    const a2 = screen.getByText('Art by Tom Martyn');
    expect(a1).not.toHaveClass('pause');
    expect(a2).not.toHaveClass('pause');
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot while playing", () => {
    const tree = renderer.create(RenderWithContext(true)).toJSON();
    expect(tree).toMatchSnapshot();
});