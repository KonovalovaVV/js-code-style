import {data} from './city.js';
import {firstBy} from './thenByFixed.js';

data.sort(
    firstBy(function (v1, v2) { return v1.name.length - v2.name.length; })
    .thenBy(function (v1, v2) { return v1.population - v2.population; })
    .thenBy(function (v1, v2) { return v1.id - v2.id; })
);

console.log(data);