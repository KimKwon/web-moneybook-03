import App from './components/app';
import defineLinkComponent from './components/Link';

const app = document.querySelector('#app');

defineLinkComponent();
new App(app);
