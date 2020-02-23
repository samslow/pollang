import PollListStore from 'stores/pollListStore';

export default class rootStore {
  constructor() {
    this.PollListStore = new PollListStore();
  }
}
