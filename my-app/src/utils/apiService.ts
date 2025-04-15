const backendDomain = "http://localhost:5000/";

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | null;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw errorData;
  }
  return response.json();
};

const makeRequest = async (endpoint: string, options: RequestOptions) => {
  const api = backendDomain + endpoint;
  try {
    const response = await fetch(api, options);
    return handleResponse(response);
  } catch (error) {
    console.error("Error : ", error);
    return error;
  }
};

export const getRequest = (endpoint: string, headers?: HeadersInit) => {
  return makeRequest(endpoint, { method: "GET", headers });
};

export const postRequest = (endpoint: string, body?: BodyInit, headers?: HeadersInit) => {
  return makeRequest(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body });
};

export const putRequest = (endpoint: string, body?: BodyInit, headers?: HeadersInit) => {
  return makeRequest(endpoint, { method: "PUT", headers: { "Content-Type": "application/json", ...headers }, body });
};

export const deleteRequest = (endpoint: string, headers?: HeadersInit) => {
  return makeRequest(endpoint, { method: "DELETE", headers });
};
