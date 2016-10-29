/* @flow */
import React from 'react';
const vendors = ['transitionend', 'OTransitionEnd', 'webkitTransitionEnd'];

class WaitForAnimation extends React.Component {
    props: {
      componentDidAnimate: () => void,
      children?: any;  // FIXME:, see facebook/flow#1355
    };
    state: {
      isResetted: boolean,
      isEnded: boolean,
    };
    transitionHasEnded: () => void;
    resetAnimationState: () => void;

    constructor(props) {
      super(props);
      this.state = { 
        isEnded: false,
        isResetted: false,
      };
      this.transitionHasEnded = this.transitionHasEnded.bind(this);
      this.resetAnimationState = this.resetAnimationState.bind(this);
    }

    componentDidMount(): void {
      if (this._containerRef !== null) {
        vendors.forEach(tEvent => {
          this._containerRef.addEventListener(tEvent, () => {
            this.transitionHasEnded();
          }, false);
        })
      }
    }

    componentWillUnmount(): void {
      vendors.forEach(tEvent => {
        this._containerRef.removeEventListener(tEvent);
      })
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
        this.props.componentDidAnimate();
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
          {this.props.children(this.resetAnimationState)}
        </div>
      )
    }
}

export default WaitForAnimation;
