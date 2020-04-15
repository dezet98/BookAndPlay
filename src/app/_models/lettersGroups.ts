import { LettersGroup } from './lettersGroup';

export class LettersGroups {
  items: Array<LettersGroup>;

  constructor(items: Array<string>) {
    this.items = this.groupByLetters(items);
  }

  /* this method change list ['Monachium', 'Kraków', 'Moscow'] to:
  [ {letter: 'K', items: ['Kraków']}, {letter: 'M', items: ['Moscow', 'Monachium']} ]*/
  groupByLetters(list: Array<string>): Array<LettersGroup> {
    if (list.length === 0) {
      return [];
    }
    let items = list.sort();
    const results: Array<LettersGroup> = [];

    let letter = items[0][0].toUpperCase();
    let singleGroup: Array<string> = [];
    while (items.length > 0) {
      if (items[0][0].toUpperCase() === letter) {
        singleGroup.push(items[0]);
      }
      else {
        results.push(new LettersGroup(letter, singleGroup));
        singleGroup = [items[0]];
        letter = items[0][0].toUpperCase();
      }

      items = items.slice(1, items.length);
    }
    results.push(new LettersGroup(letter, singleGroup));

    return results;
  }

  getItems(): Array<LettersGroup> {
    return this.items;
  }
}
