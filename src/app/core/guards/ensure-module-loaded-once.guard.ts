import { NgModule } from '@angular/core';

class EnsureModuleLoadedOnce {
  constructor(targetModule: NgModule) {
    if (targetModule) {
      throwIfAlreadyLoaded(targetModule);
    }
  }
}

const throwIfAlreadyLoaded = (parentModule: NgModule): void => {
  if (parentModule) {
    throw new Error(
      `${parentModule.constructor.name} has already been loaded. Import this module in the AppModule only.`
    );
  }
};

export { EnsureModuleLoadedOnce, throwIfAlreadyLoaded };
