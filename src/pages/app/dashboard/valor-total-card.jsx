import { Card,CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import React, { useEffect, useState } from 'react';


export function ValorTotalCard(){
     const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    return(
        <Card className={loaded ? 'loaded' : ''}>
             <CardHeader className=" flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-semibold">
                        Valor total das licitações
                            </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    {loaded && (
                    <CardContent className="space-y-1">
                        <span className="text-2xl font-bold tracking-tight">
                        R$ 31.705.840.915,1081
                        </span>
                        <p className="text-xs text-muted-foreground">
                            Dados atualizados 
                            <span className="text-blue-800 dark:text-emerald-400"> mensalmente</span>
                        </p>


                    </CardContent>
                    )}
                </Card>
    );
}