import React, { useEffect, useState } from 'react';
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

const SituacaoLicitacaoCard = () => {
    const [loading, setLoading] = useState(true);
    const [situacaoLicitacao, setSituacaoLicitacao] = useState([]);
    const getSituacaoLicitacao = async () => {
        try {
            const response = await api.get("/grafico1");
            setSituacaoLicitacao(response.data);
        } catch (error) {
            console.error("Erro ao obter itens licitações", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSituacaoLicitacao();
    }, []);

    const situacao = situacaoLicitacao.map((tipo) => ({ name: tipo._id, licitacoes: tipo.count }));

    return (

                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-2 pb-2">
                        <CardTitle className="text-base font-semibold">
                            Status das licitações
                        </CardTitle>
                    </CardHeader>
                    {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin h-8 w-8 mr-2" />
                </div>
            ) : (
                    <CardContent className="space-y-1">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={situacao} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="licitacoes" stroke="#3D8BF2" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
            )}
            </Card>
    );
}

export default SituacaoLicitacaoCard;
