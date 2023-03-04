import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import Link from 'next/link';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

const Navigation = (): JSX.Element => {
  const { t } = useI18n();

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
    </div>
  );
};

export default Navigation;
