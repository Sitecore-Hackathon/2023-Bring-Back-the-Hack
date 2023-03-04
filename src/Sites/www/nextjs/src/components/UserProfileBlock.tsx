import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import Gravatar from 'react-gravatar';

const urlToLoginPage = ""
const urlToUserProfile = "";


type UserProfileBlockProps = {
  params: { logedInUserEmail: string };
  fields: {
    Rating : Field<Gravatar.Rating>,
    DefaultImage: Field<Gravatar.DefaultImage>
  };
}

const UserProfileBlock = (props: UserProfileBlockProps): JSX.Element => {

    console.log(props);

    if(props.params?.logedInUserEmail === null)
        {
            return (
                <a className="btn btn-primary" role="button" href={urlToLoginPage}>
                    Sign in
                </a>
            );
        }
    else{
        return (
            <div>
                <a className='mx-5 text-decoration-none text-muted' href={urlToLoginPage}>
                    <span>Log out</span>
                </a>
                <a href={urlToUserProfile}>
                    <Gravatar className="rounded-circle shadow-4-strong"
                        email="a-email@example.com" 
                        size={64} 
                        rating={props.fields.Rating.value} 
                        default={props.fields.DefaultImage.value} />
                </a>
            </div>
        );
    }
};

export default UserProfileBlock;