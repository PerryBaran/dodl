import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Tracklist from "../Tracklist";
import AppContext from "../../../AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const songs = [{title: 'dummy'}, {title: 'text'}]

const RenderWithContext = (isPlaying = false) => {
    const hideWhilePlaying = (input) => {
        if (!isPlaying) {
          return input
        }
        return ''
    };
    return (
        <AppContext.Provider value={{hideWhilePlaying}}>
            <Tracklist songs={songs}/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderWithContext());
});

it("shows className while paused", () => {
    render(RenderWithContext());
    const icon = screen.getByTestId('icon')
    expect(icon).toHaveClass('pause');
});

it("hides className while playing", () => {
    render(RenderWithContext(true));
    const icon = screen.getByTestId('icon')
    expect(icon).not.toHaveClass('pause');
});

it("correctly renders tracklist", () => {
    render(RenderWithContext());
    const buttons = screen.getAllByRole('button', {hidden: true});
    expect(buttons[0]).toHaveTextContent(songs[0].title);
    expect(buttons[1]).toHaveTextContent(songs[1].title);
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

it("matches snapshot while playing", () => {
    const tree = renderer.create(RenderWithContext(true)).toJSON();
    expect(tree).toMatchSnapshot();
});