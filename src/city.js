class City {
  constructor(name, population, id) {
    this.name = name;
    this.population = population;
    this.id = id;
  }
}

const data = [new City('Minsk', 20, 1), new City('Moskow', 100, 2), new City('Minsk', 30, 3)];

export default data;
