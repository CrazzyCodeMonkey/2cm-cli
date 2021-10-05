import React from "react";

import Bar, {BarProps} from "./Bar";

import {render, screen} from 'testUtils';
import {axe} from 'jest-axe';

describe('components/Bar',()={
  it('should render, and be aXe clean', async ()=>{
    let container;
    const props:BarProps={};
    expect(()=>{
      container = render(<Bar {...props} />).container;
    }).not.toThrowError();
    expect(await axe(container)).toHaveNoViolations();
  });
});