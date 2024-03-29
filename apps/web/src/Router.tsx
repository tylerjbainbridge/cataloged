import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from 'cataloged-shared/hooks/useAuth';

import { Main } from './routes/Main';
import { Playground } from './routes/Playground';
import { GoogleCallback } from './routes/GoogleCallback';
import { ForceSignIn } from './routes/ForceSignIn';

import { GRAPHQL_ENDPOINT } from './config';
import { Collection, CollectionPage } from './routes/CollectionPage';

export const Router = () => {
  const auth = useAuth();

  const Root = auth.user ? Main : ForceSignIn;

  return (
    <Switch>
      {/* <Route path="/note/:id" exact>
        <Note />
      </Route> */}

      {process.env.NODE_ENV === 'development' && (
        <Route path="/playground" exact>
          <Playground />
        </Route>
      )}
      {/* 
      {auth.user && auth.user.role === 'admin' && (
        <Route path="/graphql" exact>
          <Playground
            endpoint={`${GRAPHQL_ENDPOINT}?token=${localStorage.token}`}
          />
        </Route>
      )} */}

      <Route path="/google/redirect" exact>
        <GoogleCallback />
      </Route>
      <Route path="*">
        <Root />
      </Route>
    </Switch>
  );
};
