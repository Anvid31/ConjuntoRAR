import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { PostBuyComponent } from './pages/post-buy/post-buy.component';
import { GraphComponent } from './pages/graph/graph.component';
import { PdfsComponent } from './pages/pdfs/pdfs.component';

export const routes: Routes = [
   { path: '', component:HomeComponent},
   { path: 'post', component:PostComponent},
   { path: 'postBuy', component:PostBuyComponent},
   { path: 'graph', component:GraphComponent},
   { path: 'pdfs', component:PdfsComponent}
];
