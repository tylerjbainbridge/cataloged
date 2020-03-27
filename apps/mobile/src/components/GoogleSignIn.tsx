import React, { useEffect } from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import { useAuth } from 'cataloged-shared/hooks/useAuth';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  iosClientId:
    '1072260199222-jkrcqtg1friq898g61sgvp4ugp1ddc5o.apps.googleusercontent.com',
});

// Somewhere in your code
const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
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

const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    // console.error(error);
  }
};

export const GoogleSignIn = () => {
  const { signIn, user } = useAuth();

  // const [googleAuth, { error, loading }] = useMutation<googleAuth>(
  //   GOOGLE_AUTH_MUTATION,
  //   {
  //     variables: { code: values.code, isAuthMethod: !!state?.isAuthMethod },
  //     onCompleted: async (data) => {
  //       if (data?.googleAuth?.token) {
  //         await signIn(data.googleAuth.token);
  //         // window.location.replace('/');
  //       } else {
  //         const newState: any = {};

  //         if (state?.googleAccountId)
  //           newState.googleAccountId = state?.googleAccountId;

  //         if (state?.syncContent) newState.syncContent = state?.syncContent;

  //         const query = queryString.stringify(newState);

  //         history.push(`${state?.origin || '/'}${query ? `?${query}` : ''}`);
  //       }
  //     },
  //   },
  // );

  useEffect(() => {
    (async () => {
      // const user = await signIn();
      // console.log({ user });
    })();
  }, []);

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  );
};