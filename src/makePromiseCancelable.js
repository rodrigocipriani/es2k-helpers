/**
 * How to use
 *
  import {makePromiseCancelable} from '../../../es2x/helpers';

  const promise = makePromiseCancelable(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise return');
    }, 4000);
  }));

   promise.then(res => {
    console.log(`promise resolved: ${ res }`);
  }).catch((reason) => console.log('isCanceled', reason.isCanceled));
 *
 * */

const makePromiseCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val =>
      hasCanceled ? reject({ isCanceled: true }) : resolve(val)
    );
    promise.catch(error =>
      hasCanceled ? reject({ isCanceled: true }) : reject(error)
    );
  });

  wrappedPromise.cancel = () => {
    hasCanceled = true;
  };

  return wrappedPromise;
};

export default makePromiseCancelable;
