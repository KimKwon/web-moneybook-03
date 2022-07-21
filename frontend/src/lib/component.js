class Component {
  constructor($target, initialState) {
    this.$target = $target;
    this.state = initialState || {};
    this.init();
    this.render();
    this.didMount();
  }

  init() {}

  didMount() {}

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {}
}

export default Component;
