import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from './routes/Dashboard';
import { Note } from './routes/Note';
import { GoogleCallback } from './routes/GoogleCallback';
import { ForceSignIn } from './routes/ForceSignIn';
import { useAuth } from './hooks/useAuth';

export const Router = () => {
  const auth = useAuth();

  const Root = auth.user ? Dashboard : ForceSignIn;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Root} />
        <Route path="/note/:id" exact component={Note} />
        <Route path="/google/redirect" exact component={GoogleCallback} />
      </Switch>
    </BrowserRouter>
  );
};
