import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import { ResponsiveContainer,LineChart,XAxis,YAxis,CartesianGrid,Line,Tooltip, Legend} from "recharts"

const data =[
    {date:'2024', licitacoes :16000},
    {date:'2023', licitacoes :8000},
    {date:'2022', licitacoes :400590},
    {date:'2021', licitacoes :2000},

]

export  default function AnoLicitacaoChart(){
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
                <LineChart data={data} style={{ fontSize: 12 }}>
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