import { signIn, signOut, useSession } from 'next-auth/react';

/**
 * Show user profile data
 */
const UserProfile = (): JSX.Element => {
  const { data: session } = useSession();

  return (
    <div className="contentBlock">
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
          <span style={{ backgroundImage: `url(${session.user.image})` }} />
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
    </div>
  );
};

export default UserProfile;
