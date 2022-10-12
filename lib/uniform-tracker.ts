import { Tracker } from '@uniformdev/optimize-tracker-common';
import { DeliveryIntentManifest } from '@uniformdev/optimize-common';
import { createDefaultTracker } from '@uniformdev/optimize-tracker-browser';
import intentManifest from './intentManifest.json';

const uniformTracker: Tracker = createDefaultTracker({
  intentManifest: intentManifest as DeliveryIntentManifest,
});

export default uniformTracker;