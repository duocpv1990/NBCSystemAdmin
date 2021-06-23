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
  masterSelected = false;
  checklist: any;
  checkedList: any;

  constructor(
    private privilegeService: PrivilegeService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getCheckedItemList();
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
      this.rolePolicies.forEach(item => item['isSelected'] = false);
      console.log('rolePolicies', this.rolePolicies);

    })
  }

  changeRole(event) {
    this.roleId = event;
    this.getRolePolicies();
  }

  checkUncheckAll() {
    this.masterSelected = !this.masterSelected;
    for (var i = 0; i < this.rolePolicies.length; i++) {
      this.rolePolicies[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.rolePolicies.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.rolePolicies.length; i++) {
      if (this.rolePolicies[i].isSelected)
        this.checkedList.push(this.rolePolicies[i]);
    }
    console.log('checkedList', this.checkedList);

    this.checkedList = JSON.stringify(this.checkedList);
  }



}
