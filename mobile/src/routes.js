// In App.js in a new project

import React from 'react';
import {useSelector} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '~/pages/SignIn';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import Details from '~/pages/Details';
import DeliveryProblem from '~/pages/DeliveryProblem';
import ListProblems from '~/pages/ListProblems';
import ConfirmDelivery from '~/pages/ConfirmDelivery';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OrdersStack = createStackNavigator();

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Deliveries"
        component={Deliveries}
        options={{ headerShown: false }}
      />
      <OrdersStack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: 'Detalhes da entrega',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:'#7D40E7',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
      <OrdersStack.Screen
          name="DeliveryProblem"
          component={DeliveryProblem}
          options={{
            title: 'Informe problema',
            headerTintColor:'#fff',
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'bold',
            },
            headerLeftContainerStyle:{
              marginLeft:10,
            },
            headerStyle:{
              backgroundColor:'#7D40E7',
              elevation: 0,
              shadowOpacity: 0
            },
          }}
        />
         <OrdersStack.Screen
          name="ListProblems"
          component={ListProblems}
          options={{
            title: 'Visualizar problemas',
            headerTintColor:'#fff',
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'bold',
            },
            headerLeftContainerStyle:{
              marginLeft:10,
            },
            headerStyle:{
              backgroundColor:'#7D40E7',
              elevation: 0,
              shadowOpacity: 0
            },
          }}
        />
         <OrdersStack.Screen
          name="ConfirmDelivery"
          component={ConfirmDelivery}
          options={{
            title: 'Confirmar entrega',
            headerTintColor:'#fff',
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:18,
              fontWeight:'bold',
            },
            headerLeftContainerStyle:{
              marginLeft:10,
            },
            headerStyle:{
              backgroundColor:'#7D40E7',
              elevation: 0,
              shadowOpacity: 0
            },
          }}
        />
    </OrdersStack.Navigator>
  );
}

function Routes() {
  const signed = useSelector(state=>state.auth.signed);
  return(
    <NavigationContainer>
     { signed ? (
       <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar:true,
          activeTintColor:'#7D40E7',
          labelStyle:{
            fontSize:14,
          },
          tabStyle:{
            height:45,
          },
          style:{
            backgroundColor:'#fff',
          },
        }}
       >
        <Tab.Screen
          name="Entregas"
          component={OrdersStackScreen}
          options={Deliveries.navigationOptions}

        />
        <Tab.Screen
          name="Perfil"
          component={Profile}
          options={Profile.navigationOptions}
        />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator screenOptions={{
          headerShown:true,
        }}
      >
        <Stack.Screen
          name="SignIn" component={SignIn}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
  </NavigationContainer>
 )
}

export default Routes;
