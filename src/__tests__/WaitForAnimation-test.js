import React from 'react';
import test from 'tape'
import { shallow, mount, render } from 'enzyme';
import WaitForAnimation from '../WaitForAnimation.js';

import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

class Composed extends React.Component {
  render() {
    return (
      <div>Hello</div>
    )
  }
}
const TestApp = WaitForAnimation(Composed);

const setup = () => {
  const wrapper = shallow(<TestApp />).first().shallow();
  const mounted = mount(<TestApp />);
  return { wrapper, mounted };
}

test('HOC should render ComposedComponent', (assert) => {
  const { mounted } = setup();

  const expected = true;
  const actual = mounted.contains(<div>Hello</div>)
  
  assert.equal(actual, expected);
  assert.end();
});