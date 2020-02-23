import {observable, action} from 'mobx';

export default class pollListStore {
  @observable pollList = [];
  @observable myPollList = [];
  @observable votingItems = [];

  @action set = (key, value) => {
    this[key] = value;
  };

  @action clear() {
    this.set('pollList', []);
    this.set('myPollList', []);
    this.set('votingItems', []);
  }

  constructor() {
    this.clear();
  }
}
