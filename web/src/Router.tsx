import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { Dashboard } from './routes/Dashboard';
import { Note } from './components/Note';
import { Playground } from './routes/Playground';

import { GoogleCallback } from './routes/GoogleCallback';
import { ForceSignIn } from './routes/ForceSignIn';
import { useAuth } from './hooks/useAuth';

export const Router = () => {
  const auth = useAuth();

  const Root = auth.user ? Dashboard : ForceSignIn;

  return (
    <Switch>
      <Route path="/note/:id" exact>
        <Note />
      </Route>
      <Route path="/google/redirect" exact>
        <GoogleCallback />
      </Route>
      <Route path="/playground" exact>
        <Playground />
      </Route>
      <Route path="*">
        <Root />
      </Route>
    </Switch>
  );
};
