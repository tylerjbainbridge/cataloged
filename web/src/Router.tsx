import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Main } from './routes/Main';
import { Note } from './components/Note';
import { Playground } from './routes/Playground';
import { GoogleCallback } from './routes/GoogleCallback';
import { ForceSignIn } from './routes/ForceSignIn';

import { useAuth } from './hooks/useAuth';

export const Router = () => {
  const auth = useAuth();

  const Root = auth.user ? Main : ForceSignIn;

  return (
    <Switch>
      {/* <Route path="/note/:id" exact>
        <Note />
      </Route> */}

      {/* <Route path="/playground" exact>
        <Playground />
      </Route> */}
      <Route path="/google/redirect" exact>
        <GoogleCallback />
      </Route>
      <Route path="*">
        <Root />
      </Route>
    </Switch>
  );
};
