import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SingIn';

import Deliverymans from '~/pages/Deliverymans';
import Deliveries from '~/pages/Deliveries';
import DeliveryProblems from '~/pages/DeliveryProblems';
import Recipients from '~/pages/Recipients';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliveryProblems" component={DeliveryProblems} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
    </Switch>
  );
}
