export const ls = require("store");
export const STORAGE_KEY = "hiway-crm";

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const syncedData = {
      token: state.token,
      user: state.user,
      locale: state.locale
    };

    ls.set(STORAGE_KEY, syncedData);
    if (mutation.type === "CLEAR_ALL_DATA") {
      ls.delete(STORAGE_KEY);
    }
  });
};

export default [localStoragePlugin];
