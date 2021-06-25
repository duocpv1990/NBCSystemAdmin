import { Component, OnInit } from '@angular/core';
import { Authorization } from 'src/app/models/authorization.model';
import { PrivilegeService } from 'src/app/services/privilege.service';
import { ToastrService } from 'ngx-toastr';

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
  isShow = false;
  selectedData: any = [];

  constructor(
    private privilegeService: PrivilegeService,

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
      this.rolePolicies.forEach(item => {
        item.Policies.forEach(policy => {
          if (policy.IsValid == 0) {
            policy.check = false;
          } else {
            policy.check = true;
            this.selectedData.push(policy.PolicyId);
          }
        });
      });
      console.log('selectedData', this.selectedData);

    });
  }

  changeRole(event) {
    this.roleId = event;
    this.getRolePolicies();
  }

  updatePolicies() {
    let policy = {
      RoleId: this.roleId,
      PolicyIdList: this.selectedData
    }
    this.privilegeService.updatePolicies(policy).subscribe(res => {

      this.getRolePolicies();
    });
  }


  selectAll(value, index) {
    this.checkSelectAll = true;
    this.rolePolicies[index].Policies.forEach(x => {
      x.check = value;
    });
    this.rolePolicies[index].Policies.forEach(x => {
      if (x.check === true) {
        this.selectedData.push(x.PolicyId);
      };
    });
  }

  selectItem(policy, value, index) {
    policy.check = value;
    if (this.selectedData.includes(policy.PolicyId)) {
      let index = this.selectedData.findIndex(policyId => policyId == policy.PolicyId);
      this.selectedData.splice(index, 1);
    }
    else {
      this.selectedData.push(policy.PolicyId);
    }

  }


}
