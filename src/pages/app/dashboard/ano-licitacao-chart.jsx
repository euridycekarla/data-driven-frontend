import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { ResponsiveContainer,LineChart,XAxis,YAxis,CartesianGrid,Line,Tooltip, Legend} from "recharts"
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export  default function AnoLicitacaoChart(){
    const [loading, setLoading] = useState(true);
    const [anoLicitacao, setAnoLicitacao] = useState([]);
    const ano = anoLicitacao.map((tipo) => ({ date: tipo._id, licitacoes: tipo.count }));

    const getAnoLicitacao = async () => {
      try {
        const response = await api.get("grafico4");
        
        setAnoLicitacao(response.data);
      } catch (error) {
        console.error("Erro ao obter itens licitacoes", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getAnoLicitacao();
    }, []);

    return(
        <Card className="col-span-6" >
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                <CardTitle className="text-base font-medium">Licitações por ano</CardTitle>
                <CardDescription>Quantidade de licitações por ano</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={ano} style={{ fontSize: 12 }}>
                    <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16}/>
                    <YAxis stroke=" #888" axisLine={false} tickLine={false} />
                    <Tooltip/>
                    <Legend/>
                    <Line type="linear" strokeWidth={2} dataKey="licitacoes" />
                </LineChart>

            </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}