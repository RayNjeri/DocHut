import { mount, shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function getContexts() {
  return {
    context: {
      muiTheme: getMuiTheme(),
      router: {}
    },
    childContextTypes: {
      muiTheme: getMuiTheme,
    }
  };
}

export function shallowWithContext(node) {
  return shallow(node, getContexts());
}

export function mountWithContext(node) {
  return mount(node, getContexts());
}
