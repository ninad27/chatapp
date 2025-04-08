const backendDomain = "http://localhost:5000/";

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | null;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const handleError = (error: any) => {
  console.error("API Error:", error);
  alert(`An error occurred: ${error.message || "Unknown error"}`);
  throw error; // Re-throw the error for further handling if needed
};

const makeRequest = async (endpoint: string, options: RequestOptions) => {
  const api = backendDomain + endpoint;
  try {
    const response = await fetch(api, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
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
