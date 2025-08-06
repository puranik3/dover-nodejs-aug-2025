console.log( '*** [3] started main file execution ***');

// import Pie, { /*sum,?*/ diff as difference, multiply } from "./02-arithmetic.js";
// import("./02-arithmetic.js").then(m => {
//  const { diff, multiply } = m.defaults
// });
const { diff, multiply } = require("./02-arithmetic.js");

// The exports from "./02-arithmetic" would have been cached

const { diff : difference } = require("./02-arithmetic.js");

// console.log( sum( 10, 5 ) );
console.log( diff( 10, 5 ) );

console.log( '*** [4] completed main file execution ***');

// Answer: 3 1 2 4