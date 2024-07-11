import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

const COLORS = ['#6d8a39', '#d86b60', '#dbd799', '#3D8BF2'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TipoEmpresaCard() {
  const [loading, setLoading] = useState(true);
  const [tipoEmpresa, setTipoEmpresa] = useState([]);
  const tipo = tipoEmpresa.map((tipo) => ({ name: tipo._id, value: tipo.count }));

  const getTipoEmpresa = async () => {
    try {
      const response = await api.get("/tipo-fornecedores");
      setTipoEmpresa(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTipoEmpresa();
  }, []);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Tipos de empresas
        </CardTitle>
      </CardHeader>
      {loading ? (
        <div className="flex justify-center items-center h-40 text-2xl">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
        </div>
      ) : (
        <CardContent className="space-y-1">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart width={400} height={400}>
              <Pie
                data={tipo}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {tipo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
}
