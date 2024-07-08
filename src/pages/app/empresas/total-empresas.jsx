import React, { PureComponent } from 'react';
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";

const data = [
  { name: "2025", uv: 4000 },
  { name: "2024", uv: 3000 },
  { name: "2023", uv: 2000 },
  { name: "2022",uv: 2058 },
  { name: "2021", uv: 1890 }
];

export default class TotalEmpresaCard extends PureComponent {

  render() {
    return (
    <>
        <Card>
          <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Número de empresas participantes por ano (fornecedores)
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
      <ResponsiveContainer width={800} height={300}>
      <LineChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          connectNulls
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
        </CardContent>
      </Card>
      </>
    );

  }
}