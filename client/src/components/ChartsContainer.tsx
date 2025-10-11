import { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarCharts from "./BarCharts";
import AreaCharts from "./AreaCharts";
const ChartsContainer = ({ data }: any) => {
  const [barChart, setbarChart] = useState(true);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setbarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarCharts data={data} /> : <AreaCharts data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
