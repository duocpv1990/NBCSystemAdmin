import { Component, OnInit } from '@angular/core';
import { Authorization } from 'src/app/models/authorization.model';
import { PrivilegeService } from 'src/app/services/privilege.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  config = new Authorization();

  name = '';
  createdBy = '';
  updatedBy = '';
  createdDate = '';
  pageNumber = 1;
  pageSize = 10;
  roles = [];
  roleId: number;
  rolePolicies = [];
  checkSelectAll;
  showDelete = false;
  listSelectAll: any = [];

  constructor(
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }


  getRoles() {
    this.privilegeService.getRoles(this.pageNumber, this.pageSize, this.createdDate, this.updatedBy, this.createdBy, this.name).subscribe(res => {
      this.roles = res.payload.reverse();
      this.roleId = this.roles[0].RoleId;
      this.getRolePolicies();
    });
  }

  getRolePolicies() {
    this.privilegeService.getRolePolicy(this.roleId).subscribe(res => {
      this.rolePolicies = res;
    });
  }

  changeRole(event) {
    this.roleId = event;
    this.getRolePolicies();
  }

  selectAll(value, index) {
    this.checkSelectAll = true;
    this.listSelectAll.length = 0;
    this.rolePolicies[index].Policies.forEach(x => {
      x.check = value;
    });
    this.rolePolicies[index].Policies.forEach(x => {
      if (x.check === true) {
        this.listSelectAll.push(x);
      }
    });
    if (this.listSelectAll.length === 0) {
      this.showDelete = false;
    }
    else {
      this.showDelete = true;
    }
    console.log(this.listSelectAll);

  }

  selectItem(item, value, index) {
    this.showDelete = value;
    this.listSelectAll.length = [];
    item.check = value;
    this.rolePolicies[0].Policies.forEach(x => {
      if (x.check === true) {
        this.listSelectAll.push(x);
      }
    });
    if (this.listSelectAll.length === 0) {
      this.showDelete = false;
      this.checkSelectAll = false;
    }
    if (this.listSelectAll.length !== 0 && this.listSelectAll.length === this.rolePolicies[0].Policies.length) {
      this.showDelete = true;
      this.checkSelectAll = true;
    }
    if ((this.listSelectAll.length !== 0 && this.listSelectAll.length !== this.rolePolicies[0].Policies.length)) {
      this.showDelete = true;
      this.checkSelectAll = false;
    }
  }


}
