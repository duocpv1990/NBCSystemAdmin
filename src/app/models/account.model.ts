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
                id: 'Name',
                name: 'Tên tài khoản',
                width: 200,
                type: 'text'
            },
            {
                id: 'UserName',
                name: 'Tên đăng nhập',
                width: 200,
                type: 'text',
            },
            {
                id: 'PhoneNumber',
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
                id: 'Privileges',
                name: 'Nhóm quyền',
                width: 200,
                type: 'text',
            },
            {
                id: 'CreatePerson',
                name: 'Người tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'CreateDate',
                name: 'Thời gian tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'status',
                name: 'Tình trạng',
                width: 200,
                type: 'text',
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
                text: 'Xoá sản phẩm',
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
                id: 'barcode',
                label: 'Mã số sản phẩm toàn cầu(GTIN) (*)',
                name: 'barcode',
                type: 'text'
            },
            {
                id: 'productName',
                label: 'Tên sản phẩm (*)',
                name: 'productName',
                type: 'text'
            },
            {
                id: 'price',
                label: 'Giá niêm yết (*)',
                name: 'price',
                type: 'text'
            },
            {
                id: 'category',
                label: 'Ngành hàng (*)',
                name: 'category',
                type: 'select'
            },
            {
                id: 'productDetail',
                label: 'Mô tả sản phẩm',
                name: 'productDetail',
                type: 'text'
            },
            {
                id: 'companyInfo',
                label: 'Nhãn hiệu',
                name: 'companyInfo',
                type: 'text'
            },
            {
                id: 'distributor',
                label: 'Nhà phân phối (*)',
                name: 'distributor',
                type: 'text'
            },
            {
                id: 'shop',
                label: 'Điểm bán',
                name: 'shop',
                type: 'text'
            },

            {
                id: 'avatar',
                label: 'Ảnh đại diện',
                name: 'avatar',
                type: 'img'
            }
        ];
    }

}