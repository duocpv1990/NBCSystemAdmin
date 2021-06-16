import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class EnterPriseModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Mã doanh nghiệp',
                type: 'text',
                data: [],
                condition: 'code'
            },
            {
                Text: 'Tên đăng ký',
                type: 'text',
                data: [],
                condition: 'register'
            },
            {
                Text: 'Trạng thái',
                type: 'select',
                data: [],
                condition: 'status'
            },
            {
                Text: 'Tìm kiếm',
                type: 'button',
                condition: 'stt'
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
                id: 'stt',
                name: 'STT',
                width: 100,
                type: 'text',
            },
            {
                id: 'code',
                name: 'Mã doanh nghiệp',
                width: 200,
                type: 'text',
            },

            {
                id: 'global',
                name: 'Mã địa điểm toàn cầu',
                width: 200,
                type: 'text',
            },
            {
                id: 'register',
                name: 'Tên đăng ký',
                width: 200,
                type: 'text',
            },
            {
                id: 'gt',
                name: 'Giấy tờ',
                width: 200,
                type: 'text',
            },
            {
                id: 'status',
                name: 'Trạng thái',
                width: 200,
                type: 'text',
                color: '#26A700'
            },
            {
                id: 'update',
                name: 'Cập nhật',
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
            {
                class: 'btn-delete',
                text: 'Xoá mã doanh nghiệp',
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
                label: 'GIẤY CHỨNG CHỈ, CHỨNG NHẬN',
                name: 'addnew',
                type: 'button'
            },
        ];
    }


}