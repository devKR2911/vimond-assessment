import { evaluateInterval } from "./interval.services";
import { input_data_one, output_data_one } from "@/testdata/testdata-one";
import { input_data_two, output_data_two } from "@/testdata/testdata-two";
import { input_data_three, output_data_three } from "@/testdata/testdata-three";
import { input_data_four, output_data_four } from "@/testdata/testdata-four";
import { input_data_five, output_data_five } from "@/testdata/testdata-five";

describe("sum", () => {
  test("testing dataset 1", () => {
    expect(evaluateInterval(input_data_one)).toEqual(output_data_one);
  });
  test("testing dataset 2", () => {
    expect(evaluateInterval(input_data_two)).toEqual(output_data_two);
  });
  test("testing dataset 3", () => {
    expect(evaluateInterval(input_data_three)).toEqual(output_data_three);
  });
  test("testing dataset 4", () => {
    expect(evaluateInterval(input_data_four)).toEqual(output_data_four);
  });
  test("testing dataset 4", () => {
    expect(evaluateInterval(input_data_five)).toEqual(output_data_five);
  });
});
