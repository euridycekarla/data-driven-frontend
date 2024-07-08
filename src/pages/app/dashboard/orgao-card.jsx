import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip,Legend } from 'recharts';
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"


const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 2.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class OrgaoCard extends PureComponent {
  render() {
    return (
      <>
        <Card>
          <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Top 3 órgãos em licitações
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
          <ResponsiveContainer width="100%" height={220}>
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={190}
          cy={150}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          label={renderCustomizedLabel}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
        </CardContent>
    </Card>
      </>
    );
  }
}
