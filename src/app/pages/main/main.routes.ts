import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'contract',
        loadChildren: () =>
          import('./contract/contract.module').then((m) => m.ContractModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./enterprise/enterprise.module').then((m) => m.EnterpriseModule),
      },
      {
        path: 'distributor',
        loadChildren: () =>
          import('./distributor/distributor.module').then((m) => m.DistributorModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'service-package',
        loadChildren: () =>
          import('./service-package/service-package.module').then((m) => m.ServicePackageModule),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
