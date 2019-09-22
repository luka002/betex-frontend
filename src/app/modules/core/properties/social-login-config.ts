import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {environment} from '../../../../environments/environment';

const socialConfig = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleLoginProviderID)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookLoginProviderID)
  },
]);

export function socialAuthConfig() {
  return socialConfig;
}
