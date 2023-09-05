import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/**
 * Pie chart generator class
 * 
 * @param props
 * @param {JSON list} data Pie chart's data
 * @param {list} COLORS Different colors for different pie chart's objects
 * @param {number} PieChart_width Pie chart's width
 * @param {number} PieChart_height Pie chart's height
 *
 * @return {ResponsiveContainer} Display the pie chart.
 */

export default class PieCharts extends PureComponent {

    constructor(props){
        super(props)
    }
    
  render() {
    const {data, COLORS, PieChart_width, PieChart_height} = this.props;
    return (
      <ResponsiveContainer width="50%" height="100%">
        {/* width="50%" make sure the page can contain two pie charts even when zoomed out */}
        <PieChart width={PieChart_width} height={PieChart_height}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* Display the legend vertical and center to the bottom of the pie chart */}
          {/* Or put legend on the right of the pie chart - <Legend layout="vertical" verticalAlign="middle" align="right" iconSize={16} /> */}
          <Legend layout="vertical" align="center" />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
