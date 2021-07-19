import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class CustomerModel {


    public get filter(): Array<FilterModel> {
        return [

            {
                Text: 'ID',
                type: 'text',
                data: [],
                condition: 'ID'
            },
            {
                Text: 'Tên doanh nghiệp',
                type: 'text',
                data: [],
                condition: 'Name'
            },
            {
                Text: 'Gói dịch vụ',
                type: 'select',
                data: [],
                condition: 'PackageService'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'city'
            },
            {
                Text: 'Người duyệt',
                type: 'text',
                data: [],
                condition: 'city'
            },
            {
                Text: 'Loại hợp đồng',
                type: 'select',
                data: [],
                condition: 'Type'
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
                condition: "production"
            }];
    }
    public get collums(): Array<CollumsModel> {
        return [

            {
                id: 'ID',
                name: 'ID',
                width: 100,
                type: 'text',
            },
            {
                id: 'Name',
                name: 'Tên doanh nghiệp',
                width: 200,
                type: 'text',
            },
            {
                id: 'ServicePackage',
                name: 'Gói dịch vụ',
                width: 200,
                type: 'text',
            },
            {
                id: 'Value',
                name: 'Gía trị',
                width: 200,
                type: 'text',
            },
            {
                id: 'Creater',
                name: 'Người tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'Type',
                name: 'Loại hợp đồng',
                width: 200,
                type: 'text',
            },
            {
                id: 'ApprovedbBy',
                name: 'Người duyệt',
                width: 200,
                type: 'text',
            },

            {
                id: 'Status',
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