import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Pagina404 from './pages/Pagina404';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" exact component={OrphanagesMap} />
        
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanage/:id" exact component={Orphanage} />
        <Route path="" component={Pagina404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;