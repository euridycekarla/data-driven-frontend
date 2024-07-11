import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

const TotalEmpresaCard = () => {
  const [loading, setLoading] = useState(true);
  const [totalEmpresa, setTotalEmpresa] = useState([]);

  const getTotalEmpresa = async () => {
    try {
      const response = await api.get("/empresas-participantes");
      setTotalEmpresa(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotalEmpresa();
  }, []);

  const total = totalEmpresa.map((tipo) => ({
    name: tipo.ano,
    uv: tipo.totalFornecedores
  }));

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Número de empresas participantes por ano (fornecedores)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {loading ? (
          <div className="flex justify-center items-center h-40 text-2xl">
            <Loader2 className="animate-spin h-8 w-8 mr-2" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={total}
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
        )}
      </CardContent>
    </Card>
  );
};

export default TotalEmpresaCard;
