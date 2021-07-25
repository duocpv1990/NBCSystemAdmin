import { Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { SettingComponent } from './setting.component';
import { PrivilegesComponent } from './privileges/privileges.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ReasonComponent } from './reason/reason.component';
import { OutstandingEnterpriseComponent } from "./outstanding-enterprise/outstanding-enterprise.component";
import { OutstandingProductComponent } from "./outstanding-product/outstanding-product.component";
import { SettingBannerComponent } from "./setting-banner/setting-banner.component";

export const settingRoute: Routes = [
    {
        path: '',
        component: SettingComponent,
        data: { animation: 'isRight' },

        children: [
            {
                path: 'account-list',
                component: AccountComponent
            },
            {
                path: 'privileges',
                component: PrivilegesComponent
            },
            {
                path: 'authorization',
                component: AuthorizationComponent
            },
            {
                path: 'reason',
                component: ReasonComponent
            },
            {
                path: 'outstanding-enterprise',
                component: OutstandingEnterpriseComponent
            },
            {
                path: 'outstanding-production',
                component: OutstandingProductComponent
            },
            {
                path: 'banner',
                component: SettingBannerComponent
            },
            {
                path: '',
                redirectTo: '',
                pathMatch: 'full',
            },
        ]
    }
]
