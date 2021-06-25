import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class DistributorModel {


    public get filter(): Array<FilterModel> {
        return [

            {
                Text: 'Tên nhà phân phối',
                type: 'text',
                data: [],
                condition: 'Name'
            },
            {
                Text: 'Điện thoại',
                type: 'text',
                data: [],
                condition: 'PhoneNumber'
            },
            {
                Text: 'Tình trạng',
                type: 'select',
                data: [],
                condition: 'Status'
            },
            {
                Text: 'Khu vực',
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
                type: 'date',
            },
            {
                id: 'Type',
                name: 'Tình trạng',
                width: 200,
                type: 'status',
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
                id: 'CompanyId',
                label: 'Tên doanh nghiệp',
                name: 'Name',
                type: 'select',
            },
            {
                id: 'Name',
                label: 'Tên nhà phân phối',
                name: 'Name',
                type: 'text'
            },
            {
                id: 'TaxCode',
                label: 'Mã số thuế',
                name: 'TaxCode',
                type: 'text'
            },
            {
                id: 'NationId',
                label: 'Quốc gia',
                name: 'NationId',
                type: '',
                data: [],
                ward: "Nation"
            },
            {
                id: 'ProvinceId',
                label: 'Thành phố/Tỉnh',
                name: 'ProvinceId',
                type: '',
                ward: "Province",
                data: []
            },
            {
                id: 'DistrictId',
                label: 'Quận/Huyện',
                name: 'DistrictId',
                type: '',
                ward: "District",
                data: []
            },
            {
                id: 'AddressDetail',
                label: 'Địa chỉ',
                name: 'AddressDetail',
                type: 'text'
            },
            {
                id: 'PhoneNumber',
                label: 'Số điện thoại',
                name: 'PhoneNumber',
                type: 'text'
            },
            {
                id: 'Email',
                label: 'Email',
                name: 'Email',
                type: 'text'
            },
            {
                id: 'Website',
                label: 'Website',
                name: 'Website',
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