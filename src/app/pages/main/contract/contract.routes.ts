import { Routes } from "@angular/router";
import { ContractComponent } from './contract.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from "./contract-create/contract-create.component";

export const contractRoute: Routes = [
    {
        path: '',
        component: ContractComponent,
        data: { animation: 'isRight' },

        children: [
            {
                path: '',
                component: ContractListComponent
            },
            {
                path: 'create',
                component: ContractCreateComponent
            }
        ]
    }
]
