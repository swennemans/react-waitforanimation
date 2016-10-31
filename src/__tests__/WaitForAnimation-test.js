import WaitForAnimation from '../WaitForAnimation.js';

// see: https://github.com/facebook/jest/issues/1353
// could possibly be removed because removed enzyme. 
beforeEach(() => jest.resetModules());

 describe('EventListener.', () => { 
  const React = require('react');
  const TestUtils = require('react-addons-test-utils');
  const sinon = require('sinon');
  
  sinon.spy(WaitForAnimation.prototype, 'transitionHasEnded');
  
  const mockFn = jest.fn();
  
  test('isEnded should start as false', () => {
    //initiate here because otherwise state has already changed. because of async??
    const comp = TestUtils.renderIntoDocument(<WaitForAnimation componentDidAnimate={mockFn}>
    {(reset) => <div></div>}
    </WaitForAnimation>)
    expect(comp.state.isEnded).toBe(false);
  })

  const comp = TestUtils.renderIntoDocument(<WaitForAnimation componentDidAnimate={mockFn}>
  {(reset) => (
      <div></div>
    )}
  </WaitForAnimation>)

  //** setup + dispatch event *//
  const transistionEvent = new Event('transitionend', { bubbles: false });
  comp._containerRef.dispatchEvent(transistionEvent)

  test('transitionHasEnded should be called', () => {
    expect(WaitForAnimation.prototype.transitionHasEnded.calledOnce).toBe(true);
  })

  test('isEnded should be set to true', () => {
    expect(comp.state.isEnded).toBe(true);
  })

  test('componentDidAnimate prop should be called', () => {
    expect(mockFn).toHaveBeenCalled();
  })

})

test('Component should render', () => {
  const React = require('react');
  const renderer = require('react-test-renderer');

  const mockFn = jest.fn();
  const component = renderer.create(
    <WaitForAnimation componentDidAnimate={mockFn}>
    {(reset) => <div></div> }
    </WaitForAnimation>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



