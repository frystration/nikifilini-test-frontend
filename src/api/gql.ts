import {createClient, fetchExchange} from "urql";
console.log(process.env.API_URL);

const client = createClient({
  url: process.env.API_URL || "http://localhost:3000/graphql",
  fetchOptions: () => {
    const token = String(process.env.API_KEY);
    return {
      headers: {"X-API-KEY": token || "" },
    };
  },
  exchanges: [fetchExchange],
});

export default client;
