import * as React from "react"
import { Helmet } from "react-helmet-async";
import { TabelaItens } from "./tabela-itens";

export function Itens(){
    return (
        <>
        <Helmet title="Itens licitados"/>
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Análise dos itens licitados</h1>
        </div>
        <TabelaItens/>
        </>
    )
}