import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import SongName from "../SongName";
import AppContext from "../../../AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const songs = [{title: 'dummy'}, {title: 'text'}]

const RenderWithContext = (index = 0, isPlaying = false) => {
    const hideWhilePlaying = (input) => {
        if (!isPlaying) {
          return input
        }
        return ''
    };
    return (
        <AppContext.Provider value={{hideWhilePlaying}}>
            <SongName songs={songs} songIndex={index}/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderWithContext());
});

it("shows className while paused", () => {
    render(RenderWithContext());
    const h2 = screen.getByRole('heading');
    expect(h2).toHaveClass('pause')
});

it("hides className while playing", () => {
    render(RenderWithContext(0, true));
    const h2 = screen.getByRole('heading');
    expect(h2).not.toHaveClass('pause')
});

it("renders correct name", () => {
    render(RenderWithContext(1));
    const h2 = screen.getByRole('heading');
    expect(h2).toHaveTextContent(songs[1].title)
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot while playing", () => {
    const tree = renderer.create(RenderWithContext(0, true)).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot with different songIndex", () => {
    const tree = renderer.create(RenderWithContext(1)).toJSON();
    expect(tree).toMatchSnapshot();
})