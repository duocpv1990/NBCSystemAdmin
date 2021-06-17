import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class DistributorModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Mã doanh nghiệp',
                type: 'text',
                data: [],
                condition: 'code'
            },
            {
                Text: 'Thành phố',
                type: 'select',
                data: [],
                condition: 'city'
            },
            {
                Text: 'Tìm kiếm',
                type: 'button',
                condition: "production"
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
                id: 'index',
                name: 'STT',
                width: 100,
                type: 'text',
            },
            {
                id: 'MediaURL',
                name: 'Ảnh',
                width: 100,
                type: 'image',
            },

            {
                id: 'Name',
                name: 'Nhà phân phối',
                width: 200,
                type: 'text',
            },
            {
                id: 'AddressDetail',
                name: 'Địa chỉ',
                width: 200,
                type: 'text',
            },
            {
                id: 'Province',
                name: 'Khu vực',
                width: 200,
                type: 'text',
            },
            {
                id: 'TaxCode',
                name: 'Mã số thuế',
                width: 200,
                type: 'text',
            },
            {
                id: 'PhoneNumber',
                name: 'Điện thoại',
                width: 200,
                type: 'text',
            },
            {
                id: 'ProductNumber',
                name: 'Sản phẩm',
                width: 200,
                type: 'text',
            },
            {
                id: 'UpdatedOn',
                name: 'Cập nhật',
                width: 200,
                type: 'text',
            },
            {
                id: 'Type',
                name: 'Tình trạng',
                width: 200,
                type: 'status',
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
                text: 'Gỡ nhà phân phối',
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
                id: 'name',
                label: 'Tên doanh nghiệp',
                name: 'name',
                type: 'text'
            },
            {
                id: 'distributorName',
                label: 'Mã doanh nghiệp',
                name: 'distributorName',
                type: 'text'
            },
            {
                id: 'mst',
                label: 'Mã số thuế',
                name: 'mst',
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
        ];
    }

}