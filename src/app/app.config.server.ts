import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import  {  IConfig, provideEnvironmentNgxMask  }  from  'ngx-mask' 


const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideEnvironmentNgxMask(maskConfigFunction),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
