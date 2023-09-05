import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer } from 'recharts';
import Title from './Title';

/**
 * Line chart general function
 * 
 * @param theme '@mui/material/styles' function - useTheme()
 * @param {string} title Line chart's title
 * @param {JSON list} graphData Line chart's data
 * @param {string} dataKeyX Data key for line chart's x-axis
 * @param {string} dataKeyY Data key for line chart's y-axis
 * @param {string} labelText The text labelled for line chart's y-axis
 * @param {string} dataKeyLine Data key for line chart's display line
 * @return {React.Fragment} Display the line chart.
 */

export function ChartContent(theme, title, graphData, dataKeyX, dataKeyY, labelText, dataKeyLine) {
    return (
        <React.Fragment>
          <Title>{title}</Title>
          <ResponsiveContainer>
            <LineChart
              data={graphData}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey={dataKeyX}
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                dataKey={dataKeyY}
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  {labelText}
                </Label>
              </YAxis>
              <Tooltip />
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey={dataKeyLine}
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
      );
}
