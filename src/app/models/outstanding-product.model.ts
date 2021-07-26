import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class OutstandingProductModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên sản phẩm',
                type: 'text',
                data: [],
                condition: 'Name'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'CreatedName'
            },
            {
                Text: 'Người sửa đổi',
                type: 'text',
                data: [],
                condition: 'EditedName'
            },
            {
                Text: 'Thời gian tạo',
                type: 'date',
                data: [],
                condition: 'CreatedOn'
            },
            {
                Text: 'Tình trạng',
                type: 'selected',
                data: [],
                condition: 'Status'
            },

            {
                Text: '',
                type: 'search',
                condition: 'stt'
            }
        ];
    }


    public get collums(): Array<CollumsModel> {
        return [
            {
                id: 'stt',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'Name',
                name: 'Tên sản phẩm',
                width: 200,
                type: 'text',
            },
            {
                id: 'Index',
                name: 'Thứ tự hiển thị',
                width: 100,
                type: 'text',
            },
            {
                id: 'CreatedName',
                name: 'Người tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'StartDate',
                name: 'Ngày bắt đầu',
                width: 100,
                type: 'date',
            },
            {
                id: 'EndDate',
                name: 'Ngày kết thúc',
                width: 200,
                type: 'date',
            },
            {
                id: 'EditName',
                name: 'Người sửa đổi',
                width: 200,
                type: 'text',
            },
            {
                id: 'Type',
                name: 'Tình trạng',
                width: 100,
                type: 'text',
            },
            {
                id: '',
                name: 'Hành động',
                width: 100,
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
            {
                class: 'btn-delete',
                text: 'Xóa',
                type: 'delete',
                icon: ''
            }, {
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
                id: 'register',
                label: 'Tên doanh nghiệp',
                name: 'register',
                type: 'text'
            },
            {
                id: 'code',
                label: 'Mã doanh nghiệp',
                name: 'code',
                type: 'text'
            },
            {
                id: 'global',
                label: 'Mã địa điểm toàn cầu GLN',
                name: 'global',
                type: 'text'
            },
            {
                id: 'taxcode',
                label: 'Mã số thuế',
                name: 'taxcode',
                type: 'text'
            },
            {
                id: 'country',
                label: 'Quốc gia',
                name: 'country',
                type: 'select'
            },
            {
                id: 'city',
                label: 'Thành phố/Tỉnh',
                name: 'city',
                type: 'select'
            },
            {
                id: 'district',
                label: 'Quận/Huyện',
                name: 'district',
                type: 'select'
            },
            {
                id: 'address',
                label: 'Địa chỉ',
                name: 'address',
                type: 'text'
            },
            {
                id: 'phone',
                label: 'Số điện thoại',
                name: 'phone',
                type: 'text'
            },
            {
                id: 'email',
                label: 'Email',
                name: 'email',
                type: 'text'
            },
            {
                id: 'website',
                label: 'Website',
                name: 'website',
                type: 'text'
            },
            {
                id: 'avatar',
                label: 'Ảnh đại diện',
                name: 'avatar',
                type: 'img'
            },
            {
                id: 'background',
                label: 'Ảnh nền',
                name: 'background',
                type: 'img'
            },
            {
                id: 'addnew',
                label: 'Chứng từ, chứng nhận',
                name: 'addnew',
                type: 'button'
            },
        ];
    }


}