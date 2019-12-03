export const ls = require('store');
export const STORAGE_KEY = 'samsam-crm';

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {

    const syncedData = {
      token: state.auth.token,
    };

    console.log('state', state);
    console.log('mutation', mutation);
    console.log('mutation type', mutation.type);
    console.log('token is set', state.auth.token);
    console.log('syncedData', syncedData);

    ls.set(STORAGE_KEY, syncedData);
  });
};

// export default process.env.NODE_ENV !== 'production' ? [localStoragePlugin] : [localStoragePlugin]
export default [localStoragePlugin];