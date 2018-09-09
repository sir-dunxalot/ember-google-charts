import { later } from '@ember/runloop';

export default async function delay(ms = 1000) {
  return new Promise((resolve) => {
    later(resolve, ms);
  });
}
