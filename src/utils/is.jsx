const TYPES = {
  UNDEFINED: "[object Undefined]",
  NULL: "[object Null]",
  BOOLEAN: "[object Boolean]",
  NUMBER: "[object Number]",
  STRING: "[object String]",
  ARRAY: "[object Array]",
  OBJECT: "[object Object]",
  FUNCTION: "[object Function]",
};
function getType(val) {
  return Object.prototype.toString.call(val);
}
const is = {
  undefined: (val) => getType(val) === TYPES.UNDEFINED,
  null: (val) => getType(val) === TYPES.NULL,
  boolean: (val) => getType(val) === TYPES.BOOLEAN,
  number: (val) => getType(val) === TYPES.NUMBER,
  string: (val) => getType(val) === TYPES.STRING,
  array: (val) => getType(val) === TYPES.ARRAY,
  object: (val) => getType(val) === TYPES.OBJECT,
  function: (val) => getType(val) === TYPES.FUNCTION,
};
export default is;
