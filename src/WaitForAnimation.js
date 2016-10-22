/* @flow */
import React from 'react';

function waitForAnimation<Config>(
  ComposedComponent: ReactClass<Config>
): ReactClass {
  return class extends React.Component {
    props: Object;
    state: {
      isReady: boolean,
      isEnded: boolean,
    };
    transitionHasEnded: () => void;
    resetAnimationState: () => void;

    constructor(props) {
      super(props);
      this.state = { 
        isEnded: false,
        isReady: true, 
      };
      this.transitionHasEnded = this.transitionHasEnded.bind(this);
      this.resetAnimationState = this.resetAnimationState.bind(this);
    }

    componentDidMount(): void {
      const vendors = ['transitionend', 'OTransitionEnd', 'webkitTransitionEnd'];
      if (this._containerRef !== null) {
        vendors.forEach(tEvent => {
          this._containerRef.addEventListener(tEvent, () => {
            this.transitionHasEnded();
          }, false);
        })
      }
    }

    componentWillUnmount(): void {
      this._containerRef.removeEventListener('transitionend');
    }

    /**
     * We're only interested in passing animationDidFinish = true
     * to child component when we're coming from !isEnded -> isEnded. 
     * Not when isEnded is already true. This because the transition events API
     * is very limited. For example the: 'transistionstart'' event only works on IE (of all browsers :D)
     * Also, this will allow you to keep your fetched data in animated component without refetching
     * it on every animation. If you dont want this behaviour use this.resetAnimationState first. 
     */
    transitionHasEnded(): void {
      const { isEnded, isResetted } = this.state;
      if (isResetted) {
        this.setState({ isResetted: false });
      } else if (!isEnded) {
        this.setState({ isEnded: true });
      } else {
        this.setState({ isEnded: false });
      }
    }

    /**
     * Set isResetted flag to true. Because we **only** we have
     * a transistionEnd event and it doesn't care if it's our opening
     * or closing animation. We can block a state update in
     * this.transitionHasEnded().
     */
    resetAnimationState(): void {
      if (!this.state.isResetted) {
        this.setState({ isRestted: true });
      }
    }

    render(): React.Element {
      return (
        <div ref={ref => this._containerRef = ref}>
          <ComposedComponent 
            {...this.props}
            resetAnimationState={this.resetAnimationState}
            animationDidFinish={this.state.isEnded} />;
        </div>
      )
    }
  }
}

export default waitForAnimation;
