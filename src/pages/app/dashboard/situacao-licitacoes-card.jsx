import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"


const data = [
  {
    name: 'Andamento',
    uv: 7000,
  },
  {
    name: 'Concluídas',
    uv: 4569,
  },
  {
    name: 'Canceladas',
    uv: 3560,
  },
];

export default class SituacaoLicitacaoCard extends PureComponent {

  render() {
    return (
    <>
        <Card>
          <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Situação das Licitações
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1"></CardContent>

      <ResponsiveContainer width={400} height={220}>
        <BarChart width={150} height={100} data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="uv" fill="#3D8BF2"barSize={40} />
        </BarChart>
      </ResponsiveContainer>
      </Card>
      </>
    );

  }
}