import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart } from 'recharts';
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { name: 'Dispensa de Licitação', value: 800 },
  { name: 'Pregão eletrônico', value: 300 },
  { name: 'Concorrência', value: 300 },
  { name: 'Leilão', value: 200 },
];

const COLORS = ['#6d8a39', '#d86b60', '#dbd799', '#3D8BF2'];

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

export default class ModalidadeCompraCard extends PureComponent {
  render() {
    return (
      <>
        <Card>
          <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Modalidades de compras
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
          <ResponsiveContainer width="100%" height={220}>
        <PieChart width={400} height={400}>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
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
