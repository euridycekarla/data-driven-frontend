import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCheck } from 'lucide-react';
import { api } from "@/lib/axios";
import { Loader2 } from "lucide-react";

export default function NumeroLicitacoesCard() {
    const [loading, setLoading] = useState(true);
    const [numeroLicitacoes, setNumeroLicitacoes] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const getNumeroLicitacoes = async () => {
        try {
            const response = await api.get("/total-licitacoes");
            setNumeroLicitacoes(response.data.totalLicitacoes);
        } catch (error) {
            console.error("Erro ao obter número total de licitações", error);
        } finally {
            setLoading(false);
            setLoaded(true);
        }
    };

    useEffect(() => {
        getNumeroLicitacoes();
    }, []);

    return (
        <Card className={loaded ? 'loaded' : ''}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                    Número total de licitações
                </CardTitle>
                <CheckCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col  space-y-1">
                {loading && (
                    <div className="flex justify-center items-center h-40 text-2xl">
                        <Loader2 className="animate-spin h-8 w-8 mr-2" />
                    </div>
                )}
                {loaded && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {numeroLicitacoes !== null ? `${numeroLicitacoes.toLocaleString('pt-BR')}` : ''}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            Dados cadastrados e atualizados
                            <span className="text-blue-800 dark:text-emerald-400"> mensalmente</span>
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
