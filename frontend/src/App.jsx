import React from "react";
import DocumentTitle from "react-document-title";

import Routes from "./Routes";

const App = () => (
  <DocumentTitle title="Todos">
    <Routes />
  </DocumentTitle>
);

export default App;
