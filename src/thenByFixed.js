/** *
   Copyright 2013 Teun Duynstee

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
export const firstBy = (function firstBy() {
  function identity(v) {
    return v;
  }

  function ignoreCase(v) {
    return typeof (v) === 'string' ? v.toLowerCase() : v;
  }

  function makeCompareFunction(f, opt) {
    let value = f;
    let option = opt;
    option = typeof (option) === 'number' ? {
      direction: option,
    } : option || {};
    if (typeof (value) !== 'function') {
      const prop = value;
      // make unary function
      value = function makeUnaryFunction(v1) {
        return v1[prop] ? v1[prop] : '';
      };
    }
    if (value.length === 1) {
      // value is a unary function mapping a single item to its sort score
      const uf = value;
      const preprocess = option.ignoreCase ? ignoreCase : identity;
      const cmp = option.cmp || function compare(v1, v2) {
        if (v1 < v2) {
          return -1;
        }

        if (v1 > v2) {
          return 1;
        }

        return 0;
      };
      value = function compare(v1, v2) {
        return cmp(preprocess(uf(v1)), preprocess(uf(v2)));
      };
    }
    if (option.direction === -1) {
      return function getValue(v1, v2) {
        return -value(v1, v2);
      };
    }
    return value;
  }

  /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenBy` method as well */
  function tb(func, opt) {
    /* should get value false for the first call. This can be done by calling the
        exported function, or the firstBy property on it (for es6 module compatibility)
        */
    const x = (typeof (this) === 'function' && !this.firstBy) ? this : false;
    const y = makeCompareFunction(func, opt);
    const f = x ? function getValue(a, b) {
      return x(a, b) || y(a, b);
    }
      : y;
    f.thenBy = tb;
    return f;
  }

  tb.firstBy = tb;
  return tb;
}());

export default {
  firstBy,
};
