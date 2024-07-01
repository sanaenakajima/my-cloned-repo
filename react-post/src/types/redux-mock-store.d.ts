declare module 'redux-mock-store' {
    import { Store, AnyAction } from 'redux';
  
    export interface MockStoreCreator<S = any> {
      <T extends S = S>(state?: T): MockStoreEnhanced<T>;
    }
  
    export interface MockStoreEnhanced<S = any> extends Store<S, AnyAction> {
      getActions(): AnyAction[];
      clearActions(): void;
    }
  
    export default function configureStore<S = any>(middlewares?: any[]): MockStoreCreator<S>;
  }
  