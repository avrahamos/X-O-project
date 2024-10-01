import fs from "fs/promises";
import path from "path";

export const getFileData = async <T>(resource: string): Promise<T[] | void> => {
  try {
    const filePath = path.join(__dirname, "..", "data", `${resource}.json`);
    const strData = await fs.readFile(filePath, "utf-8");
    const parseData: T[] = JSON.parse(strData);
    return parseData;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveFileData = async <T>(
  resource: string,
  data: T[]
): Promise<boolean> => {
  try {
    const filePath = path.join(__dirname, "..", "data", `${resource}.json`);
    const strFData = JSON.stringify(data);
    await fs.writeFile(filePath, strFData, { encoding: "utf-8" });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
