import * as React from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/axios";
import { useEffect } from "react";


export function TopEmpresasCard() {
  const [filteredItens, setFilteredItens] = React.useState([]);
  const [itens, setItens] = React.useState([]);

  const getTopEmpresas = async () => {
    try {
      const response = await api.get("top-");
      // setItens(response.data.biddings);
      setFilteredItens(response.data.biddings);
    } catch (error) {
      console.error("error ao obter itens licitacoes", error);
    }
  };

  useEffect(() => {
    getTopEmpresas();
  }, []);

  const handleFilter = () => {
    const filtered = itens.filter(item =>
      (selectedEstado ? item.unidadeOrgao.cidade.uf.nome === selectedEstado : true) &&
      (selectedAno ? new Date(item.biddingItems.resultado.dataResultado).getFullYear().toString() === selectedAno : true)
    );
    setFilteredItens(filtered);
  };

  return (
    <div>

     <h1 className="text-2xl font-bold tracking-tight">Empresas que mais participaram de licitações
     </h1>

      <Table>
        <TableCaption>Top 5 empresas participantes em licitações.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Quantidade de licitações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItens.map(item => (
            <TableRow key={item.biddingItems._id}>
              <TableCell className="font-medium">{item.biddingItems.nome}</TableCell>
              <TableCell>{item.biddingItems.quantidade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total empresas participantes</TableCell>
            <TableCell className="text-right">{filteredItens.reduce((acc, item) => acc + item.biddingItems.quantidade, 0)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
