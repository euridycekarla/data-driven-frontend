import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart } from 'recharts';
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class OrgaoCard extends PureComponent {
  render() {
    return (
    <>
        <Card>
          <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Top 5 órgãos em licitações
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
          <ResponsiveContainer width="100%" height={200}>
      <PieChart width={300} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <Tooltip />
      <Legend/>

      </ResponsiveContainer>
          </CardContent>
        </Card>
    </>
    );
  }
}