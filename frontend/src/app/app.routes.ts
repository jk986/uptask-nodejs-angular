import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadComponent: () => import("./layouts/auth-layout/auth-layout.component"),
        children: [
            {
                path: "login",
                title: "login",
                loadComponent: () => import("@pages/login/login.component")
            },
            {
                path: "registrar",
                title: "Registrar",
                loadComponent: () => import("@pages/registrar/registrar.component")
            },
            {
                path: "olvide-password",
                title: "Olvide Password",
                loadComponent: () => import("@pages/olvide-pass/olvide-pass.component")
            },
            {
                path: "olvide-password/:token",
                title: "Nuevo Password",
                loadComponent: () => import("@pages/nuevo-pass/nuevo-pass.component")
            },
            {
                path: "confirmar-cuenta/:id",
                title: "Confirmar Cuenta",
                loadComponent: () => import("@pages/confirmar-cuenta/confirmar-cuenta.component")
            },
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            }
        ]
    },
    {
        path:"proyectos",
        title:"Proyectos",
        loadComponent: () => import("@pages/proyectos/proyectos.component"),
        canActivate:[loginGuard]
    },
    {
        path: "",
        redirectTo:"/auth/login",
        pathMatch: "full"
    },
    {
        path:"**",
        title:"Pagina No Encontrada",
        loadComponent: () => import("./layouts/page-error/page-error.component")
    }
];
