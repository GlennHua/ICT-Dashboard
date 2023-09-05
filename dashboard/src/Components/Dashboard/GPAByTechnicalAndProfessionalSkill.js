import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, Tooltip, ResponsiveContainer } from 'recharts';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import {averageGPAByTechnicalAndProfessionalSkill} from '../../Request/DashboardRequest';
import { useState } from 'react';
/**
 * Dashboard Page > Line chart Paper Content.
 * Line chart function using MongoDB database dummy data.
 *  
 * @return Display the line chart.
 */

export default function GPAByTechnicalAndProfessionalSkill() {
  const theme = useTheme();
  const [GPAData, setGPAData] = useState({technical:[], professionalSkill:[]})

  useEffect(() => {
    getAverageGPAByTechnicalAndProfessionalSkill().then((data) => {
      setGPAData(data)
    })
  }, []);

  const getAverageGPAByTechnicalAndProfessionalSkill = async () => {
    let {data} = await averageGPAByTechnicalAndProfessionalSkill()
    return data
  }


  return (
    <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Technical Course / Professional Skill Course
          </Typography>
          <ResponsiveContainer>
            <LineChart
              data={GPAData}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="Time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                dataKey="Professional_Skill"
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
                  Average GPA
                </Label>
              </YAxis>
              <Tooltip />
              <Line
                isAnimationActive={false}
                type="monotone" 
                dataKey="Professional_Skill"
                stroke={theme.palette.secondary.main}
                dot={false}
              />
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="Technical"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
  );
}
