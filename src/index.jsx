import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project imports
import App from '~/App';
import { store, persistor } from '~/store';

// style + assets
import '~/assets/scss/style.scss';
import config from '~/config';
import '~/i18n';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={config.basename}>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
