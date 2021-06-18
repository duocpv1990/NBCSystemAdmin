import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class Privilege {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Nhóm quyền',
                type: 'text',
                data: [],
                condition: 'privilege'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'CreatePerson'
            },
            {
                Text: 'Người sửa đổi lần cuối',
                type: 'text',
                data: [],
                condition: 'LastUpdatedPerson'
            },

            {
                Text: 'Tình trạng',
                type: 'select',
                data: [],
                condition: 'status'
            },
            {
                Text: 'Thời gian tạo',
                type: 'select',
                data: [],
                condition: 'CreatedOn'
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
                name: 'Ngày tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'LastUpdatedDate',
                name: 'Ngày sửa đổi lần cuối',
                width: 200,
                type: 'text',
            },
            {
                id: 'LastUpdatedPerson',
                name: 'Người sửa đổi lần cuối',
                width: 200,
                type: 'object',
            },
            {
                id: 'AccountNumber',
                name: 'Số lượng người dùng',
                width: 200,
                type: 'text',
            },
            {
                id: 'Condition',
                name: 'Tình trạng',
                width: 200,
                type: 'text',
            },
            {
                id: 'Status',
                name: 'Trạng thái',
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