import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from "./Header";
import AppContext from "../../utils/context/AppContext";
import renderer from "react-test-renderer";
import { toHaveClass } from "@testing-library/jest-dom/dist/matchers";

afterEach(cleanup);

const RenderHeader = (props, isPlaying = false) => {
    const hideWhilePlaying = (input) => {
        if (!isPlaying) {
          return input
        }
        return ''
    };
    return (
        <AppContext.Provider value={{hideWhilePlaying}}>
            <Header text={props.text}/>
        </AppContext.Provider>
    )
};

it("renders without crashing", () => { 
    render(RenderHeader({text: ''}));
});

it("renders text passed as prop", () => {
    render(RenderHeader({text: 'biscuit'}));
    expect(screen.getByText(/biscuit/)).toBeInTheDocument();
});

it("shows className while paused", () => {
    const { container } = render(RenderHeader({text: 'biscuit'}));
    expect(container.firstChild.firstChild).toHaveClass('pause');
});


