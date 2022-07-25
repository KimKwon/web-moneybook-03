import App from './components/app';
import defineLinkComponent from './components/Link';
import { definePrototypeMethod } from './utils/date';

const app = document.querySelector('#app');

definePrototypeMethod();
defineLinkComponent();
new App(app);
