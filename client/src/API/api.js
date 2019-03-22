import request from 'superagent';

// get endpoint
export const getEndpoint = endpoint => {
  const url = endpoint;
  return request.get(url);
};

// post endpoint
export const postEndpoint = endpoint => {
  const url = endpoint;
  return request.post(url);
};

// update endpoint
export const updateEndpoint = endpoint => {
  const url = endpoint;
  return request.update(url);
};

// delete endpoint
export const deleteEndpoint = endpoint => {
  const url = endpoint;
  return request.delete(url);
};
