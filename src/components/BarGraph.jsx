import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const BarGraph = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const categories = Object.keys(data);
  const values = categories.map((category) => data[category]);
  const xLabels = ['custom', 'Category A', 'Category B', 'Category C', 'Category D'];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#f48fb1",
      },
    },
  });
//Bar graph data
  const chartData = {
    xAxis: [
      {
        scaleType: "band",
        data: xLabels,
        categoryGapRatio: 0.7,
      },
    ],
    series: [{ data: values }],
    width: isMobile ? 300 : 600,
    height: isMobile ? 200 : 400,
    colors: ["#CBC3E3"],
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <BarChart {...chartData} />
      </ThemeProvider>
    </div>
  );
};

export default BarGraph;