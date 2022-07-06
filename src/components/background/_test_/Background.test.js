import React from "react";
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Backround from "../Background";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => { 
    render(<Backround/>);
});

it("matches snapshot", () => {
    const tree = renderer.create(<Backround/>).toJSON();
    expect(tree).toMatchSnapshot();
});