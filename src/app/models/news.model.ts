import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class NewsModel {


    public get filter(): Array<FilterModel> {
        return [

            {
                Text: 'Tiêu đề',
                type: 'text',
                data: [],
                condition: 'Title'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'Creater'
            },
            {
                Text: 'Tình trạng',
                type: 'select',
                data: [],
                condition: 'Status'
            },
            {
                Text: 'Thời gian tạo',
                type: 'select',
                data: [],
                condition: 'CreatedDate'
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
                id: 'Title',
                name: 'Tiêu đề',
                width: 100,
                type: 'text',
            },


            {
                id: 'View',
                name: 'Lượt xem',
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
                id: 'PublishDate',
                name: 'Ngày xuất bản',
                width: 200,
                type: 'text',
            },
            {
                id: 'PostRemoveDate',
                name: 'Ngày hạ bài',
                width: 200,
                type: 'text',
            },
            {
                id: 'Editer',
                name: 'Người sửa',
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