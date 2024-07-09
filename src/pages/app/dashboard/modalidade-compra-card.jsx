import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";


const COLORS = ['#6d8a39', '#d86b60', '#dbd799', '#3D8BF2', '#9c27b0', '#4caf50', '#2196f3', '#ff9800'];


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


const ModalidadeCompraCard = () => {
  const [modalidadeCompras, setModalidadeCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalidades = modalidadeCompras.map((tipo) => ({name: tipo.modalidade, porcentagem: tipo.porcentagem}))
  const getModalidadeCompras = async () => {
    try {
      const response = await api.get("grafico2");
      setModalidadeCompras(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModalidadeCompras();
  }, []);


  return (
    <Card>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
        </div>
      ) : (
        <>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Modalidades de compras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={400} height={400}>
                <Pie
                  data={modalidades}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={95}
                  fill="#8884d8"
                  dataKey="porcentagem"
                >
                  {modalidades.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ModalidadeCompraCard;
