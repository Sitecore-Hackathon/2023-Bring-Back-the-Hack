import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import SignIn from './SignIn';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

const Navigation = (): JSX.Element => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link href="/">
          <a className="text-dark">
            <img src={`${publicUrl}/sc_logo.svg`} alt="Sitecore" />
          </a>
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a
          href="https://styleguide.hackback.localhost"
          // target="_blank"
          className="p-2 text-dark"
          rel="noreferrer"
        >
          Styleguide
          {/* {t('Styleguide')} */}
        </a>
      </nav>
      <SignIn />
    </div>
  );
};

export default Navigation;
