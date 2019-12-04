export const ls = require('store');
export const STORAGE_KEY = 'hiway-crm';

const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {

        const syncedData = {
            token: state.token,
        };

        ls.set(STORAGE_KEY, syncedData);
    });
};

// export default process.env.NODE_ENV !== 'production' ? [localStoragePlugin] : [localStoragePlugin]
export default [localStoragePlugin];