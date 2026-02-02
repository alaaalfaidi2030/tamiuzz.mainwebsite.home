import { Suspense, lazy } from "react";
import Spinner from "../Component/Ui/Spinner/Spinner";

export const lazyWithRetry = (componentImport, retries = 3) => {
  return lazy(() =>
    componentImport().catch((error) => {
      if (retries > 0) {
        console.warn(
          `Failed to load component, retrying... (${retries} attempts left)`
        );
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(lazyWithRetry(componentImport, retries - 1));
          }, 1000);
        });
      }
      throw error;
    })
  );
};
const preloadCache = new Set();

export const preloadRoute = (routeImport) => {
 
  const routeKey = routeImport.toString();
  if (preloadCache.has(routeKey)) {
    return Promise.resolve();
  }
  
  preloadCache.add(routeKey);
  
  return routeImport()
    .then((module) => {
      return module;
    })
    .catch((error) => {
     
      preloadCache.delete(routeKey);
      console.warn('Failed to preload route:', error);
      throw error;
    });
};
export const withLazySuspense = (LazyComponent, customLoader = null) => {
  const LoadingComponent = customLoader || (() => <Spinner sectionFlag />);

  return (props) => (
    <Suspense fallback={<LoadingComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};


export const createLazyLoadingComp = (importFn, customLoader = null) => {
  const LazyComponent = lazyWithRetry(importFn);
  return withLazySuspense(LazyComponent, customLoader);
};