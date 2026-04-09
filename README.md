# cosc360-group13

Our project is a virtual library and book exchange platform. It will let users share, borrow, and exchange books with others in their local community.

See our [group contract](contract.md) and [project proposal](proposal.md) for more information.

# Front-End

To start the front-end (the client) development server, run the following:

```sh
cd front-end
npm install
npm run dev
```

# Testing

```sh
cd front-end
npm install --save-dev identity-obj-proxy
npm install --save-dev util
npm install --save-dev @babel/preset-typescript
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev jest
npm install --save-dev jest-environment-jsdom
npm install --save-dev @babel/preset-react
npm run test
```

