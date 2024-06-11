const assert = require('assert');
const { fetchData } = require('../index');

const url = 'https://pokeapi.co/api/v2/pokemon/ditto';

describe('fetchData', () => {
  it('should fetch data from the API', async () => {
    const data = await fetchData(url);
    assert.strictEqual(typeof data, 'object', 'Expected data to be an object');
  });
});
