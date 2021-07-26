import { Routes } from "@angular/router";
import { BannerComponent } from "./banner.component";
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { BannerUpdateComponent } from './banner-update/banner-update.component';

export const bannerRoute: Routes = [
    {
        path: '',
        component: BannerComponent,
        data: { animation: 'isRight' },

        children: [
            {
                path: '',
                component: BannerListComponent
            },
            {
                path: 'create',
                component: BannerCreateComponent
            },
            {
                path: ':id',
                component: BannerUpdateComponent
            }
        ]
    }
]
