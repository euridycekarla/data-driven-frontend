import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

export function ValorTotalCard() {
    const [loaded, setLoaded] = useState(false);
    const [total, setValorTotalLicitacoes] = useState(null);
    console.log(total)

    useEffect(() => {
        const fetchValorTotalLicitacoes = async () => {
            try {
                const response = await api.get("/valor-total-licitado");
                setValorTotalLicitacoes(response.data.total);
            } catch (error) {
                console.error("Erro ao obter valor total de licitações", error);
            } finally {
                setLoaded(true);
            }
        };

        fetchValorTotalLicitacoes();
    }, []);

    return (
        <Card className={loaded ? 'loaded' : ''}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Valor total das licitações
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
                {!loaded ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin h-8 w-8 mr-2" />
                    </div>
                ) : (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                        {total ? `${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : 'Carregando...'}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            Dados atualizados
                            <span className="text-blue-800 dark:text-emerald-400"> mensalmente</span>
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
