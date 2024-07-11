import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TipoEmpresaCard from "./tipo-empresa";
import TotalEmpresaCard from "./total-empresas";
import { TopEmpresasCard } from '/src/pages/app/empresas/top-empresas.jsx';

const itens = [
  { item: "3842748", descricao: "OBRAS DE CONSTRUÇÃO DE UM CAMPO DE FUTEBOL NO MUNICÍPIO DE JUNCO DO SERIDÓ, CONFORME PLANILHA DE CUSTOS, CRONOGRAMA FÍSICO–FINANCEIRO, BDI, MEMORIAL DESCRITIVO E PLANTAS.", quantidade: 1, tipo: "Serviço", dataResultado: "2024-02-07", estado: "Paraíba" },
  { item: "1169", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 540, tipo: "Material", dataResultado: "2024-01-04", estado: "Rio de Janeiro" },
  { item: "287", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 364, tipo: "Material", dataResultado: "2024-01-04", estado: "Paraíba" },
  { item: "3842748", descricao: "OBRAS DE CONSTRUÇÃO DE UM CAMPO DE FUTEBOL NO MUNICÍPIO DE JUNCO DO SERIDÓ, CONFORME PLANILHA DE CUSTOS, CRONOGRAMA FÍSICO–FINANCEIRO, BDI, MEMORIAL DESCRITIVO E PLANTAS.", quantidade: 1, tipo: "Serviço", dataResultado: "2024-02-07", estado: "Paraíba" },
  { item: "1589", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 540, tipo: "Material", dataResultado: "2024-01-04", estado: "Rio de Janeiro" },
  { item: "2147", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 360, tipo: "Material", dataResultado: "2024-01-04", estado: "Paraíba" },
  { item: "3842748", descricao: "OBRAS DE CONSTRUÇÃO DE UM CAMPO DE FUTEBOL NO MUNICÍPIO DE JUNCO DO SERIDÓ, CONFORME PLANILHA DE CUSTOS, CRONOGRAMA FÍSICO–FINANCEIRO, BDI, MEMORIAL DESCRITIVO E PLANTAS.", quantidade: 1, tipo: "Serviço", dataResultado: "2024-02-07", estado: "Paraíba" },
  { item: "1024", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 544, tipo: "Material", dataResultado: "2024-01-04", estado: "Rio de Janeiro" },
  { item: "202", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 380, tipo: "Material", dataResultado: "2024-01-04", estado: "Paraíba" },
  { item: "2028", descricao: "Fluvoxamina Maleato concentração: 100", quantidade: 950, tipo: "Material", dataResultado: "2024-01-04", estado: "Paraíba" },

];

export function Empresas(){
    const [selectedEstado, setSelectedEstado] = React.useState("");
    const [selectedAno, setSelectedAno] = React.useState("");
    const [filteredItens, setFilteredItens] = React.useState(itens);

    const handleFilter = () => {
        const filtered = itens.filter(item =>
        (selectedEstado ? item.estado === selectedEstado : true) &&
        (selectedAno ? new Date(item.dataResultado).getFullYear().toString() === selectedAno : true)
        );
        setFilteredItens(filtered);
    };
    return (
<>
<Helmet title="Fornecedores"/>

<div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Empresas participantes de licitações(fornecedores)</h1>
        <form className="flex items-center gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Select onValueChange={(value) => setSelectedEstado(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Paraíba">Paraíba</SelectItem>
              <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="São Paulo">São Paulo</SelectItem>
              <SelectItem value="Bahia">Bahia</SelectItem>
              <SelectItem value="Amapá">Amapá</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedAno(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={handleFilter}>Filtrar</Button>
      </form>
        <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-8">
            <TotalEmpresaCard/>
            </div>
            <TipoEmpresaCard/>
        </div>
        <div className="grid grid cols-9 gap-2">
        <TopEmpresasCard/>
        </div>
    </div>



</>
    )
}
