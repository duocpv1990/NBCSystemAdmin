import { Routes } from "@angular/router";
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const customerRoute: Routes = [
    {
        path: '',
        component: CustomerComponent,
        data: { animation: 'isRight' },

        children: [
            {
                path: '',
                component: CustomerListComponent
            }
        ]
    }
]
