import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Detail, TambahSeminar, TambahPeserta } from "./Page";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/seminars" exact component={Home} />
          <Route path="/seminars/tambah" component={TambahSeminar} />
          <Route path="/seminars/:id" exact component={Detail} />
          <Route path="/seminars/:id/peserta" component={TambahPeserta} />
        </Switch>
      </Router>
    );
  }
}

export default App;
