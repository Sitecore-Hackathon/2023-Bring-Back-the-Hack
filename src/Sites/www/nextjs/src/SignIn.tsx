import { signIn, signOut, useSession } from 'next-auth/react';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function SignIn() {
  const { data: session /*, status*/ } = useSession();
  // const loading = status === 'loading';

  return (
    <div>
      <p>
        {!session && (
          <>
            <span>You are not signed in</span>
            <a
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            <span>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email || session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </p>
    </div>
  );
}
