import React, { useState,useEffect } from "react";
import { PieChart } from "@mui/x-charts";

function PieChartt({ data, colors }) {
  // const MyComponent = styled('div')({
  //     color: 'darkslategray',
  //     backgroundColor: 'aliceblue',
  //     padding: 8,
  //     borderRadius: 4,
  //   });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <PieChart
      
      height={400}
      colors={colors || ["#33FFA8", "#FF5733"]} // Use palette
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
    />
  );
}

export default PieChartt;
