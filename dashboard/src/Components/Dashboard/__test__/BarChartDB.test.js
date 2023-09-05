import React  from "react";
import {render, screen} from "@testing-library/react";
import BarChartDB from "../BarChartDB";
import * as ResizeObserver from 'resize-observer-polyfill';
global.ResizeObserver = ResizeObserver.default

describe('testing BarChartDB component ',()=>{
    it('',()=>{
        render(<BarChartDB/>);
    screen.getByText('Number of students')
    })
})