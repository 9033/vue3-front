import yaml from "js-yaml";

/** yaml to object */
export const yaml2obj = (_yaml: string): any => {
  const doc = yaml.load(_yaml);
  import.meta.env.DEV && console.log(doc);
  return doc;
};

/** yaml 입력 타입 -> input 입력 타입 */
export const inputType = (type: string) => {
  if (type === "string") return "text";
  return type;
};
