import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import VolumeControls from "../VolumeControls";
import AppContext from "../../../AppContext";
import renderer from "react-test-renderer";

afterEach(cleanup);

const RenderWithContext = (volume = 0.5, isPlaying = false) => {
    const hideWhilePlaying = (input) => {
        if (!isPlaying) {
          return input
        }
        return ''
    };
    return (
        <AppContext.Provider value={{hideWhilePlaying}}>
            <VolumeControls volume={volume}/>
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
    render(RenderWithContext(0.5, true));
    const icon = screen.getByTestId('icon')
    expect(icon).not.toHaveClass('pause');
});

it("changes defaultValue of slider with volume", () => {
    render(RenderWithContext(0.9));
    const input = screen.getByTestId('range');
    expect(input).toHaveValue('90');
});

it("matches snapshot while paused", () => {
    const tree = renderer.create(RenderWithContext()).toJSON();
    expect(tree).toMatchSnapshot();
});

//not creating snapshot due to useRef()
// it("matches snapshot while playing", () => {
//     const tree = renderer.create(RenderWithContext(0.5, true)).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// it("matches snapshot with different value for volume", () => {
//     const tree = renderer.create(RenderWithContext(0.9)).toJSON();
//     expect(tree).toMatchSnapshot();
// });