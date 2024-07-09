import * as React from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function TopEmpresasCard() {
  const [loading, setLoading] = useState(true);
  const [topEmpresas, setTopEmpresas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [selectedAno, setSelectedAno] = useState(null);

  const getTopEmpresas = async () => {
    try {
      const response = await api.get("/top-empresas");
      setTopEmpresas(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopEmpresas();
  }, []);

  const handleFilter = () => {
    const filtered = empresas.filter(item =>
      (selectedEstado ? item.unidadeOrgao.cidade.uf.nome === selectedEstado : true) &&
      (selectedAno ? new Date(item.biddingItems.resultado.dataResultado).getFullYear().toString() === selectedAno : true)
    );
    setTopEmpresas(filtered);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-40 text-2xl">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
          <span>Carregando...</span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold tracking-tight">Empresas que mais participaram de licitações</h1>
          <Table>
            <TableCaption>Top 5 empresas participantes em licitações.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-[100px]">Nº de licitações</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {topEmpresas.map(empresas => (
                <TableRow key={empresas._id}>
                  <TableCell className="font-medium">{empresas.nomeEmpresa}</TableCell>
                  <TableCell>{empresas.totalLicitacoes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total empresas participantes</TableCell>
                <TableCell className="text-right">{topEmpresas.reduce((acc, empresas) => acc + empresas.totalLicitacoes, 0)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
}

export default TopEmpresasCard;
