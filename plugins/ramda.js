import * as R from 'ramda'
import Vue from 'vue'
Vue.prototype.R = R

/*
Ramda 在 0.25 以后，不会再提供默认输出（default export）。所以不要再用 import R from 'ramda'，而应该使用 import * as R from 'ramda' 引入 ramda。或者更好的方式是，通过 import { functionName } from 'ramda' 只引入必需的函数。
*/
