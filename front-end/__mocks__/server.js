// __mocks__/server.js

const server = {
  routes: {
    login: {
      url: "/login",
      methods: ["POST"]
    },
    register: {
      url: "/register",
      methods: ["POST"]
    }
  }
};

export default server;