/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Inject,
  Component,
  provide
} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';
import { AppStore } from './app-store';
import {
  AppState,
  default as reducer
} from './reducers';
import ChatPage from './pages/ChatPage';
import ChatExampleData from './ChatExampleData';
require('../css/styles.scss');

@Component({
  selector: 'chat-app',
  directives: [ ChatPage ],
  template: `
  <div>
    <chat-page></chat-page>
  </div>
  `
})
class ChatApp {
  constructor(@Inject(AppStore) private store: Store<AppState>) {
    ChatExampleData(store);
  }
}

let devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;

let store: Store<AppState> = createStore<AppState>(
  reducer,
  compose(devtools)
);

bootstrap(ChatApp, [
  provide(AppStore, { useFactory: () => store }),
])
.catch(err => console.error(err));

// --------------------
// You can ignore these 'require' statements. The code will work without them.
// They're currently required to get watch-reloading
// from webpack, but removing them is a TODO
require('./app-store');
require('./reducers');
require('./reducers/UsersReducer');
require('./reducers/ThreadsReducer');
require('./models');
require('./models/User');
require('./models/Message');
require('./models/Thread');
require('./actions');
require('./actions/UserActions');
require('./actions/ThreadActions');
require('./ChatExampleData');
require('./pages/ChatPage');
require('./containers/ChatNavBar');
require('./containers/ChatWindow');
require('./containers/ChatThreads');
require('./components/ChatThread');
require('./components/ChatMessage');
