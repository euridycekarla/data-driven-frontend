import * as React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function TabelaItens() {
  const [loading, setLoading] = useState(true);
  const [selectedEstado, setSelectedEstado] = React.useState("");
  const [selectedAno, setSelectedAno] = React.useState("");
  const [filteredItens, setFilteredItens] = React.useState([]);
  const [itens, setItens] = React.useState([]);

  const getItensLicitacoes = async () => {
    try {

      const response = await api.get("top-itens-licitados");

      setFilteredItens(response.data);
    } catch (error) {
      console.error("Erro ao obter itens licitacoes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItensLicitacoes();
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
      <form className="flex items-center gap-2 mb-4">
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

      {loading ? (
        <div className="flex justify-center items-center h-40 text-2xl">
          <Loader2 className="animate-spin h-8 w-8 mr-2" />
          <span>Carregando...</span>
        </div>
      ) : (
        <div>
          <Table>
            <TableCaption>Lista dos 10 itens mais licitados.</TableCaption>
            <TableHeader>
              <TableRow>
              <TableHead>Item</TableHead>
                <TableHead className="w-[100px]">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItens.map(item => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium">{item._id}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total de Itens Licitados</TableCell>
                <TableCell className="text-right">
                  {filteredItens.reduce((acc, item) => acc + item.total, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
}
