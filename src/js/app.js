import { Layout } from './components/Layout.js';
import { initRouter } from './router.js';

const app = document.getElementById('app');

app.append(Layout());

initRouter();