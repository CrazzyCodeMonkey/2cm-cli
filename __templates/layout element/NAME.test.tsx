import React from "react";

import NAME, {NAMEProps} from "./NAME";

import {render, screen} from 'testUtils';
import {axe} from 'jest-axe';

describe('layouts/PARENT/NAME',()={
  it('should render, and be aXe clean', async ()=>{
    let container;
    const props:NAMEProps={};
    expect(()=>{
      container = render(<NAME {...props} />).container;
    }).not.toThrowError();
    expect(await axe(container)).toHaveNoViolations();
  });
});