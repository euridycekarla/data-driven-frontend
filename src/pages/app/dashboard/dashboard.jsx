import { Helmet } from 'react-helmet-async'
import { NumeroLicitacoesCard } from './numero-licitacoes-card'
import { ValorTotalCard } from './valor-total-card'
import ModalidadeCompraCard from './modalidade-compra-card'
import SituacaoLicitacaoCard from './situacao-licitacoes-card'
import OrgaoCard from './orgao-card'




export function Dashboard(){
    return (

        <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col gap-8">
                <NumeroLicitacoesCard />
                <ValorTotalCard />
            </div>
            <ModalidadeCompraCard />
            <SituacaoLicitacaoCard/>
            <OrgaoCard/>

        </div>
    </div>


)
}
