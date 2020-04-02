import { useMutation } from '@apollo/client';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { googleAuth } from 'cataloged-shared/graphql/__generated__/googleAuth';
import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { GOOGLE_AUTH_MUTATION } from 'cataloged-shared/queries/google';
import React, { useEffect } from 'react';
import { ROUTES } from '../Router';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  webClientId:
    '1072260199222-usls378j10q7km3r58qd7p4ujp87bqf5.apps.googleusercontent.com',
  iosClientId:
    '1072260199222-jkrcqtg1friq898g61sgvp4ugp1ddc5o.apps.googleusercontent.com',
  offlineAccess: true,
});

// Somewhere in your code
const attemptGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const { serverAuthCode } = await GoogleSignin.signIn();

    return { code: serverAuthCode };
  } catch (error) {
    return {};

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }

    // throw error;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    // console.error(error);
  }
};

export const GoogleSignIn = () => {
  const { signIn, user } = useAuth();

  const [googleAuth, { error, loading }] = useMutation<googleAuth>(
    GOOGLE_AUTH_MUTATION,
    {
      onCompleted: async (data) => {
        if (data?.googleAuth?.token) {
          await signIn(data.googleAuth.token);
          // window.location.replace('/');
        }
      },
    },
  );

  useEffect(() => {
    (async () => {
      // const user = await signIn();
      // console.log({ user });
    })();
  }, []);

  const googleCallback = async () => {
    const { code } = await attemptGoogleSignIn();

    await googleAuth({ variables: { code, isAuthMethod: true } });
  };

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleCallback}
    />
  );
};
