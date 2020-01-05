import axios from '../axios.js';

const request = function(method, path, params) {
    return new Promise(function(resolve, reject) {
        try{
            if (method === 'get') {
                axios
                    .get(path, {params})
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else if (method === 'post') {
                axios
                    .post(path, params)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else if (method === 'put') {
                axios
                    .put(path, params)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else if (method === 'delete') {
                axios
                    .delete(path, params)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else if (method === 'patch') {
                axios
                    .patch(path, params)
                    .then((response) => {
                        resolve(response.data);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            } else {
                /* eslint-disable-next-line */
                console.log('Exception: unexpected request method - ', method);
            }
        } catch (e) {
            /* eslint-disable-next-line */
            console.log('api failed (method: ' + method + ', path: ' + path + ', params: ', params, ')', e);
            reject(e);
        }
    });
};

export default request;