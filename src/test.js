import data from './city';
import { firstBy } from './thenByFixed';

data.sort(
  firstBy((v1, v2) => v1.name.length - v2.name.length)
    .thenBy((v1, v2) => v1.population - v2.population)
    .thenBy((v1, v2) => v1.id - v2.id),
);

console.log(data);
