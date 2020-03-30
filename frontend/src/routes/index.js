import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SingIn';

import Deliverymans from '~/pages/Deliverymans';
import RegisterDeliverymans from '~/pages/Deliverymans/RegisterDeliverymans';
import Deliveries from '~/pages/Deliveries';
import DeliveryProblems from '~/pages/DeliveryProblems';
import Recipients from '~/pages/Recipients';
import RegisterDelivery from '~/pages/Deliveries/RegisterDelivery';
import registerRecipients from '~/pages/Recipients/RegisterRecipients';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route
        path="/registerDeliverymans"
        component={RegisterDeliverymans}
        isPrivate
      />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/registerDelivery" component={RegisterDelivery} isPrivate />
      <Route path="/deliveryProblems" component={DeliveryProblems} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route
        path="/registerRecipients"
        component={registerRecipients}
        isPrivate
      />
    </Switch>
  );
}
