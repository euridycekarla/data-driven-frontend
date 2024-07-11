import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

const COLORS = ['#6d8a39', '#d86b60', '#dbd799', '#3D8BF2', '#9c27b0', '#4caf50', '#000080', '#ff9800', '#ff5722', '#795548', '#607d8b', '#00bcd4', '#8bc34a', '#e91e63'];

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

const OrgaoCard = () => {
  const [loading, setLoading] = useState(true);
  const [orgaoCard, setOrgaoCard] = useState([]);
  const orgao = orgaoCard.map((tipo) => ({ name: tipo._id, value: tipo.count }));

  const getOrgaoCard = async () => {
    try {
      const response = await api.get("grafico3");
      setOrgaoCard(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrgaoCard();
  }, []);

  return (
    <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Top 3 órgãos em licitações
            </CardTitle>
          </CardHeader>
          {loading ? (
        <div className="flex justify-center items-center h-40 text-2xl">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
        </div>
      ) : (
          <CardContent className="space-y-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orgao}
                  cx="50%"
                  cy="80%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={90}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orgao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
      )}
    </Card>
  );
};

export default OrgaoCard;
