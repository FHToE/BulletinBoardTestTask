import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IBindingCallback1 } from '@models/Callbacks';
import { ILoginRequest } from '@screens/Authentication/containers/LoginPage';
import LogoWithText from '@components/LogoWithText';

import styles from './styles.module.sass';

interface ILoginForm {
  login: IBindingCallback1<ILoginRequest>;
  isLoginLoading: boolean;
  isLanding: boolean;
}

const LoginForm: FunctionComponent<ILoginForm> = ({
  login,
  isLoginLoading,
  isLanding
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChanged = data => {
    setEmail(data);
  };

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleLoginClick = () => {
    login({ email, password });
  };

  return (
    <Grid textAlign="center" className={styles.main_container}>
      <Grid.Column className={styles.main_container__column}>
        <Header as="h2" textAlign="center" className={styles.main_container__header}>
          <LogoWithText />
        </Header>
        {isLanding && <h3 style={{fontSize: '25px' }}>Get access now</h3>}
        <Form name="loginForm" size="large" style={{paddingTop: '20px'}} onSubmit={handleLoginClick}>
          <Segment className={styles.main_container__form}>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Email"
              type="email"
              labelPosition="left"
              label="Email"
              onChange={ev => emailChanged(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              labelPosition="left"
              label="Password"
              onChange={ev => passwordChanged(ev.target.value)}
            />
            <div>
              <Button
                color="teal"
                className={styles.main_container__button_login}
                loading={isLoginLoading}
                disabled={!login || !password}
              >
                LOGIN
              </Button>
            </div>
          </Segment>
        </Form>
        <Message color="black" className={styles.main_container__signUp_message}>
          New to us?
          {' '}
          <NavLink exact to="/register">Sign Up</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
