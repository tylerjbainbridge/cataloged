import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Dashboard } from './routes/Dashboard';
import { GoogleCallback } from './routes/GoogleCallback';
import { ForceLogin } from './routes/ForceLogin';
import { useAuth } from './hooks/useAuth';

export const Router = () => {
  const auth = useAuth();

  const RootComponent = auth.user ? Dashboard : ForceLogin;

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RootComponent} />
        <Route path="/google/redirect" exact component={GoogleCallback} />
      </Switch>
    </BrowserRouter>
  );
};
