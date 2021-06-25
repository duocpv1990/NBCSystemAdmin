import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class Account {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên tài khoản',
                type: 'text',
                data: [],
                condition: 'Name'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'CreatePerson'
            },
            {
                Text: 'Nhóm quyền',
                type: 'select',
                data: [],
                condition: 'Privileges'
            },
            {
                Text: 'Tình trạng',
                type: 'select',
                data: [],
                condition: 'status'
            },

            {
                Text: 'Tìm kiếm',
                type: 'button',
                condition: 'fullText'
            }];
    }


    public get collums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },

            {
                id: 'LastName',
                name: 'Tên tài khoản',
                width: 200,
                type: 'text'
            },
            {
                id: 'Username',
                name: 'Tên đăng nhập',
                width: 200,
                type: 'text',
            },
            {
                id: 'Phone',
                name: 'Số điện thoại',
                width: 200,
                type: 'text',
            },

            {
                id: 'Email',
                name: 'Email',
                width: 200,
                type: 'text',
            },
            {
                id: 'RoleName',
                name: 'Nhóm quyền',
                width: 200,
                type: 'text',
            },
            {
                id: 'Creator',
                name: 'Người tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'CreatedOn',
                name: 'Thời gian tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'Status',
                name: 'Tình trạng',
                width: 200,
                type: 'text',
            },
            {
                id: 'noun',
                name: 'Hành động',
                width: 200,
                type: 'setting',
            },
        ];
    }

    public get btnActice(): Array<any> {
        return [
            {
                class: 'btn-create',
                text: 'Thêm mới',
                type: 'create',
                icon: ''
            },
            // {
            //     class: 'btn-create',
            //     text: 'Cập nhật',
            //     type: 'update',
            //     icon: ''
            // },
            {
                class: 'btn-delete',
                text: 'Xoá',
                type: 'delete',
                icon: ''
            },
            {
                class: 'btn-export',
                text: 'Export',
                type: 'export',
                icon: ''
            }
        ];
    }

    public get create(): Array<CreateModel> {
        return [
            {
                id: 'Username',
                label: 'Tên đăng nhập',
                name: 'Username',
                type: 'text'
            },
            // {
            //     id: 'Password',
            //     label: 'Mật khẩu',
            //     name: 'Password',
            //     type: 'text'
            // },
            {
                id: 'Email',
                label: 'Email',
                name: 'Email',
                type: 'text'
            },
            {
                id: 'PhoneNumber',
                label: 'Số điện thoại',
                name: 'PhoneNumber',
                type: 'text'
            },
            {
                id: 'FullName',
                label: 'Tên tài khoản',
                name: 'FullName',
                type: 'text'
            },
            {
                id: 'RoleId',
                label: 'Nhóm quyền',
                name: 'RoleId',
                type: 'select'
            },

        ];
    }

}