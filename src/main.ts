import { Container } from 'inversify';
import { App } from './app';
import { appBindings } from './inversify.config';
import { TYPES } from './types';

interface Bootstrap {
  app: App;
  appContainer: Container;
}

function bootstrap(): Bootstrap {
  const appContainer = new Container();

  appContainer.load(appBindings);

  const app = appContainer.get<App>(TYPES.Application);

  app.init();

  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
