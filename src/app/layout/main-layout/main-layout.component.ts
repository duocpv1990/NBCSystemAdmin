import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/utils/animations/fader.animation';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    // <-- add your animations here
    fader,
  ],
})
export class MainLayoutComponent implements OnInit {
  showFiller = false;
  dataNav = {
    list: [
      {
        icon: 'assets/img/home.svg',
        name: 'Trang chủ',
        linkURL: 'home',
        subs: []
      },
      {
        icon: 'assets/img/enterprise-code.svg',
        name: 'Khách hàng',
        linkURL: 'customer',
        subs: []
      },
      {
        icon: 'assets/img/contract-icon.svg',
        name: 'Hợp đồng',
        linkURL: 'contract',
        subs: []
      },
      // {
      //   icon: 'assets/img/enterprise-code.svg',
      //   name: 'Doanh nghiệp',
      //   linkURL: 'enterprise',
      //   subs: []
      // },
      // {
      //   icon: 'assets/img/distributor.svg',
      //   name: 'Nhà phân phối',
      //   linkURL: 'distributor',
      //   subs: []
      // },
      // {
      //   icon: 'assets/img/shop.svg',
      //   name: 'Điểm bán',
      //   linkURL: 'shop',
      //   subs: []
      // },
      {
        icon: 'assets/img/bag.svg',
        name: 'Sản phẩm',
        linkURL: 'product',
        subs: []
      },
      {
        icon: 'assets/img/service-package.svg',
        name: 'Gói dịch vụ',
        linkURL: 'service-package',
        subs: []
      },
      {
        icon: 'assets/img/icon-setting.svg',
        name: 'Cài đặt',
        linkURL: 'setting',
        subs: [
          { name: 'Danh sách tài khoản', path: 'setting/account-list' },
          { name: 'Nhóm quyền', path: 'setting/privileges' },
          { name: 'Phân quyền', path: 'setting/authorization' },
          { name: 'Lý do', path: 'setting/reason' },
          { name: 'Doanh nghiệp nổi bật', path: 'setting/outstanding-enterprise' },
          { name: 'Sản phẩm nổi bật', path: 'setting/outstanding-production' },
          { name: 'Banner', path: 'setting/banner' },

        ]
      },

    ],
  };

  constructor() { }

  ngOnInit(): void {
    // if (localStorage.getItem("role") === 'saleAdmin') {
    //   this.dataNav.list.pop();
    // }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
