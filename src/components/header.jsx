import { BarChart2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Home } from "lucide-react";
import { NavLink } from "./nav-link";
import { ListTodo } from "lucide-react";
import { Building2 } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header(){

    return(
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
            <div className="flex gap-2 items-center justify-center">
            <BarChart2 className="h-6 w-6"/>
            <h1 className="text-xl">licitTracker</h1>

            </div>

            <Separator orientation="vertical" className="h-6" />

            <nav className="flex items-center space-x-4 lg:space-x-6 ">
                <NavLink to="/">
                <Home className="h-4 w-4" />
                Início
                </NavLink>

                <NavLink to="/licitados">
                <ListTodo className="h-4 w-4" />
                Itens licitados
                </NavLink>

                <NavLink to="/empresas-participantes">
                <Building2 className="h-4 w-4" />
                 Empresas Participantes das Licitações
                </NavLink>


            </nav>
            <div className="ml-auto flex  items-center gap-2">
                <ThemeToggle />
            </div>

            </div>

        </div>
    )
}