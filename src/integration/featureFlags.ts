//import { fetchFlags } from '@dcl/feature-flags'
import { FeatureFlagsResult } from '@dcl/feature-flags'
import { setFeatureFlags } from '../state/actions'
import { store } from '../state/redux'
import { defaultFeatureFlagsState } from '../state/types'
import { callOnce } from '../utils/callOnce'


/**
 * Fetches feature flags from the server and stores them in the redux store.
 */
/* export const initializeFeatureFlags = callOnce(async () => {
  let ff = defaultFeatureFlagsState as FeatureFlagsResult

  try {
    const explorerFeatureFlags = 'http://192.168.0.21:3000 '

    ff = await fetchFlags({ applicationName: ['explorer'] })
  } catch (err) {
    console.error('Error fetching feature flags', err)
  }

  store.dispatch(setFeatureFlags(ff))

  return ff
}) */

// GABE CHANGE

export const initializeFeatureFlags = callOnce(async () => {
  let ff = defaultFeatureFlagsState as FeatureFlagsResult;

  try {
    const response = await fetch('/explorer.json');
    if (response.ok) {
      ff = await response.json();
    } else {
      console.error('Error loading explorer.json', response.status, response.statusText);
    }
  } catch (err) {
    console.error('Error fetching explorer.json', err);
  }

  store.dispatch(setFeatureFlags(ff));

  return ff;
});

