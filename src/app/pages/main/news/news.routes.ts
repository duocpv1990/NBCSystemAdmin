import { Routes } from "@angular/router";

import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';

export const newsRoute: Routes = [
    {
        path: '',
        component: NewsComponent,
        data: { animation: 'isRight' },

        children: [
            {
                path: '',
                component: NewsListComponent
            },
            {
                path: 'create',
                component: NewsAddComponent
            }

        ]
    }
]
