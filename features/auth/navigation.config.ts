import { NavigatorConfig } from '../../navigation/config';

// This is a placeholder - in a real app, you would create these components
// and import them properly
const LoginScreenComponent = () => null;
const RegisterScreenComponent = () => null;
const ForgotPasswordScreenComponent = () => null;

export const authNavigationConfig: NavigatorConfig = {
  type: 'stack',
  name: 'Auth',
  initialRouteName: 'Login',
  options: {
    headerShown: false,
  },
  screens: [
    { 
      name: 'Login', 
      component: LoginScreenComponent,
      options: { title: 'Login' }
    },
    { 
      name: 'Register', 
      component: RegisterScreenComponent,
      options: { title: 'Register' }
    },
    { 
      name: 'ForgotPassword', 
      component: ForgotPasswordScreenComponent,
      options: { title: 'Forgot Password' }
    },
  ],
}; 