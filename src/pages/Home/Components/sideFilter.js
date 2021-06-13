import React from "react";
import { Form, Select, Radio, Slider } from "antd";
import { generalLocations, cuisines, types } from "../Components/helpers";
import { useHomePageContext } from "../HomeContainer";

const SideFilter = () => {
  const { setFilterValues } = useHomePageContext();

  const [form] = Form.useForm();

  const { Option } = Select;

  const handleFilter = (values) => {
    console.log("hi");
    console.log(values);
    let filterValues = {},
      key;
    for (key in values) {
      if (values[key] === undefined || values[key] === null) continue;
      filterValues[key] = values[key];
    }

    if (Object.keys(filterValues).length === 0) return;

    setFilterValues(filterValues);
  };

  const handleReset = () => {
    form.resetFields();
    setFilterValues({});
  };

  return (
    <div class="shadow-2xl w-60 fixed left-0 h-screen hidden xl:block px-4 pt-32">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFilter}
      >
        <Form.Item
          label={<span class="font-bold m-0">General Location</span>}
          name="generalLocation"
          className="w-4/5"
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="General Location"
            allowClear
          >
            <Option value={null}>None</Option>
            {generalLocations.map((loc) => (
              <Option value={loc}>{loc}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span class="font-bold m-0">Cuisine</span>}
          name="cuisine"
          className="w-4/5"
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Cuisine"
            mode="multiple"
            allowClear
          >
            {cuisines.map((cuisine) => (
              <Option value={cuisine}>{cuisine}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span class="font-bold m-0">Type</span>}
          name="type"
          className="w-4/5"
        >
          <Select
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Type"
            allowClear
          >
            <Option value={null}>None</Option>
            {types.map((type) => (
              <Option value={type}>{type}</Option>
            ))}
          </Select>
        </Form.Item>

        <div class="flex justify-start">
          <div class="mr-4">
            <Form.Item
              name="isHalal"
              label={<span class="font-bold m-0">Halal</span>}
              initialValue={null}
            >
              <Radio.Group>
                <div class="flex">
                  <Radio value={true}>T</Radio>
                  <Radio value={false}>F</Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="isAirCon"
              label={<span class="font-bold m-0">Air-Con</span>}
              initialValue={null}
            >
              <Radio.Group>
                <div class="flex">
                  <Radio value={true}>T</Radio>
                  <Radio value={false}>F</Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        <Form.Item
          name="price"
          label={<span class="font-bold m-0">Price of Food ($)</span>}
        >
          <Slider
            defaultValue={5}
            max={60}
            marks={{
              0: "0",
              10: "10",
              20: "20",
              30: "30",
              40: "40",
              50: "50",
              60: "60",
            }}
          />
        </Form.Item>

        <div class="flex">
          <Form.Item>
            <button
              class="bg-white border-2 border-red-500 mx-6 my-8 w-4/6 font-bold py-1 hover:bg-red-500 hover:text-white"
              htmlType="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </Form.Item>

          <Form.Item>
            <button
              class="bg-white border-2 border-orange mx-6 my-8 w-4/6 font-bold py-1 hover:bg-orange hover:text-white"
              htmlType="submit"
            >
              Filter
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SideFilter;
