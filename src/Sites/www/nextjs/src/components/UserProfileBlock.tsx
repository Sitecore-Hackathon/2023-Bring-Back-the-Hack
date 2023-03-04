import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { signIn, signOut, useSession } from 'next-auth/react';
import Gravatar from 'react-gravatar';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

type UserProfileBlockProps = {
  fields: {
    Rating : Field<Gravatar.Rating>,
    DefaultImage: Field<Gravatar.DefaultImage>
  };
}

const UserProfileBlock = (props: UserProfileBlockProps): JSX.Element => {

    const { data: session /*, status*/ } = useSession();

    console.log(props);
    if (session?.user){
        return (
            <div>
                <a
                    className='mx-5 text-decoration-none text-muted' 
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}>
                    <span>Sign Out</span>
                </a>
                <a className='mx-2'>
                    <Gravatar className="rounded-circle shadow-4-strong"
                        email={session.user.email!} 
                        size={64} 
                        rating={props.fields.Rating.value} 
                        default={props.fields.DefaultImage.value} />
                </a>
            </div>
        );
    }
    else
        {
            return (
                <a 
                className="text-decoration-none"  
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();}}>
                    Sign In
                </a>
            );
        }
};

export default UserProfileBlock;